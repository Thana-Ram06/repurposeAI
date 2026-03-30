"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LogOut, LogIn, History, Wand2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--color-border)",
        background: "rgba(8, 12, 18, 0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "3.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "0.5rem",
              background: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={14} color="#000" />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-foreground)",
            }}
          >
            RepurposeAI
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Link
            href="/generate"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.5rem 0.875rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              color: pathname === "/generate" ? "var(--color-primary)" : "var(--color-muted)",
              background: pathname === "/generate" ? "rgba(34,197,94,0.08)" : "transparent",
              transition: "all 0.15s ease",
            }}
          >
            <Wand2 size={15} />
            Generate
          </Link>

          <Link
            href="/history"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.5rem 0.875rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              color: pathname === "/history" ? "var(--color-primary)" : "var(--color-muted)",
              background: pathname === "/history" ? "rgba(34,197,94,0.08)" : "transparent",
              transition: "all 0.15s ease",
            }}
          >
            <History size={15} />
            History
          </Link>

          <div style={{ width: "1px", height: "1.25rem", background: "var(--color-border)", margin: "0 0.5rem" }} />

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img
                src={user.photoURL ?? ""}
                alt={user.displayName ?? "User"}
                style={{ width: "1.875rem", height: "1.875rem", borderRadius: "50%", border: "1px solid var(--color-border)" }}
              />
              <button
                onClick={signOutUser}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#000",
                background: "var(--color-primary)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <LogIn size={14} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
