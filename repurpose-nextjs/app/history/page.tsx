"use client";

import { useEffect, useState } from "react";
import { History, LogIn, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth-context";
import { getUserGenerations, type GenerationRecord } from "@/lib/firestore";

function HistoryItem({ item }: { item: GenerationRecord }) {
  const [expanded, setExpanded] = useState(false);

  const toneMeta: Record<string, { bg: string; color: string }> = {
    casual: { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" },
    professional: { bg: "rgba(168,85,247,0.12)", color: "#c084fc" },
    viral: { bg: "rgba(34,197,94,0.12)", color: "#4ade80" },
  };
  const meta = toneMeta[item.tone] ?? { bg: "rgba(100,116,139,0.12)", color: "var(--muted)" };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden", transition: "border-color 0.2s ease", boxShadow: "var(--card-shadow)" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: "100%", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "0.9375rem", color: "var(--fg)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.25rem" }}>
            {item.input}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, padding: "0.125rem 0.5rem", borderRadius: "9999px", background: meta.bg, color: meta.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {item.tone}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
              {item.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
        <div style={{ color: "var(--muted)", flexShrink: 0 }}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {item.output.tweets.length > 0 && (
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>Tweets</p>
              {item.output.tweets.map((t, i) => (
                <p key={i} style={{ fontSize: "0.875rem", color: "var(--fg-2)", lineHeight: 1.6, padding: "0.5rem 0", borderBottom: i < item.output.tweets.length - 1 ? "1px solid var(--border)" : "none" }}>{t}</p>
              ))}
            </div>
          )}
          {item.output.linkedin && (
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>LinkedIn</p>
              <p style={{ fontSize: "0.875rem", color: "var(--fg-2)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.output.linkedin}</p>
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
    getUserGenerations(user.uid).then(setGenerations).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", transition: "background 0.2s ease" }}>
      <Navbar />

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.625rem", background: "var(--primary-glow)", border: "1px solid rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
            <History size={16} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)" }}>Generation History</h1>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>All your past AI-generated content</p>
          </div>
        </div>

        {authLoading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--muted)" }}>Loading...</div>
        ) : !user ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>Sign in to view history</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>Your generation history is saved when you&apos;re signed in with Google.</p>
            <button
              onClick={signInWithGoogle}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.75rem", borderRadius: "0.625rem", fontWeight: 600, fontSize: "0.9375rem", color: "#000", background: "var(--primary)", border: "none", cursor: "pointer" }}
            >
              <LogIn size={15} />
              Sign In with Google
            </button>
          </div>
        ) : loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ height: "5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "0.875rem", animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
            <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }`}</style>
          </div>
        ) : generations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>No generations yet</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>Go to the Generate page to create your first repurposed content.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {generations.map((item) => <HistoryItem key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
