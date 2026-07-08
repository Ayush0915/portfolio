"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, Radio, Users } from "lucide-react";
import { GlobeCanvas } from "@/components/GlobeCanvas";
import { useLiveVisitors } from "@/hooks/useLiveVisitors";
import type { GlobeMethods } from "react-globe.gl";

type MarkerPoint = {
  lat: number;
  lng: number;
  avatarSeed: string;
  city: string;
  country: string;
  isCurrent: boolean;
};

function supportsWebGL(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const webgl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const webgl2 = canvas.getContext("webgl2");
    return Boolean(webgl || webgl2);
  } catch {
    return false;
  }
}

function getGlobeLayout(viewportWidth: number) {
  if (viewportWidth < 420) {
    return { width: 320, height: 300, maxWidth: 320, isMobile: true };
  }

  if (viewportWidth < 768) {
    return { width: 380, height: 340, maxWidth: 380, isMobile: true };
  }

  return { width: 460, height: 400, maxWidth: 460, isMobile: false };
}

function subscribeToViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportSnapshot() {
  return window.innerWidth;
}

function getServerViewportSnapshot() {
  return 1024;
}

function subscribeToWebGLSupport(callback: () => void) {
  const frame = window.requestAnimationFrame(callback);
  return () => window.cancelAnimationFrame(frame);
}

function getWebGLSnapshot() {
  return supportsWebGL();
}

function getServerWebGLSnapshot() {
  return true;
}

