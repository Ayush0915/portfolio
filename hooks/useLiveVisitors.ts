"use client";

import { useEffect, useMemo, useState } from "react";

const SESSION_ID_KEY = "portfolio:liveVisitors:sessionId";

type LocationResponse = {
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

export type LiveVisitor = {
  clientId: string;
  sessionId: string;
  avatarSeed: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

type ConnectionState = "connecting" | "live" | "local";

type UseLiveVisitorsResult = {
  visitors: LiveVisitor[];
  currentVisitor: LiveVisitor | null;
  isConnected: boolean;
  connectionState: ConnectionState;
  error: string | null;
};

const FALLBACK_LOCATION: LocationResponse = {
  city: "Bengaluru",
  country: "India",
  countryCode: "IN",
  latitude: 12.9716,
  longitude: 77.5946,
};

const SAMPLE_VISITOR_OFFSETS = [
  { city: "Mumbai", country: "India", countryCode: "IN", lat: 19.076, lng: 72.8777 },
  { city: "Delhi", country: "India", countryCode: "IN", lat: 28.6139, lng: 77.209 },
  { city: "Singapore", country: "Singapore", countryCode: "SG", lat: 1.3521, lng: 103.8198 },
  { city: "London", country: "United Kingdom", countryCode: "GB", lat: 51.5072, lng: -0.1276 },
  { city: "San Francisco", country: "United States", countryCode: "US", lat: 37.7749, lng: -122.4194 },
];

function createSessionId() {
  if (typeof window === "undefined") {
    return "visitor-ssr";
  }

  try {
    const existing = window.localStorage.getItem(SESSION_ID_KEY);
    if (existing) {
      return existing;
    }

    const created = `visitor-${crypto.randomUUID()}`;
    window.localStorage.setItem(SESSION_ID_KEY, created);
    return created;
  } catch {
    return `visitor-${crypto.randomUUID()}`;
  }
}

function toVisitor(location: LocationResponse, sessionId: string): LiveVisitor {
  return {
    clientId: sessionId,
    sessionId,
    avatarSeed: sessionId,
    city: location.city || FALLBACK_LOCATION.city,
    country: location.country || FALLBACK_LOCATION.country,
    countryCode: location.countryCode || FALLBACK_LOCATION.countryCode,
    latitude: Number.isFinite(location.latitude) ? location.latitude : FALLBACK_LOCATION.latitude,
    longitude: Number.isFinite(location.longitude) ? location.longitude : FALLBACK_LOCATION.longitude,
  };
}

function sampleVisitors(current: LiveVisitor): LiveVisitor[] {
  const nearbyCurrent = {
    ...current,
    latitude: current.latitude || FALLBACK_LOCATION.latitude,
    longitude: current.longitude || FALLBACK_LOCATION.longitude,
  };

  const samples = SAMPLE_VISITOR_OFFSETS.map((item, index) => ({
    clientId: `sample-${index + 1}`,
    sessionId: `sample-${index + 1}`,
    avatarSeed: `${item.city}-${index + 1}`,
    city: item.city,
    country: item.country,
    countryCode: item.countryCode,
    latitude: item.lat,
    longitude: item.lng,
  }));

  return [nearbyCurrent, ...samples];
}

async function getLocation(): Promise<LocationResponse> {
  const response = await fetch("/api/location", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Location lookup unavailable");
  }

  return (await response.json()) as LocationResponse;
}

async function canUseRealtime(sessionId: string): Promise<boolean> {
  try {
    const response = await fetch("/api/realtime/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: sessionId }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export function useLiveVisitors(): UseLiveVisitorsResult {
  const [currentVisitor, setCurrentVisitor] = useState<LiveVisitor | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      const sessionId = createSessionId();

      try {
        const location = await getLocation();
        if (cancelled) {
          return;
        }

        const visitor = toVisitor(location, sessionId);
        setCurrentVisitor(visitor);

        const realtimeReady = await canUseRealtime(sessionId);
        if (!cancelled) {
          setConnectionState(realtimeReady ? "live" : "local");
          setError(null);
        }
      } catch (bootError) {
        if (cancelled) {
          return;
        }

        const visitor = toVisitor(FALLBACK_LOCATION, sessionId);
        setCurrentVisitor(visitor);
        setConnectionState("local");
        setError(bootError instanceof Error ? bootError.message : "Live visitors unavailable");
      }
    }

    void boot();

    return () => {
      cancelled = true;
    };
  }, []);

  const visitors = useMemo(() => {
    if (!currentVisitor) {
      return [];
    }

    return sampleVisitors(currentVisitor);
  }, [currentVisitor]);

  return {
    visitors,
    currentVisitor,
    isConnected: connectionState === "live",
    connectionState,
    error,
  };
}
