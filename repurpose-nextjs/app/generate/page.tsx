"use client";

import { useState, useEffect } from "react";
import { Wand2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import OutputCard from "@/components/OutputCard";
import { useAuth } from "@/lib/auth-context";
import { saveGeneration } from "@/lib/firestore";

type Tone = "casual" | "professional" | "viral";

interface GenerateResult {
  tweets: string[];
  linkedin: string;
  blog: string;
  hooks: string[];
  captions: string[];
}

const tones: { value: Tone; label: string; desc: string }[] = [
  { value: "casual", label: "Casual", desc: "Friendly & relatable" },
  { value: "professional", label: "Professional", desc: "Polished & authoritative" },
  { value: "viral", label: "Viral", desc: "High-energy & shareable" },
];

export default function GeneratePage() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingText");
    if (pending) {
      setText(pending);
      sessionStorage.removeItem("pendingText");
    }
  }, []);

  const handleGenerate = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to generate");
      }

      const data: GenerateResult = await res.json();
      setResult(data);

      if (user) {
        await saveGeneration(user.uid, text, tone, data).catch(console.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", transition: "background 0.2s ease" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 280px",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Left: Input */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
                Source Material
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your raw text, transcript, or ideas here..."
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  borderRadius: "0.75rem",
                  color: "var(--input-text)",
                  padding: "1rem 1.25rem",
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                  fontFamily: "Inter, sans-serif",
                  outline: "none",
                  resize: "vertical",
                  width: "100%",
                  minHeight: "220px",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--input-border-focus)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--input-border)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Right: Tone + Button */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
                Select Tone
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    style={{
                      padding: "0.875rem 1rem",
                      borderRadius: "0.625rem",
                      border: `1px solid ${tone === t.value ? "var(--primary)" : "var(--border)"}`,
                      background: tone === t.value ? "var(--primary-glow)" : "transparent",
                      color: tone === t.value ? "var(--primary)" : "var(--fg)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{t.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.125rem" }}>{t.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !text.trim()}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.875rem",
                  borderRadius: "0.625rem",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: "#000",
                  background: loading || !text.trim() ? "var(--muted-2)" : "var(--primary)",
                  border: "none",
                  cursor: loading || !text.trim() ? "not-allowed" : "pointer",
                  opacity: loading || !text.trim() ? 0.6 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    Generate Content
                  </>
                )}
              </button>

              {!user && (
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", textAlign: "center", marginTop: "0.875rem", lineHeight: 1.5 }}>
                  Sign in to save your generation history
                </p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div style={{ padding: "1rem 1.25rem", borderRadius: "0.625rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "0.875rem", height: "14rem", animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
            <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {result && !loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem", animation: "fadeIn 0.4s ease" }}>
            <OutputCard title="Tweets" icon="𝕏" content={result.tweets} />
            <OutputCard title="LinkedIn Post" icon="💼" content={result.linkedin} />
            <OutputCard title="Blog Article" icon="📝" content={result.blog} />
            <OutputCard title="Viral Hooks" icon="⚡" content={result.hooks} />
            <OutputCard title="Instagram Captions" icon="📸" content={result.captions} />
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          </div>
        )}
      </div>
    </div>
  );
}
