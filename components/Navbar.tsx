import Link from "next/link";
import { Home, Briefcase, User, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav style={{ padding: "32px 0 64px" }}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Link href="/" className="nav-link font-mono flex-row" style={{ gap: "6px" }}>
            <Home size={14} /> home
          </Link>
          <a href="#work" className="nav-link font-mono flex-row" style={{ gap: "6px" }}>
            <Briefcase size={14} /> work
          </a>
          <a href="#about" className="nav-link font-mono flex-row" style={{ gap: "6px" }}>
            <User size={14} /> about
          </a>
          {/* TODO: Drop your resume.pdf into /public to make this a direct download */}
          <a
            href="https://www.linkedin.com/in/muhammad-bilal0021/"
            target="_blank"
            rel="noreferrer"
            className="nav-link font-mono flex-row"
            style={{ gap: "6px" }}
          >
            <FileText size={14} /> resume
          </a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
