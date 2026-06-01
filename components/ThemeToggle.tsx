"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      if (saved === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  }, []);

  const toggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <button
      onClick={toggle}
      style={{
        background: "transparent",
        border: "none",
        color: "var(--text-secondary)",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "14px",
      }}
      aria-label="Toggle theme"
    >
      [ {theme === "dark" ? "light" : "dark"} ]
    </button>
  );
}
