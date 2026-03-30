"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Zap, FileText, Twitter, Linkedin, Instagram, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  { icon: <Twitter size={20} />, title: "5 Viral Tweets", desc: "Bite-sized threads optimized for maximum engagement and reach." },
  { icon: <Linkedin size={20} />, title: "LinkedIn Post", desc: "Professional storytelling posts that build authority and drive connections." },
  { icon: <BookOpen size={20} />, title: "Blog Article", desc: "Full SEO-friendly blog post with proper headings and structure." },
  { icon: <Zap size={20} />, title: "5 Viral Hooks", desc: "Attention-grabbing openers that stop the scroll instantly." },
  { icon: <Instagram size={20} />, title: "3 IG Captions", desc: "Engaging Instagram captions with emojis and call-to-actions." },
  { icon: <FileText size={20} />, title: "Any Tone", desc: "Casual, Professional, or Viral — your content, your voice." },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: ["5 generations/month", "All content types", "Copy & export"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    features: ["Unlimited generations", "Priority AI model", "Generation history", "API access"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$49",
    period: "/month",
    features: ["Everything in Pro", "Team access (5 seats)", "Custom tones", "Dedicated support"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function HomePage() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    if (!text.trim()) return;
    sessionStorage.setItem("pendingText", text);
    router.push("/generate");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", transition: "background 0.2s ease" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", padding: "6rem 1.5rem 5rem", maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.375rem 1rem",
            borderRadius: "9999px",
            background: "var(--primary-glow)",
            border: "1px solid rgba(34,197,94,0.2)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--primary)",
            marginBottom: "2rem",
          }}
        >
          <Sparkles size={13} />
          The Ultimate AI Content Engine
        </div>

        <h1
          style={{
            fontFamily: "Instrument Serif, Georgia, serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--fg)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Turn Any Content Into{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, #4ade80 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Viral Gold.
          </span>
        </h1>

        <p style={{ fontSize: "1.125rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 3rem" }}>
          Instantly repurpose a single idea or raw transcript into high-performing Twitter
          threads, LinkedIn posts, blog articles, and captivating hooks.
        </p>

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "1.25rem",
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your YouTube transcript, blog post, or rough idea here..."
            rows={5}
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
              resize: "none",
              width: "100%",
              minHeight: "200px",
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleGenerate}
              disabled={!text.trim()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.625rem",
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "#000",
                background: text.trim() ? "var(--primary)" : "var(--muted-2)",
                border: "none",
                cursor: text.trim() ? "pointer" : "not-allowed",
                opacity: text.trim() ? 1 : 0.5,
                transition: "all 0.2s ease",
              }}
            >
              <Sparkles size={15} />
              Generate Magic
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 400, color: "var(--fg)", marginBottom: "0.75rem" }}>
            Everything you need to go viral
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem" }}>One input. Five content formats. Infinite possibilities.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "0.875rem",
                padding: "1.5rem",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                cursor: "default",
                boxShadow: "var(--card-shadow)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-light)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.625rem",
                  background: "var(--primary-glow)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  marginBottom: "1rem",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--fg)", marginBottom: "0.375rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "4rem 1.5rem 6rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 400, color: "var(--fg)", marginBottom: "0.75rem" }}>
            Simple, transparent pricing
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem" }}>Start free. Upgrade when you&apos;re ready.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", maxWidth: "900px", margin: "0 auto" }}>
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.highlighted ? "var(--primary-glow)" : "var(--surface)",
                border: `1px solid ${plan.highlighted ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
                borderRadius: "0.875rem",
                padding: "2rem",
                position: "relative",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {plan.highlighted && (
                <div style={{ position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#000", fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.875rem", borderRadius: "9999px" }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{plan.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--fg)" }}>{plan.price}</span>
                  <span style={{ color: "var(--muted)", fontSize: "0.875rem" }}>{plan.period}</span>
                </div>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--fg)" }}>
                    <span style={{ color: "var(--primary)", fontSize: "1rem" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.625rem",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  cursor: "pointer",
                  border: plan.highlighted ? "none" : "1px solid var(--border)",
                  background: plan.highlighted ? "var(--primary)" : "transparent",
                  color: plan.highlighted ? "#000" : "var(--fg)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!plan.highlighted) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-light)";
                }}
                onMouseLeave={(e) => {
                  if (!plan.highlighted) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem 1.5rem", textAlign: "center", color: "var(--muted)", fontSize: "0.875rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <Sparkles size={13} color="var(--primary)" />
          <span style={{ fontWeight: 600, color: "var(--fg)" }}>GenovaAI</span>
        </div>
        <p>© 2026 GenovaAI. Crafted with precision.</p>
      </footer>
    </div>
  );
}
