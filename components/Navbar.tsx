import Link from "next/link";
import { Home, Briefcase, User, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav style={{ paddingTop: "clamp(16px, 4vw, 32px)", paddingBottom: "clamp(32px, 6vw, 64px)" }}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "clamp(12px, 3vw, 20px)", flexWrap: "wrap" }}>
          <Link href="/" className="nav-link font-mono flex-row" style={{ gap: "4px" }}>
            <Home size={14} /> home
          </Link>
          <a href="#work" className="nav-link font-mono flex-row" style={{ gap: "4px" }}>
            <Briefcase size={14} /> work
          </a>
          <a href="#about" className="nav-link font-mono flex-row" style={{ gap: "4px" }}>
            <User size={14} /> about
          </a>
          {/* TODO: Drop your resume.pdf into /public to make this a direct download */}
          <a
            href="https://www.linkedin.com/in/muhammad-bilal0021/"
            target="_blank"
            rel="noreferrer"
            className="nav-link font-mono flex-row"
            style={{ gap: "4px" }}
          >
            <FileText size={14} /> resume
          </a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
