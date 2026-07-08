"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndTrackVisit = async () => {
      try {
        const visitResponse = await fetch("/api/visits", { method: "POST" });
        if (!visitResponse.ok) {
          return;
        }

        const visitData = await visitResponse.json();
        setCount(typeof visitData.count === "number" ? visitData.count : null);
      } catch {
        try {
          const getResponse = await fetch("/api/visits");
          if (getResponse.ok) {
            const getData = await getResponse.json();
            setCount(typeof getData.count === "number" ? getData.count : null);
          }
        } catch {
          setCount(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndTrackVisit();
  }, []);

  if (isLoading || count === null) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 text-xs text-zinc-500">
        <Eye size={14} />
        <span>—</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-default">
      <Eye size={14} />
      <span>{count.toLocaleString()}</span>
    </div>
  );
}
