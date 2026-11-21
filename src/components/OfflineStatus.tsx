"use client";
import { useEffect, useState } from "react";
import { useNetworkStatus } from "@/lib/use-network-status";

export default function OfflineStatus() {
  const online = useNetworkStatus();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [update, setUpdate] = useState<ServiceWorker | null>(null);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator) || !window.isSecureContext) return;
    let alive = true;
    let updateRequested = false;
    let registration: ServiceWorkerRegistration | undefined;
    const reload = () => { if (updateRequested) window.location.reload(); };
    navigator.serviceWorker.addEventListener("controllerchange", reload);
    const inspect = () => {
      if (!alive || !registration) return;
      if (registration.waiting) setUpdate(registration.waiting);
      const installing = registration.installing;
      installing?.addEventListener("statechange", () => {
        if (!alive) return;
        if (installing.state === "installed" && navigator.serviceWorker.controller) setUpdate(installing);
        if (installing.state === "redundant" && !registration?.active) setFailed(true);
      });
    };
    void navigator.serviceWorker.register("/sw.js", {scope:"/",updateViaCache:"none"}).then(value => {
      registration = value;
      if (!alive) return;
      inspect();
      value.addEventListener("updatefound",inspect);
      return navigator.serviceWorker.ready;
    }).then(value => {
      if (alive && value?.active) { setReady(true); value.active.postMessage({type:"WORDGRID_STATUS"}); }
    }).catch(() => { if (alive) setFailed(true); });
    const request = () => { updateRequested = true; };
    window.addEventListener("wordgrid-update-requested",request);
    return () => { alive=false; registration?.removeEventListener("updatefound",inspect); navigator.serviceWorker.removeEventListener("controllerchange",reload); window.removeEventListener("wordgrid-update-requested",request); };
  }, []);
  if (!ready && !failed && online) return null;
  return <aside aria-label="Offline availability" className="border-b border-border/60 bg-surface/50 px-4 py-2 text-center text-xs text-text-muted">
    <span role="status">{!online ? ready ? "Offline · saved games and Complete archive are available. Rankings need a connection." : "Offline · connect once to prepare games on this device." : ready ? "Offline play ready on this device" : "Offline setup unavailable. Reload online to try again."}</span>
    {update && <button onClick={() => { window.dispatchEvent(new Event("wordgrid-update-requested")); update.postMessage({type:"WORDGRID_UPDATE"}); }} className="ml-3 font-semibold text-primary">Update ready · reload</button>}
  </aside>;
}
