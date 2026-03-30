"use client";

import { useEffect, useState } from "react";
import { History, LogIn, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth-context";
import { getUserGenerations, type GenerationRecord } from "@/lib/firestore";

function HistoryItem({ item }: { item: GenerationRecord }) {
  const [expanded, setExpanded] = useState(false);

  const toneColors: Record<string, string> = {
    casual: "rgba(59,130,246,0.15)",
    professional: "rgba(168,85,247,0.15)",
    viral: "rgba(34,197,94,0.15)",
  };
  const toneFg: Record<string, string> = {
    casual: "#60a5fa",
    professional: "#c084fc",
    viral: "#4ade80",
  };

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "0.875rem",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-foreground)",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: "0.25rem",
            }}
          >
            {item.input}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                padding: "0.125rem 0.5rem",
                borderRadius: "9999px",
                background: toneColors[item.tone] ?? "rgba(100,116,139,0.15)",
                color: toneFg[item.tone] ?? "var(--color-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {item.tone}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
              {item.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div style={{ color: "var(--color-muted)", flexShrink: 0 }}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {item.output.tweets.length > 0 && (
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>
                Tweets
              </p>
              {item.output.tweets.map((t, i) => (
                <p key={i} style={{ fontSize: "0.875rem", color: "#b0bec5", lineHeight: 1.6, padding: "0.5rem 0", borderBottom: i < item.output.tweets.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                  {t}
                </p>
              ))}
            </div>
          )}
          {item.output.linkedin && (
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>
                LinkedIn
              </p>
              <p style={{ fontSize: "0.875rem", color: "#b0bec5", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {item.output.linkedin}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [generations, setGenerations] = useState<GenerationRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserGenerations(user.uid)
      .then(setGenerations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      <Navbar />

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "0.625rem",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-primary)",
            }}
          >
            <History size={16} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-foreground)" }}>
              Generation History
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>
              All your past AI-generated content
            </p>
          </div>
        </div>

        {authLoading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--color-muted)" }}>
            Loading...
          </div>
        ) : !user ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "1rem",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-foreground)", marginBottom: "0.5rem" }}>
              Sign in to view history
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", marginBottom: "1.5rem" }}>
              Your generation history is saved when you&apos;re signed in with Google.
            </p>
            <button onClick={signInWithGoogle} className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <LogIn size={15} />
              Sign In with Google
            </button>
          </div>
        ) : loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "5rem",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.875rem",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
            <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }`}</style>
          </div>
        ) : generations.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "1rem",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-foreground)", marginBottom: "0.5rem" }}>
              No generations yet
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>
              Go to the Generate page to create your first repurposed content.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {generations.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
