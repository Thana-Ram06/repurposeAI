"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LogOut, LogIn, History, Wand2, Sun, Moon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

export default function Navbar() {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isLight = theme === "light";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        background: isLight
          ? "rgba(248,250,252,0.92)"
          : "rgba(8,12,18,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background 0.2s ease, border-color 0.2s ease",
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
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="ZenoAI Logo"
            width={32}
            height={32}
            style={{ borderRadius: "0.375rem" }}
          />
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--fg)" }}>
            ZenoAI
          </span>
        </Link>

        {/* Nav links + actions */}
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
              color: pathname === "/generate" ? "var(--primary)" : "var(--muted)",
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
              color: pathname === "/history" ? "var(--primary)" : "var(--muted)",
              background: pathname === "/history" ? "rgba(34,197,94,0.08)" : "transparent",
              transition: "all 0.15s ease",
            }}
          >
            <History size={15} />
            History
          </Link>

          {/* Divider */}
          <div style={{ width: "1px", height: "1.25rem", background: "var(--border)", margin: "0 0.375rem" }} />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.125rem",
              height: "2.125rem",
              borderRadius: "0.5rem",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Auth */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginLeft: "0.375rem" }}>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? "User"}
                  style={{
                    width: "1.875rem",
                    height: "1.875rem",
                    borderRadius: "50%",
                    border: "1px solid var(--border)",
                  }}
                />
              )}
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
                  color: "var(--muted)",
                  background: "transparent",
                  border: "1px solid var(--border)",
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
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
                marginLeft: "0.375rem",
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