function hashString(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function jitterCoordinates(lat: number, lng: number, seed: string) {
  const hash = hashString(seed);
  const latOffset = ((hash % 17) - 8) * 0.1;
  const lngOffset = (((hash / 17) % 17) - 8) * 0.1;
  const nextLat = Math.max(-85, Math.min(85, lat + latOffset));
  let nextLng = lng + lngOffset;

  if (nextLng > 180) nextLng -= 360;
  if (nextLng < -180) nextLng += 360;

  return { lat: nextLat, lng: nextLng };
}

export function HeroGlobeCard() {
  const [isGlobeHovered, setIsGlobeHovered] = useState(false);
  const hasWebGL = useSyncExternalStore(
    subscribeToWebGLSupport,
    getWebGLSnapshot,
    getServerWebGLSnapshot,
  );
  const viewportWidth = useSyncExternalStore(
    subscribeToViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  );
  const globeLayout = getGlobeLayout(viewportWidth);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const focusedSessionRef = useRef<string | null>(null);
  const { visitors, currentVisitor, connectionState } = useLiveVisitors();

  const markerData = useMemo<MarkerPoint[]>(() => {
    const seen = new Map<string, MarkerPoint>();

    for (const visitor of visitors.slice(0, 24)) {
      const key = visitor.sessionId || visitor.clientId;
      const jittered = jitterCoordinates(visitor.latitude, visitor.longitude, key);

      seen.set(key, {
        lat: jittered.lat,
        lng: jittered.lng,
        avatarSeed: visitor.avatarSeed,
        city: visitor.city,
        country: visitor.country,
        isCurrent: currentVisitor?.sessionId === visitor.sessionId,
      });
    }

    return Array.from(seen.values());
  }, [visitors, currentVisitor]);

  const ringData = useMemo(() => {
    if (!currentVisitor) {
      return [];
    }

    return [{ lat: currentVisitor.latitude, lng: currentVisitor.longitude }];
  }, [currentVisitor]);

  const status = useMemo(() => {
    if (connectionState === "live") {
      return { label: "Live network", tone: "text-emerald-300" };
    }

    if (connectionState === "local") {
      return { label: "Local preview", tone: "text-amber-300" };
    }

    return { label: "Connecting", tone: "text-zinc-400" };
  }, [connectionState]);

  const greeting = currentVisitor
    ? `Hello from ${currentVisitor.city}, ${currentVisitor.country}.`
    : "Resolving visitor signal...";

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (!controls) {
      return;
    }

    controls.autoRotate = !isGlobeHovered;
  }, [isGlobeHovered]);

  useEffect(() => {
    if (!currentVisitor || focusedSessionRef.current === currentVisitor.sessionId) {
      return;
    }

    globeRef.current?.pointOfView(
      {
        lat: currentVisitor.latitude,
        lng: currentVisitor.longitude,
        altitude: 2.15,
      },
      1200,
    );

    focusedSessionRef.current = currentVisitor.sessionId;
  }, [currentVisitor]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
      className="group relative w-full max-w-[440px]"
    >
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-indigo-300" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              Visitor Orbit
            </p>
            <p className="mt-1 max-w-[260px] text-sm leading-relaxed text-zinc-400">
              A presence layer for the people viewing this portfolio.
            </p>
          </div>
          <div className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-[11px] ${status.tone}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
            {status.label}
          </div>
        </div>

        <div
          className="relative mx-auto mb-4 w-full overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950/50"
          style={{ height: globeLayout.height, maxWidth: globeLayout.maxWidth }}
          onMouseEnter={() => setIsGlobeHovered(true)}
          onMouseLeave={() => setIsGlobeHovered(false)}
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(9,9,11,0.32)_100%)]" />

          {hasWebGL ? (
            <GlobeCanvas
              globeRef={globeRef}
              width={globeLayout.width}
              height={globeLayout.height}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
              bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
              showAtmosphere
              atmosphereColor="#818cf8"
              atmosphereAltitude={globeLayout.isMobile ? 0.12 : 0.15}
              globeCurvatureResolution={globeLayout.isMobile ? 6 : 4}
              pointsData={[]}
              ringsData={ringData}
              ringLat="lat"
              ringLng="lng"
              ringColor={() => ["rgba(129,140,248,0.8)", "rgba(129,140,248,0.04)"]}
              ringMaxRadius={globeLayout.isMobile ? 3 : 3.8}
              ringPropagationSpeed={globeLayout.isMobile ? 1.4 : 1.8}
              ringRepeatPeriod={globeLayout.isMobile ? 1200 : 900}
              htmlElementsData={markerData}
              htmlLat="lat"
              htmlLng="lng"
              htmlAltitude={0.03}
              htmlElement={(item) => {
                const marker = item as MarkerPoint;
                const size = marker.isCurrent ? 30 : 24;
                const el = document.createElement("div");
                const img = document.createElement("img");

                el.style.width = `${size}px`;
                el.style.height = `${size}px`;
                el.style.borderRadius = "999px";
                el.style.overflow = "hidden";
                el.style.border = marker.isCurrent
                  ? "2px solid rgba(129, 140, 248, 0.95)"
                  : "2px solid rgba(255, 255, 255, 0.82)";
                el.style.boxShadow = marker.isCurrent
                  ? "0 0 0 3px rgba(129, 140, 248, 0.35)"
                  : "0 0 0 2px rgba(10, 10, 12, 0.45)";
                el.style.background = "#0a0a0c";
                el.style.transform = "translate(-50%, -50%)";
                el.title = `${marker.city}, ${marker.country}`;

                img.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(marker.avatarSeed)}`;
                img.alt = `${marker.city}, ${marker.country}`;
                img.width = size;
                img.height = size;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "cover";

                el.appendChild(img);
                return el;
              }}
              onGlobeReady={() => {
                const controls = globeRef.current?.controls();
                if (!controls) {
                  return;
                }

                controls.autoRotate = true;
                controls.autoRotateSpeed = globeLayout.isMobile ? 0.28 : 0.38;
                controls.enablePan = false;
                controls.minDistance = globeLayout.isMobile ? 150 : 140;
                controls.maxDistance = globeLayout.isMobile ? 250 : 280;
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-zinc-500">
              WebGL is unavailable on this device. Showing visitor summary only.
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <MapPin className="mb-2 h-4 w-4 text-indigo-300" />
            <p className="text-[10px] uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Signal</p>
            <p className="mt-1 truncate text-xs text-zinc-300">{currentVisitor?.countryCode ?? "--"}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <Users className="mb-2 h-4 w-4 text-emerald-300" />
            <p className="text-[10px] uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Nodes</p>
            <p className="mt-1 text-xs text-zinc-300">{markerData.length || "--"} visible</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <Radio className="mb-2 h-4 w-4 text-amber-300" />
            <p className="text-[10px] uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Mode</p>
            <p className="mt-1 truncate text-xs text-zinc-300">{connectionState}</p>
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-zinc-300">
          <Globe size={16} className="text-indigo-300" />
          {greeting}
        </p>

        <p className="mt-2 text-center text-[11px] text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
          {connectionState === "live"
            ? "Realtime visitor data is active."
            : "Realtime data is unavailable here, so this preview uses local signals."}
        </p>
      </div>
    </motion.aside>
  );
}
