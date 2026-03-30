"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

interface OutputCardProps {
  title: string;
  icon: string;
  content: string | string[];
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export default function OutputCard({
  title,
  icon,
  content,
  onRegenerate,
  isRegenerating,
}: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const textContent = Array.isArray(content)
    ? content.map((item, i) => `${i + 1}. ${item}`).join("\n\n")
    : content;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="card-hover"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "0.875rem",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span style={{ fontSize: "1.125rem" }}>{icon}</span>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-foreground)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h3>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              title="Regenerate"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "0.5rem",
                background: "transparent",
                border: "1px solid var(--color-border)",
                color: "var(--color-muted)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <RefreshCw size={13} style={{ animation: isRegenerating ? "spin 1s linear infinite" : "none" }} />
            </button>
          )}
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2rem",
              height: "2rem",
              borderRadius: "0.5rem",
              background: copied ? "rgba(34,197,94,0.1)" : "transparent",
              border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "var(--color-border)"}`,
              color: copied ? "var(--color-primary)" : "var(--color-muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {Array.isArray(content) ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {content.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "0.875rem 1rem",
                background: "var(--color-surface-2)",
                borderRadius: "0.625rem",
                border: "1px solid var(--color-border)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "var(--color-foreground)",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  marginRight: "0.5rem",
                }}
              >
                {i + 1}.
              </span>
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.75,
            color: "#b0bec5",
            whiteSpace: "pre-wrap",
            maxHeight: "16rem",
            overflowY: "auto",
            paddingRight: "0.25rem",
          }}
        >
          {content}
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
