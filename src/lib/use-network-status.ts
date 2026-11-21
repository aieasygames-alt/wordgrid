"use client";
import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const up = () => setOnline(true), down = () => setOnline(false);
    const message = (event: MessageEvent) => {
      if (event.data?.type === "WORDGRID_NETWORK") setOnline(event.data.online === true);
    };
    setOnline(navigator.onLine);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    navigator.serviceWorker?.addEventListener("message", message);
    navigator.serviceWorker?.controller?.postMessage({ type: "WORDGRID_STATUS" });
    return () => {
      window.removeEventListener("online", up); window.removeEventListener("offline", down);
      navigator.serviceWorker?.removeEventListener("message", message);
    };
  }, []);
  return online;
}
