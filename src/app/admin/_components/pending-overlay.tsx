"use client";

import { Loader2 } from "lucide-react";
import { theme as t } from "../../_components/reusable/theme";

interface PendingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const PendingOverlay = ({
  isVisible,
  message = "Memproses...",
}: PendingOverlayProps) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--overlay-backdrop)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "all" : "none",
        transition: "opacity 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          padding: "20px 28px",
          background: "var(--overlay-card-bg)",
          border: "2px solid var(--overlay-card-border)",
          boxShadow: "var(--overlay-card-shadow)",
          transform: isVisible ? "scale(1)" : "scale(0.95)",
          transition: "transform 0.2s ease",
          minWidth: 160,
        }}
      >
        <Loader2
          className={`animate-spin ${t.overlaySpinner}`}
          style={{ width: 32, height: 32 }}
          strokeWidth={2.5}
        />
        <div style={{ textAlign: "center" }}>
          <p
            className={`font-mono ${t.overlayTitle}`}
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: "0.5px",
            }}
          >
            {message}
          </p>
          <p
            className={`font-mono ${t.overlaySubtitle}`}
            style={{
              fontSize: 10.5,
              margin: "4px 0 0",
              letterSpacing: "0.5px",
            }}
          >
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    </div>
  );
};
