"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { TitleBlock } from "./components/TitleBlock";
import { ProjectLogo } from "./components/ProjectLogo";
import { CadProjectCardItem } from "./components/CadProjectCardItem";
import { CodingStats } from "./components/CodingStats";
import { getTechLogo } from "./data/techLogos";
import { Caveat } from "next/font/google";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const caveat = Caveat({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

/* ── CAD SPEC ICONS ── */
function BriefcaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UserBadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ── LIVE CAD TIME & TIMEZONE COMPARISON ── */
function CadTimeTracker() {
  const [indiaTime, setIndiaTime] = useState<string>("");
  const [timeDiffText, setTimeDiffText] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      };
      const timeStr = new Intl.DateTimeFormat("en-US", options).format(now);
      setIndiaTime(timeStr + " IST");

      const userOffsetMinutes = -now.getTimezoneOffset();
      const indiaOffsetMinutes = 330; // IST is UTC+5:30
      const diffMinutes = indiaOffsetMinutes - userOffsetMinutes;

      if (diffMinutes === 0) {
        setTimeDiffText("Same as your local time");
      } else {
        const isAhead = diffMinutes > 0;
        const absDiff = Math.abs(diffMinutes);
        const hours = Math.floor(absDiff / 60);
        const mins = absDiff % 60;

        let diffStr = "";
        if (hours > 0 && mins > 0) {
          diffStr = `${hours}h ${mins}m`;
        } else if (hours > 0) {
          diffStr = `${hours}h`;
        } else {
          diffStr = `${mins}m`;
        }

        setTimeDiffText(`${diffStr} ${isAhead ? "ahead of" : "behind"} your local time`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.02em" }}>
        {indiaTime || "--:--:-- IST"}
      </span>
      <span style={{ color: "var(--nav-link)", fontFamily: "var(--font-geist-mono)", fontSize: "9px" }}>
        {timeDiffText ? `[ ${timeDiffText} ]` : "[ Calculating offset... ]"}
      </span>
    </div>
  );
}

function CadDimensionLabel() {
  return null;
}

/* ── SOCIAL MEDIA SVG ICONS ── */
function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubSocialIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function DailyDevIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .373-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

/* ── CAD TECH STACK SPECIFICATION MATRIX ── */
function CadTechStack() {
  const stackCategories = [
    {
      id: "01",
      name: "Languages",
      skills: [
        { name: "Go", icon: "Go", logo: getTechLogo("Go"), url: "https://go.dev" },
        { name: "JavaScript", icon: "JS", logo: getTechLogo("JavaScript"), url: "https://developer.mozilla.org/docs/Web/JavaScript" },
        { name: "TypeScript", icon: "TS", logo: getTechLogo("TypeScript"), url: "https://www.typescriptlang.org" },
        { name: "Python", icon: "Py", logo: getTechLogo("Python"), url: "https://www.python.org" },
        { name: "C", icon: "C", logo: getTechLogo("C"), url: "https://en.cppreference.com/w/c" },
        { name: "SQL", icon: "SQL", logo: getTechLogo("SQL"), url: "#" },
      ],
    },
    {
      id: "02",
      name: "Frontend",
      skills: [
        { name: "React", icon: "Re", logo: getTechLogo("React"), url: "https://react.dev" },
        { name: "Next.js", icon: "Nx", logo: getTechLogo("Next.js"), url: "https://nextjs.org" },
        { name: "HTML", icon: "H5", logo: getTechLogo("HTML"), url: "https://developer.mozilla.org/docs/Web/HTML" },
        { name: "CSS", icon: "CSS", logo: getTechLogo("CSS"), url: "https://developer.mozilla.org/docs/Web/CSS" },
        { name: "Tailwind", icon: "Tw", logo: getTechLogo("Tailwind"), url: "https://tailwindcss.com" },
        { name: "Redux", icon: "Rx", logo: getTechLogo("Redux"), url: "https://redux.js.org" },
      ],
    },
    {
      id: "03",
      name: "Backend & APIs",
      skills: [
        { name: "Node.js", icon: "Nd", logo: getTechLogo("Node.js"), url: "https://nodejs.org" },
        { name: "Express", icon: "Ex", logo: getTechLogo("Express"), url: "https://expressjs.com" },
        { name: "Gin", icon: "Gin", logo: getTechLogo("Gin"), url: "https://gin-gonic.com" },
        { name: "Fiber", icon: "Fb", logo: getTechLogo("Fiber"), url: "https://gofiber.io" },
        { name: "Flask", icon: "Fl", logo: getTechLogo("Flask"), url: "https://flask.palletsprojects.com" },
        { name: "REST APIs", icon: "API", logo: getTechLogo("REST APIs"), url: "#" },
        { name: "Microservices", icon: "svc", logo: getTechLogo("Microservices"), url: "#" },
      ],
    },
    {
      id: "04",
      name: "Databases",
      skills: [
        { name: "PostgreSQL", icon: "Pg", logo: getTechLogo("PostgreSQL"), url: "https://www.postgresql.org" },
        { name: "MySQL", icon: "My", logo: getTechLogo("MySQL"), url: "https://www.mysql.com" },
        { name: "SQLite", icon: "Lt", logo: getTechLogo("SQLite"), url: "https://www.sqlite.org" },
        { name: "MongoDB", icon: "Mg", logo: getTechLogo("MongoDB"), url: "https://www.mongodb.com" },
        { name: "Redis", icon: "Rd", logo: getTechLogo("Redis"), url: "https://redis.io" },
      ],
    },
    {
      id: "05",
      name: "DevOps & Infra",
      skills: [
        { name: "Linux", icon: "Lx", logo: getTechLogo("Linux"), url: "https://www.linux.org" },
        { name: "Nginx", icon: "ngx", logo: getTechLogo("Nginx"), url: "https://nginx.org" },
        { name: "Docker", icon: "Dk", logo: getTechLogo("Docker"), url: "https://www.docker.com" },
        { name: "Kubernetes", icon: "K8s", logo: getTechLogo("Kubernetes"), url: "https://kubernetes.io" },
        { name: "CI/CD", icon: "CI", logo: getTechLogo("CI/CD"), url: "#" },
        { name: "PM2", icon: "PM2", logo: getTechLogo("PM2"), url: "https://pm2.keymetrics.io" },
        { name: "Bash", icon: "sh", logo: getTechLogo("Bash"), url: "https://www.gnu.org/software/bash/" },
        { name: "Cloudflare", icon: "CF", logo: getTechLogo("Cloudflare"), url: "https://www.cloudflare.com" },
        { name: "Hosting", icon: "Ho", logo: getTechLogo("Hosting"), url: "#" },
      ],
    },
    {
      id: "06",
      name: "Tools",
      skills: [
        { name: "Git", icon: "Git", logo: getTechLogo("Git"), url: "https://git-scm.com" },
        { name: "GitHub", icon: "GH", logo: getTechLogo("GitHub"), url: "https://github.com/kairavb" },
      ],
    },
    {
      id: "07",
      name: "IoT & Hardware",
      skills: [
        { name: "Arduino", icon: "Ar", logo: getTechLogo("Arduino"), url: "https://www.arduino.cc" },
        { name: "ESP32", icon: "ESP", logo: getTechLogo("ESP32"), url: "https://www.espressif.com/en/products/socs/esp32" },
        { name: "Raspberry Pi", icon: "RPi", logo: getTechLogo("Raspberry Pi"), url: "https://www.raspberrypi.com" },
      ],
    },
  ];
  return (
    <div
      id="skills"
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        marginTop: "24px",
        position: "relative",
      }}
    >
      <CadDimensionLabel />


      {/* Header Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          fontSize: "11px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "10px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <span style={{ backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
          <span>Tech Stack</span>
        </div>
        <span>TOTAL: {stackCategories.reduce((n, c) => n + c.skills.length, 0)}_TOOLS</span>
      </div>

      {/* Category Rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {stackCategories.map((cat, index) => (
          <div
            key={cat.id}
            className={clsx('grid', 'grid-cols-1', 'md:grid-cols-[200px_1fr]')}
            style={{
              borderBottom: index === stackCategories.length - 1 ? "none" : "1px solid var(--line-stroke)",
            }}
          >
            {/* Category Header */}
            <div
              style={{
                alignItems: "center",
                backgroundColor: "var(--line-fill)",
                borderRight: "1px dashed var(--line-stroke)",
                display: "flex",
                fontSize: "11px",
                gap: "8px",
                padding: "14px 16px",
              }}
            >
              <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>{cat.id} //</span>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{cat.name}</span>
            </div>

            {/* Chips Container */}
            <div
              style={{
                alignItems: "center",
                backgroundColor: "var(--background)",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                padding: "12px 16px",
              }}
            >
              {cat.skills.map((skill) => (
                <a
                  href={skill.url || "#"}
                  target={skill.url && skill.url !== "#" ? "_blank" : undefined}
                  rel={skill.url && skill.url !== "#" ? "noopener noreferrer" : undefined}
                  key={skill.name}
                  style={{
                    alignItems: "center",
                    backgroundColor: "var(--line-fill)",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "4px",
                    color: "var(--foreground)",
                    cursor: skill.url && skill.url !== "#" ? "pointer" : "default",
                    display: "inline-flex",
                    fontSize: "12px",
                    fontWeight: 500,
                    gap: "6px",
                    padding: "5px 11px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--foreground)";
                    e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                    e.currentTarget.style.backgroundColor = "var(--line-fill)";
                  }}
                >
                  {skill.logo ? (
                    <div style={{ alignItems: "center", display: "flex", height: "16px", justifyContent: "center", width: "16px" }}>
                      {skill.logo}
                    </div>
                  ) : (
                    <span
                      style={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--line-stroke)",
                        borderRadius: "2px",
                        fontSize: "9px",
                        fontWeight: 700,
                        opacity: 0.8,
                        padding: "1px 4px",
                      }}
                    >
                      {skill.icon}
                    </span>
                  )}
                  <span>{skill.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CAD PROJECTS SCHEMA ── */
/* ── CAD EXPERIENCE TIMELINE ── */
function CadExperience() {
  const [expandedId, setExpandedId] = useState<string>("EXP-01");

  const experiences = [
    {
      id: "EXP-01",
      company: "Freelancing",
      description: "Building full-stack web apps and setting up & managing Linux servers for clients — from front-end to deployment and hosting.",
      period: "2024 — PRESENT",
      role: "Freelance Web & DevOps Developer",
      status: "ACTIVE",
      tech: ["React", "Node.js", "Express", "Go", "Linux", "Nginx", "Docker", "Hosting"],
    },
    {
      id: "EXP-02",
      company: "Devnovate",
      description:
        "Managed hosting and deployment infrastructure — provisioned and secured Linux VPS instances, set up process management and reverse proxying.",
      period: "May 2025 — Aug 2025",
      role: "DevOps Engineer · Internship",
      status: "COMPLETED",
      tech: ["Linux VPS", "PM2", "Bash", "Nginx", "UFW"],
    },
    {
      id: "EXP-03",
      company: "Trid India",
      description:
        "Set up and configured the client's web server and WordPress stack on a Linux VPS using HestiaCP.",
      period: "Aug 2025",
      role: "Server Setup · Freelance",
      status: "COMPLETED",
      tech: ["Linux VPS", "HestiaCP", "WordPress", "Nginx"],
    },
    {
      id: "EXP-04",
      company: "Cheap Printouts",
      description:
        "Built the storefront and ordering flow for a printing service and handled the hosting setup end to end.",
      period: "Jan 2025",
      role: "Full-Stack Developer · Freelance",
      status: "COMPLETED",
      tech: ["React", "Node.js", "Express", "Hosting"],
    },
    {
      id: "EXP-05",
      company: "BH Reels",
      description:
        "Developed a full-stack media app with a React front-end and a Node/Express back-end.",
      period: "Jun 2024",
      role: "Full-Stack Developer · Freelance",
      status: "COMPLETED",
      tech: ["React", "Node.js", "Express"],
    },
  ];

  return (
    <div
      id="experience"
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        marginTop: "24px",
        position: "relative",
      }}
    >
      <CadDimensionLabel />



      {/* Header Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          fontSize: "11px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "10px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <span style={{ backgroundColor: "#f59e0b", borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
          <span>Experience</span>
        </div>
        <span>TOTAL: 0{experiences.length}_NODES</span>
      </div>

      {/* Experience Entries */}
      <div style={{ display: "grid", gap: "0", gridTemplateColumns: "1fr" }}>
        {experiences.slice(0, 2).map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          const statusColor = exp.status === "ACTIVE" ? "#22c55e" : exp.status === "ONGOING" ? "#3b82f6" : "var(--nav-link)";

          return (
            <div
              key={exp.id}
              style={{
                backgroundColor: "var(--background)",
                borderBottom: index === 1 ? "none" : "1px solid var(--line-stroke)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--line-fill)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
            >
              {/* Compact Header Row — always visible */}
              <div
                style={{
                  alignItems: "center",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                }}
                onClick={() => setExpandedId(isExpanded ? "" : exp.id)}
              >
                <div style={{ alignItems: "center", display: "flex", gap: "12px" }}>
                  {/* Company icon */}
                  <div
                    style={{
                      alignItems: "center",
                      backgroundColor: "var(--line-fill-accent)",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "50%",
                      color: "var(--foreground)",
                      display: "flex",
                      flexShrink: 0,
                      fontSize: "14px",
                      fontWeight: 700,
                      height: "32px",
                      justifyContent: "center",
                      width: "32px",
                    }}
                  >
                    {exp.company.charAt(0)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ color: "var(--foreground)", fontSize: "14px", fontWeight: 600 }}>{exp.role}</span>
                      <span
                        style={{
                          border: `1px solid ${statusColor}`,
                          borderRadius: "2px",
                          color: statusColor,
                          fontSize: "8px",
                          letterSpacing: "0.08em",
                          padding: "2px 6px",
                        }}
                      >
                        {exp.status}
                      </span>
                    </div>
                    <span style={{ color: "var(--nav-link-hover)", fontSize: "10px", fontWeight: 500 }}>
                      @ {exp.company} · <span style={{ color: "var(--nav-link)", fontWeight: 400 }}>{exp.period}</span>
                    </span>
                  </div>
                </div>

                {/* Expand/Collapse chevron */}
                <div
                  style={{
                    alignItems: "center",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "4px",
                    color: "var(--foreground)",
                    display: "flex",
                    flexShrink: 0,
                    height: "28px",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    width: "28px",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Expandable Details */}
              <div
                style={{
                  maxHeight: isExpanded ? "500px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px 16px" }}>
                  {/* Divider */}
                  <div style={{ borderTop: "1px dashed var(--line-stroke)" }} />

                  {/* Description */}
                  <div style={{ color: "var(--nav-link-hover)", fontSize: "12px", lineHeight: "1.6", maxWidth: "800px" }}>
                    {exp.description}
                  </div>

                  {/* Tech Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--line-stroke)",
                          color: "var(--foreground)",
                          fontSize: "10px",
                          letterSpacing: "0.05em",
                          padding: "3px 7px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show All Work Button */}
      <div style={{ position: "relative" }}>
        <Link href="/work" style={{ textDecoration: "none" }}>
          <div
            style={{
              alignItems: "center",
              backgroundColor: "var(--background)",
              borderTop: "1px solid var(--line-stroke)",
              color: "var(--foreground)",
              cursor: "pointer",
              display: "flex",
              fontSize: "11px",
              fontWeight: 600,
              justifyContent: "center",
              letterSpacing: "0.1em",
              padding: "12px 16px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--line-fill)";
              e.currentTarget.style.color = "var(--nav-link-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--background)";
              e.currentTarget.style.color = "var(--foreground)";
            }}
          >
            SHOW_ALL_WORK //
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ── CAD EDUCATION TIMELINE ── */
function CadEducation() {
  const [expandedId, setExpandedId] = useState<string>("EDU-01");

  // TODO(kairav): replace with your real education details
  const education = [
    {
      id: "EDU-01",
      degree: "B.Tech",
      field: "Computer Science & AI",
      highlights: [
        "Data Structures & Algorithms",
        "Machine Learning",
        "Database Management",
        "Operating Systems",
        "AI & Data Science",
      ],
      institution: "Vivekananda Institute of Professional Studies (GGSIPU), New Delhi",
      period: "2022 — 2026",
      status: "COMPLETED",
    },
    {
      id: "EDU-02",
      degree: "Secondary & Senior Secondary (X–XII)",
      field: "Science — PCM with Computer Science",
      highlights: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      institution: "DAV Public School, New Delhi",
      period: "2020 — 2022",
      status: "COMPLETED",
    },
  ];

  return (
    <div
      id="education"
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        marginTop: "24px",
        position: "relative",
      }}
    >
      <CadDimensionLabel />



      {/* Header Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          fontSize: "11px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "10px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <span style={{ backgroundColor: "#8b5cf6", borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
          <span>Education</span>
        </div>
        <span>TOTAL: 0{education.length}_RECORDS</span>
      </div>

      {/* Education Entries */}
      <div style={{ display: "grid", gap: "0", gridTemplateColumns: "1fr" }}>
        {education.map((edu, index) => {
          const isExpanded = expandedId === edu.id;

          return (
            <div
              key={edu.id}
              style={{
                backgroundColor: "var(--background)",
                borderBottom: index === education.length - 1 ? "none" : "1px solid var(--line-stroke)",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--line-fill)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
            >
              {/* Compact Header Row — always visible */}
              <div
                style={{
                  alignItems: "center",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                }}
                onClick={() => setExpandedId(isExpanded ? "" : edu.id)}
              >
                <div style={{ alignItems: "center", display: "flex", gap: "12px" }}>
                  {/* Education icon — diamond shape */}
                  <div
                    style={{
                      alignItems: "center",
                      backgroundColor: "var(--line-fill-accent)",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "6px",
                      color: "var(--foreground)",
                      display: "flex",
                      flexShrink: 0,
                      fontSize: "16px",
                      height: "32px",
                      justifyContent: "center",
                      width: "32px",
                    }}
                  >
                    🎓
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ color: "var(--foreground)", fontSize: "14px", fontWeight: 600 }}>{edu.degree}</span>
                      <span
                        style={{
                          border: "1px solid var(--line-stroke-accent)",
                          borderRadius: "2px",
                          color: "var(--nav-link)",
                          fontSize: "8px",
                          letterSpacing: "0.08em",
                          padding: "2px 6px",
                        }}
                      >
                        {edu.status}
                      </span>
                    </div>
                    <span style={{ color: "var(--nav-link-hover)", fontSize: "10px", fontWeight: 500 }}>
                      {edu.institution} · <span style={{ color: "var(--nav-link)", fontWeight: 400 }}>{edu.period}</span>
                    </span>
                  </div>
                </div>

                {/* Expand/Collapse chevron */}
                <div
                  style={{
                    alignItems: "center",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "4px",
                    color: "var(--foreground)",
                    display: "flex",
                    flexShrink: 0,
                    height: "28px",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    width: "28px",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Expandable Details */}
              <div
                style={{
                  maxHeight: isExpanded ? "500px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px 16px" }}>
                  {/* Divider */}
                  <div style={{ borderTop: "1px dashed var(--line-stroke)" }} />

                  {/* Field */}
                  <div style={{ color: "var(--nav-link-hover)", fontSize: "12px", lineHeight: "1.6" }}>
                    Field of Study: <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{edu.field}</span>
                  </div>

                  {/* Highlight Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        style={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--line-stroke)",
                          color: "var(--foreground)",
                          fontSize: "10px",
                          letterSpacing: "0.05em",
                          padding: "3px 7px",
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

const projectCardMeta: Record<string, { brandColor: string; bgGradient: string; stars: string }> = {
  "Payment System": {
    brandColor: "#2563eb",
    bgGradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.16) 0%, rgba(30, 58, 138, 0.22) 100%)",
    stars: "",
  },
  "LinkedIn for Chefs": {
    brandColor: "#059669",
    bgGradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.16) 0%, rgba(6, 78, 59, 0.22) 100%)",
    stars: "",
  },
  "GO Linux CLI": {
    brandColor: "#06b6d4",
    bgGradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.16) 0%, rgba(14, 116, 144, 0.22) 100%)",
    stars: "",
  },
  "Minimalist Snake": {
    brandColor: "#7c3aed",
    bgGradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.16) 0%, rgba(76, 29, 149, 0.22) 100%)",
    stars: "",
  },
  "GO URL Shortener": {
    brandColor: "#0284c7",
    bgGradient: "linear-gradient(135deg, rgba(2, 132, 199, 0.16) 0%, rgba(12, 74, 110, 0.22) 100%)",
    stars: "",
  },
};

/* ── Interactive View Toggle Buttons with Motion ── */
function ListToggleButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      title="List view"
      aria-label="List view"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isActive ? "var(--foreground)" : "var(--nav-link)",
        opacity: isActive ? 1 : 0.45,
        transition: "color 0.2s ease, opacity 0.2s ease",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ overflow: "visible" }}
      >
        {/* Top line: slides/contracts in and out */}
        <motion.line
          x1={3}
          y1={6}
          x2={21}
          y2={6}
          animate={
            isHovered
              ? { x1: [3, 8, 3], x2: [21, 14, 21] }
              : { x1: 3, x2: 21 }
          }
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.1,
          }}
        />
        {/* Middle line: slides in and out with stagger */}
        <motion.line
          x1={3}
          y1={12}
          x2={21}
          y2={12}
          animate={
            isHovered
              ? { x1: [3, 1, 3], x2: [21, 17, 21] }
              : { x1: 3, x2: 21 }
          }
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.1,
          }}
        />
        {/* Bottom line: slides in and out with stagger */}
        <motion.line
          x1={3}
          y1={18}
          x2={21}
          y2={18}
          animate={
            isHovered
              ? { x1: [3, 7, 3], x2: [21, 13, 21] }
              : { x1: 3, x2: 21 }
          }
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.1,
          }}
        />
      </svg>
    </motion.button>
  );
}

function CardToggleButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      title="Card view"
      aria-label="Card view"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isActive ? "var(--foreground)" : "var(--nav-link)",
        opacity: isActive ? 1 : 0.45,
        transition: "color 0.2s ease, opacity 0.2s ease",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ overflow: "visible" }}
      >
        {/* Top-left square */}
        <motion.rect
          x={3}
          y={3}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, -1.2, 0], y: [0, -1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
        {/* Top-right square */}
        <motion.rect
          x={13.5}
          y={3}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, 1.2, 0], y: [0, -1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            delay: 0.08,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
        {/* Bottom-left square */}
        <motion.rect
          x={3}
          y={13.5}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, -1.2, 0], y: [0, 1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            delay: 0.16,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
        {/* Bottom-right square */}
        <motion.rect
          x={13.5}
          y={13.5}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, 1.2, 0], y: [0, 1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            delay: 0.24,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
      </svg>
    </motion.button>
  );
}



function CadProjects() {
  const [expandedId, setExpandedId] = useState<string>("PRJ-01");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  const projects = [
    {
      id: "PRJ-01",
      description: "A mock banking and payments platform built from scratch — accounts, balance transfers, and full transaction history with a clean, responsive UI.",
      link: "https://mock-bank.pages.dev/",
      name: "Payment System",
      status: "PRODUCTION",
      tech: ["React", "Node.js", "Express", "PostgreSQL", "Cloudflare"],
    },
    {
      id: "PRJ-02",
      description: "A social network for chefs — profiles, posts, and a recipe-driven feed connecting culinary professionals.",
      link: "https://kairavb.pythonanywhere.com/",
      name: "LinkedIn for Chefs",
      status: "PRODUCTION",
      tech: ["Flask", "Python", "SQLite", "HTML", "CSS"],
    },
    {
      id: "PRJ-03",
      description: "A command-line toolkit for Linux written in Go — fast, single static binary, zero dependencies.",
      link: "https://github.com/kairavb/go-linux",
      name: "GO Linux CLI",
      status: "OPEN_SOURCE",
      tech: ["Go", "CLI", "Linux"],
    },
    {
      id: "PRJ-04",
      description: "A clean, minimal take on the classic snake game — pure JavaScript on the canvas, no frameworks.",
      link: "https://saap.pages.dev",
      name: "Minimalist Snake",
      status: "PRODUCTION",
      tech: ["JavaScript", "Canvas", "HTML", "CSS"],
    },
    {
      id: "PRJ-05",
      description: "A lightweight URL shortener written in Go with fast redirects and basic click analytics.",
      link: "https://github.com/kairavb/URL-Shortner",
      name: "GO URL Shortener",
      status: "OPEN_SOURCE",
      tech: ["Go", "Redis"],
    },
  ];

  return (
    <div
      id="projects"
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        marginTop: "24px",
        position: "relative",
      }}
    >
      <CadDimensionLabel />



      {/* Header Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          fontSize: "11px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "10px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <span style={{ backgroundColor: "#3b82f6", borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
          <span>Projects</span>
        </div>

        <div style={{ alignItems: "center", display: "flex", gap: "14px" }}>
          <span className={clsx('hidden', 'sm:inline')}>
            TOTAL: 0{projects.length}_ACTIVE_NODES
          </span>

          {/* View Mode Toggle (List vs Card) with Motion animations */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ListToggleButton
              isActive={viewMode === "list"}
              onClick={() => setViewMode("list")}
            />
            <CardToggleButton
              isActive={viewMode === "card"}
              onClick={() => setViewMode("card")}
            />
          </div>
        </div>
      </div>

      {/* Projects Display: Animated Transition Between List and Card */}
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div
            key="list-mode"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ display: "grid", gap: "0", gridTemplateColumns: "1fr" }}
          >
            {projects.slice(0, 3).map((prj, index) => {
              const isExpanded = expandedId === prj.id;
              const isLast = index === projects.slice(0, 3).length - 1;

              return (
                <div
                  key={prj.id}
                  style={{
                    backgroundColor: "var(--background)",
                    borderBottom: isLast ? "none" : "1px solid var(--line-stroke)",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--line-fill)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--background)";
                  }}
                >
                  {/* Compact Header Row — always visible */}
                  <div
                    style={{
                      alignItems: "center",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                    }}
                    onClick={() => setExpandedId(isExpanded ? "" : prj.id)}
                  >
                    <div style={{ alignItems: "center", display: "flex", gap: "12px" }}>
                      {/* Project icon */}
                      <ProjectLogo url={prj.link} name={prj.name} size={32} shape="rounded" />

                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--foreground)", fontSize: "14px", fontWeight: 600 }}>{prj.name}</span>
                          <span
                            style={{
                              border: "1px solid var(--line-stroke-accent)",
                              borderRadius: "2px",
                              color: "var(--nav-link)",
                              fontSize: "8px",
                              letterSpacing: "0.08em",
                              padding: "2px 6px",
                            }}
                          >
                            {prj.status}
                          </span>
                        </div>
                        <span style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.05em" }}>{prj.id}</span>
                      </div>
                    </div>

                    <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
                      {/* Live link */}
                      {prj.link && prj.link !== "#" && (
                        <motion.a
                          href={prj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            alignItems: "center",
                            border: "1px dashed var(--line-stroke-accent)",
                            color: "var(--foreground)",
                            display: "flex",
                            fontSize: "10px",
                            gap: "6px",
                            padding: "4px 8px",
                            textDecoration: "none",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--foreground)";
                            e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span>LIVE</span>
                        </motion.a>
                      )}

                      {/* Expand/Collapse chevron with Motion rotation */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{
                          alignItems: "center",
                          border: "1px solid var(--line-stroke-accent)",
                          borderRadius: "4px",
                          color: "var(--foreground)",
                          display: "flex",
                          height: "28px",
                          justifyContent: "center",
                          width: "28px",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable Details with Motion Auto Height */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px 16px" }}>
                          {/* Divider */}
                          <div style={{ borderTop: "1px dashed var(--line-stroke)", marginBottom: "0" }} />

                          {/* Description */}
                          <div style={{ color: "var(--nav-link-hover)", fontSize: "12px", lineHeight: "1.6", maxWidth: "800px" }}>
                            {prj.description}
                          </div>

                          {/* Tech Stack Tags with Motion */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {prj.tech.map((t) => (
                              <motion.span
                                key={t}
                                whileHover={{ scale: 1.06, y: -1 }}
                                transition={{ duration: 0.15 }}
                                style={{
                                  backgroundColor: "var(--background)",
                                  border: "1px solid var(--line-stroke)",
                                  color: "var(--foreground)",
                                  fontSize: "10px",
                                  letterSpacing: "0.05em",
                                  padding: "4px 8px",
                                  cursor: "default",
                                }}
                              >
                                {t}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="card-mode"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "36px",
              padding: "24px 20px",
              backgroundColor: "var(--background)",
            }}
          >
            {projects.slice(0, 3).map((prj, i) => {
              const meta = projectCardMeta[prj.name] || {
                brandColor: "#3b82f6",
                bgGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.2) 100%)",
                stars: "",
              };
              return <CadProjectCardItem key={prj.id} prj={prj} meta={meta} index={i} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show All Projects Button */}
      <div style={{ position: "relative" }}>
        <Link href="/projects" style={{ textDecoration: "none" }}>
          <div
            style={{
              alignItems: "center",
              backgroundColor: "var(--background)",
              borderTop: "1px solid var(--line-stroke)",
              color: "var(--foreground)",
              cursor: "pointer",
              display: "flex",
              fontSize: "11px",
              fontWeight: 600,
              justifyContent: "center",
              letterSpacing: "0.1em",
              padding: "12px 16px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--line-fill)";
              e.currentTarget.style.color = "var(--nav-link-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--background)";
              e.currentTarget.style.color = "var(--foreground)";
            }}
          >
            SHOW_ALL_PROJECTS //
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ── CAD GITHUB CONTRIBUTION MATRIX ── */
function CadGithubChart() {
  const [weeks, setWeeks] = useState<{ count: number; date: string; level: number }[][]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [monthLabels, setMonthLabels] = useState<{ label: string; x: number }[]>([]);
  const [tooltip, setTooltip] = useState<{ count: number; date: string; x: number; y: number } | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch live contribution data from our GraphQL API proxy
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.data?.user?.contributionsCollection?.contributionCalendar) {
          const calendar = payload.data.user.contributionsCollection.contributionCalendar;
          setTotalContributions(calendar.totalContributions);

          const gridWeeks: { count: number; date: string; level: number }[][] = [];
          const months: { label: string; x: number }[] = [];
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          let lastMonth = -1;

          calendar.weeks.forEach((week: any, wIndex: number) => {
            // Initialize a 7-day week (Sunday to Saturday) with empty cells
            const currentW: { count: number; date: string; level: number }[] = Array(7).fill({ count: 0, date: "", level: 0 });

            week.contributionDays.forEach((day: any) => {
              // Parse date as local timezone to avoid off-by-one errors with UTC
              const parts = day.date.split("-");
              const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
              const dayOfWeek = d.getDay();

              // Calculate intensity level based on commit counts (GitHub standard tiers)
              let level = 0;
              if (day.contributionCount === 0) level = 0;
              else if (day.contributionCount <= 3) level = 2;   // 1–3 → medium
              else if (day.contributionCount <= 7) level = 3;   // 4–7 → cross
              else level = 4;                                   // 8+ → dense

              currentW[dayOfWeek] = { count: day.contributionCount, date: day.date, level };

              // Month labels at the first Sunday of a new month
              if (dayOfWeek === 0) {
                const m = d.getMonth();
                if (m !== lastMonth) {
                  months.push({ label: monthNames[m], x: 30 + wIndex * 13 });
                  lastMonth = m;
                }
              }
            });

            gridWeeks.push(currentW);
          });

          setWeeks(gridWeeks);
          setMonthLabels(months);
          setUnavailable(false);
        } else {
          // No data (e.g. GITHUB_TOKEN not configured yet) — hide the chart gracefully.
          setUnavailable(true);
        }
      })
      .catch(() => {
        setUnavailable(true);
      });
  }, []);

  // Hide the whole chart gracefully when live data isn't available
  // (e.g. GITHUB_TOKEN not configured yet) instead of showing an empty grid.
  if (unavailable) return null;

  return (
    <div
      ref={chartRef}
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        marginTop: "16px",
        overflow: "visible",
        position: "relative",
      }}
    >
      <CadDimensionLabel />
      {/* SVG Pencil Hatching Pattern Definitions */}
      <svg style={{ height: 0, position: "absolute", width: 0 }}>
        <defs>
          {/* Level 1: Light Diagonal Lines /// */}
          <pattern id="cad-hatch-1" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--foreground)" strokeWidth="1" opacity="0.6" />
          </pattern>

          {/* Level 2: Dense Diagonal Lines /// */}
          <pattern id="cad-hatch-2" width="2.5" height="2.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="2.5" stroke="var(--foreground)" strokeWidth="1.3" opacity="0.95" />
          </pattern>

          {/* Level 3: Cross Hatching XXX */}
          <pattern id="cad-hatch-3" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="3.5" y2="3.5" stroke="var(--foreground)" strokeWidth="1.1" opacity="0.9" />
            <line x1="3.5" y1="0" x2="0" y2="3.5" stroke="var(--foreground)" strokeWidth="1.1" opacity="0.9" />
          </pattern>

          {/* Level 4: Heavy Solid Hatch Fill █ */}
          <pattern id="cad-hatch-4" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="2.5" y2="2.5" stroke="var(--foreground)" strokeWidth="1.3" opacity="1" />
            <line x1="2.5" y1="0" x2="0" y2="2.5" stroke="var(--foreground)" strokeWidth="1.3" opacity="1" />
            <line x1="0" y1="1.25" x2="2.5" y2="1.25" stroke="var(--foreground)" strokeWidth="1" opacity="1" />
          </pattern>
        </defs>
      </svg>



      {/* Header Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          fontSize: "10px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "8px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <span style={{ backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
          <span>GitHub Activity</span>
        </div>
        <span>USER: @kairavb</span>
      </div>

      {/* Main Vector SVG Grid Container */}
      <div className="scrollbar-hide" style={{ overflowX: "auto", padding: "16px 14px" }}>
        <div style={{ minWidth: "700px" }}>
          <svg width="100%" height="130" viewBox={`0 0 ${30 + weeks.length * 13} 130`} style={{ overflow: "visible" }}>
            {/* Dynamic Month Labels */}
            {monthLabels.map((m, i) => (
              <text
                key={`${m.label}-${i}`}
                x={m.x}
                y="14"
                fill="var(--foreground)"
                fontSize="10"
                fontFamily="var(--font-geist-mono)"
                opacity="0.8"
              >
                {m.label}
              </text>
            ))}

            {/* Day Labels */}
            <text x="0" y="38" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-geist-mono)" opacity="0.7">Mon</text>
            <text x="0" y="64" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-geist-mono)" opacity="0.7">Wed</text>
            <text x="0" y="90" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-geist-mono)" opacity="0.7">Fri</text>

            {/* 53 Weeks x 7 Days Tiles Grid (Sunday=row0, Saturday=row6) */}
            <g transform="translate(30, 24)">
              {weeks.map((week, wIndex) => (
                <g key={wIndex} transform={`translate(${wIndex * 13}, 0)`}>
                  {week.map((day, dIndex) => {
                    let fillStyle = "none";
                    if (day.level === 1) fillStyle = "url(#cad-hatch-1)";
                    else if (day.level === 2) fillStyle = "url(#cad-hatch-2)";
                    else if (day.level === 3) fillStyle = "url(#cad-hatch-3)";
                    else if (day.level === 4) fillStyle = "url(#cad-hatch-4)";

                    return (
                      <rect
                        key={dIndex}
                        x="0"
                        y={dIndex * 13}
                        width="10"
                        height="10"
                        rx="1"
                        fill={fillStyle}
                        stroke="var(--line-stroke-accent)"
                        strokeWidth="1"
                        style={{ cursor: day.date ? "pointer" : "default" }}
                        onMouseEnter={(e) => {
                          if (!day.date || !chartRef.current) return;
                          const svgRect = chartRef.current.getBoundingClientRect();
                          const cellRect = (e.target as SVGRectElement).getBoundingClientRect();
                          setTooltip({
                            count: day.count,
                            date: day.date,
                            x: cellRect.left - svgRect.left + cellRect.width / 2,
                            y: cellRect.top - svgRect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* CAD Legend & Metadata Bar */}
        <div
          style={{
            alignItems: "center",
            borderTop: "1px dashed var(--line-stroke)",
            color: "var(--nav-link-hover)",
            display: "flex",
            fontSize: "9px",
            justifyContent: "space-between",
            letterSpacing: "0.05em",
            paddingTop: "8px",
          }}
        >
          <span>{totalContributions !== null ? `${totalContributions} contributions in the last year` : "Contributions in the last year"}</span>
        </div>

        {/* CAD Hatching Symbol Legend & Spec Callouts */}
        <div
          style={{
            borderTop: "1px dashed var(--line-stroke)",
            display: "grid",
            gap: "8px",
            gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
            marginTop: "10px",
            paddingTop: "10px",
          }}
        >
          {/* No activity */}
          <div style={{ alignItems: "center", backgroundColor: "var(--background)", border: "1px solid var(--line-stroke)", borderRadius: "3px", display: "flex", gap: "8px", padding: "6px 8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="none" stroke="var(--foreground)" strokeWidth="1" opacity="0.4" />
            </svg>
            <span style={{ color: "var(--foreground)", fontSize: "10px", fontWeight: 600 }}>No activity</span>
          </div>

          {/* 1–3 commits */}
          <div style={{ alignItems: "center", backgroundColor: "var(--background)", border: "1px solid var(--line-stroke)", borderRadius: "3px", display: "flex", gap: "8px", padding: "6px 8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="url(#cad-hatch-2)" stroke="var(--foreground)" strokeWidth="1" />
            </svg>
            <span style={{ color: "var(--foreground)", fontSize: "10px", fontWeight: 600 }}>1–3 commits</span>
          </div>

          {/* 4–7 commits */}
          <div style={{ alignItems: "center", backgroundColor: "var(--background)", border: "1px solid var(--line-stroke)", borderRadius: "3px", display: "flex", gap: "8px", padding: "6px 8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="url(#cad-hatch-3)" stroke="var(--foreground)" strokeWidth="1" />
            </svg>
            <span style={{ color: "var(--foreground)", fontSize: "10px", fontWeight: 600 }}>4–7 commits</span>
          </div>

          {/* 8+ commits */}
          <div style={{ alignItems: "center", backgroundColor: "var(--background)", border: "1px solid var(--line-stroke)", borderRadius: "3px", display: "flex", gap: "8px", padding: "6px 8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="url(#cad-hatch-4)" stroke="var(--foreground)" strokeWidth="1" opacity="0.9" />
            </svg>
            <span style={{ color: "var(--foreground)", fontSize: "10px", fontWeight: 600 }}>8+ commits</span>
          </div>
        </div>
      </div>

      {/* Custom Tooltip — rendered outside scroll container to avoid clipping */}
      {tooltip && (
        <div
          style={{
            alignItems: "center",
            backgroundColor: "var(--foreground)",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            color: "var(--background)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "11px",
            gap: "2px",
            left: tooltip.x,
            letterSpacing: "0.03em",
            padding: "6px 10px",
            pointerEvents: "none",
            position: "absolute",
            top: tooltip.y - 6,
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
            zIndex: 50,
          }}
        >
          <span style={{ fontWeight: 700 }}>
            {tooltip.count} {tooltip.count === 1 ? "contribution" : "contributions"}
          </span>
          <span style={{ fontSize: "9px", opacity: 0.7 }}>
            {(() => {
              const parts = tooltip.date.split("-");
              const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
              return d.toLocaleDateString("en-US", { day: "numeric", month: "short", weekday: "short", year: "numeric" });
            })()}
          </span>
          {/* Tooltip Arrow */}
          <div
            style={{
              backgroundColor: "var(--foreground)",
              bottom: "-4px",
              height: "8px",
              left: "50%",
              position: "absolute",
              transform: "translateX(-50%) rotate(45deg)",
              width: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ── CAD ABOUT ME SECTION ── */
function CadAboutMe() {
  const [greeting, setGreeting] = useState("Good Evening");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const aboutParts = [
    {
      id: "ABT-01",
      label: "WHO_I_AM",
      text: "I'm Kairav — a software engineer who loves creating beautiful, functional software. I care about maintainable, efficient code and turning ideas into experiences that feel effortless.",
    },
    {
      id: "ABT-02",
      label: "WHAT_I_DO",
      text: "I build full-stack web apps with React and TypeScript, fast back-ends in Go and Node, and the DevOps that ships them — Linux servers, Nginx, Docker, and hosting end to end.",
    },
    {
      id: "ABT-03",
      label: "BEYOND_CODE",
      text: "When I'm not shipping code, you'll find me on the football pitch, reading about space, or tinkering with computers and the latest tech. Always learning, always building.",
    },
  ];

  return (
    <div
      id="about"
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        marginTop: "16px",
        position: "relative",
      }}
    >
      <CadDimensionLabel />


      {/* Header Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          fontSize: "10px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "8px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <span style={{ backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
          <span>About</span>
        </div>
      </div>

      {/* Greeting Heading */}
      <div
        style={{
          borderBottom: "1px dashed var(--line-stroke)",
          padding: "20px 14px 8px",
        }}
      >
        <div
          style={{
            color: "var(--foreground)",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: "1.3",
          }}
        >
          {greeting}, I&apos;m Kairav{" "}
          <span style={{ animation: "wave 2.5s infinite", display: "inline-block", fontSize: "22px", transformOrigin: "70% 70%" }}>👋</span>
        </div>
        <div
          style={{
            color: "var(--nav-link-hover)",
            fontSize: "11px",
            letterSpacing: "0.02em",
            marginTop: "4px",
          }}
        >
          Software Engineer · Full-Stack Developer · DevOps
        </div>
      </div>

      {/* 3-Part About Grid */}
      <div
        style={{
          display: "grid",
          gap: "0px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {aboutParts.map((part, index) => (
          <div
            key={part.id}
            style={{
              borderBottom: "1px solid var(--line-stroke)",
              borderRight: index < aboutParts.length - 1 ? "1px solid var(--line-stroke)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "14px",
            }}
          >
            {/* Section Label */}
            <div
              style={{
                alignItems: "center",
                color: "var(--nav-link)",
                display: "flex",
                fontSize: "9px",
                gap: "8px",
                letterSpacing: "0.1em",
              }}
            >
              <span
                style={{
                  border: "1.5px solid var(--foreground)",
                  display: "inline-block",
                  height: "8px",
                  opacity: 0.6,
                  width: "8px",
                }}
              />
              <span>0{index + 1} // {part.label}</span>
            </div>

            {/* Section Text */}
            <div
              style={{
                color: "var(--nav-link-hover)",
                fontSize: "12px",
                lineHeight: "1.7",
              }}
            >
              {part.text}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function Page() {
  return (
    <main style={{ display: "contents" }}>

      {/* ── HERO SECTION ──
          Placed in gridRow: 1 (above the top horizontal band).
          Padding top is 60px to clear the fixed navbar.
      */}
      <section
        className={clsx("relative", "flex", "flex-col")}
        style={{
          borderBottom: "1px solid var(--line-stroke)",
          gridColumn: "2",
          gridRow: "1",
          minWidth: 0,
          paddingTop: "60px",
        }}
      >
        {/* Hero image — flush to left and right edges of the content column */}
        <div
          style={{
            height: "260px",
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          <Image
            src="/hero-art.jpg"
            alt="Hero artwork"
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle gradient fade at the bottom */}
          <div
            style={{
              background:
                "linear-gradient(to bottom, transparent 60%, var(--background) 100%)",
              inset: 0,
              position: "absolute",
            }}
          />
        </div>

        {/* Profile Image Placeholder */}
        <div
          style={{
            alignItems: "center",
            backgroundColor: "var(--background)",
            border: "1px dashed var(--line-stroke-accent)",
            borderRadius: "50%",
            bottom: "0",
            display: "flex",
            height: "120px",
            justifyContent: "center",
            left: "10px",
            position: "absolute",
            transform: "translateY(50%)",
            width: "120px",
            zIndex: 10,
          }}
        >
          {/* CAD-style rotating role label */}
          <div
            className={clsx('hidden', '2xl:block')}
            style={{
              height: "90px",
              left: "-240px",
              pointerEvents: "none",
              position: "absolute",
              top: "-55px",
              width: "260px",
              zIndex: 20,
            }}
          >
            <style>{`
              @keyframes cad-ticker {
                0%, 22% { transform: translateY(0); }
                33%, 55% { transform: translateY(-28px); }
                66%, 88% { transform: translateY(-56px); }
                100% { transform: translateY(-84px); }
              }
            `}</style>
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <circle cx="258" cy="73" r="2" fill="var(--line-stroke-accent)" />
              <path
                d="M 258,73 L 225,40 L 0,40"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
            </svg>
            <div
              style={{
                color: "var(--foreground)",
                height: "28px",
                left: "0px",
                overflow: "hidden",
                position: "absolute",
                top: "10px",
                whiteSpace: "nowrap",
                width: "220px",
              }}
            >
              <div
                className={caveat.className}
                style={{
                  animation: "cad-ticker 8s infinite cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ alignItems: "center", display: "flex", fontSize: "24px", height: "28px" }}>Software Engineer</div>
                <div style={{ alignItems: "center", display: "flex", fontSize: "24px", height: "28px" }}>Full-Stack Developer</div>
                <div style={{ alignItems: "center", display: "flex", fontSize: "24px", height: "28px" }}>Clean code matters</div>
                <div style={{ alignItems: "center", display: "flex", fontSize: "24px", height: "28px" }}>Software Engineer</div>
              </div>
            </div>
          </div>


          {/* CAD-style label with handwritten name */}
          <div
            className={clsx('hidden', 'md:block')}
            style={{
              height: "80px",
              left: "105px",
              pointerEvents: "none",
              position: "absolute",
              top: "0px",
              width: "270px",
              zIndex: 20,
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <path
                d="M 0,60 L 30,30 L 270,30"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
              <circle cx="0" cy="60" r="2" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              className={caveat.className}
              style={{
                bottom: "52px",
                color: "var(--foreground)",
                fontSize: "32px",
                left: "35px",
                lineHeight: "1",
                position: "absolute",
                whiteSpace: "nowrap",
              }}
            >
              Kairav Bhatia
            </span>
          </div>

          {/* CAD-style label for Age */}
          <div
            className={clsx('hidden', 'md:block')}
            style={{
              bottom: "-25px",
              height: "70px",
              left: "-140px",
              pointerEvents: "none",
              position: "absolute",
              width: "150px",
              zIndex: 20,
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <path
                d="M 140,15 L 85,55 L 0,55"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
              <circle cx="140" cy="15" r="2" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              className={caveat.className}
              style={{
                bottom: "18px",
                color: "var(--foreground)",
                fontSize: "28px",
                left: "8px",
                lineHeight: "1",
                position: "absolute",
                whiteSpace: "nowrap",
              }}
            >
              23
            </span>
          </div>

          {/* Inner solid border to make it look like a technical target */}
          <div
            className={clsx("relative", "overflow-hidden")}
            style={{
              border: "1px solid var(--line-stroke)",
              borderRadius: "50%",
              height: "104px",
              width: "104px",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Hero artwork"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
              priority
              fetchPriority="high"
              sizes="104px"
            />

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──
          Placed in gridRow: 5 (below the top horizontal band).
      */}
      <div className={clsx('px-4', 'md:px-5')} style={{ gridColumn: "2", gridRow: "5", minWidth: 0 }}>
        {/* CAD SPECIFICATION TITLE BLOCK (Placed under the profile picture) */}
        <section style={{ paddingBottom: "40px", paddingTop: "75px" }}>
          <div
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke-accent)",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "12px",
              position: "relative",
            }}
          >
            <CadDimensionLabel />


            {/* Header Bar */}
            <div
              style={{
                alignItems: "center",
                backgroundColor: "var(--line-fill-accent)",
                borderBottom: "1px solid var(--line-stroke-accent)",
                color: "var(--nav-link-hover)",
                display: "flex",
                fontSize: "10px",
                justifyContent: "space-between",
                letterSpacing: "0.1em",
                padding: "8px 14px",
              }}
            >
              <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
                <span style={{ backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
                <span>Profile</span>
              </div>
            </div>

            {/* Grid Table of Data Fields */}
            <div
              style={{
                display: "grid",
                gap: "0px",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {/* Item 1: Role */}
              <div
                style={{
                  borderBottom: "1px solid var(--line-stroke)",
                  borderRight: "1px solid var(--line-stroke)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  01 // DESIGNATION
                </div>
                <div style={{ alignItems: "center", color: "var(--foreground)", display: "flex", fontWeight: 500, gap: "8px" }}>
                  <BriefcaseIcon />
                  <span>Building Systems</span>
                </div>
              </div>

              {/* Item 2: Location */}
              <div
                style={{
                  borderBottom: "1px solid var(--line-stroke)",
                  borderRight: "1px solid var(--line-stroke)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  02 // LOCATION
                </div>
                <div style={{ alignItems: "center", color: "var(--foreground)", display: "flex", fontWeight: 500, gap: "8px" }}>
                  <MapPinIcon />
                  <span>New Delhi, India </span>
                  <Image
                    src="/india.png"
                    alt="India flag"
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              {/* Item 3: Current Location Time & Comparison */}
              <div
                style={{
                  borderBottom: "1px solid var(--line-stroke)",
                  borderRight: "1px solid var(--line-stroke)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  03 // LOCATION TIME (LIVE SYNC)
                </div>
                <div style={{ alignItems: "flex-start", color: "var(--foreground)", display: "flex", gap: "8px" }}>
                  <ClockIcon style={{ marginTop: "2px" }} />
                  <CadTimeTracker />
                </div>
              </div>

              {/* Item 4: Pronouns */}
              <div
                style={{
                  borderBottom: "1px solid var(--line-stroke)",
                  borderRight: "1px solid var(--line-stroke)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  04 // PRONOUNS
                </div>
                <div style={{ alignItems: "center", color: "var(--foreground)", display: "flex", fontWeight: 500, gap: "8px" }}>
                  <UserBadgeIcon />
                  <span>he / him</span>
                </div>
              </div>

              {/* Item 5: Email */}
              <div
                style={{
                  borderBottom: "1px solid var(--line-stroke)",
                  borderRight: "1px solid var(--line-stroke)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  05 // EMAIL_COMM
                </div>
                <a
                  href="mailto:kairavbhatia8@gmail.com"
                  style={{
                    alignItems: "center",
                    color: "var(--foreground)",
                    display: "flex",
                    fontWeight: 500,
                    gap: "8px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-link-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                >
                  <MailIcon />
                  <span>kairavbhatia8@gmail.com</span>
                </a>
              </div>

              {/* Item 6: Website */}
              <div
                style={{
                  borderBottom: "1px solid var(--line-stroke)",
                  borderRight: "1px solid var(--line-stroke)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>
                  06 // WEB_DOMAIN
                </div>
                <a
                  href="https://kairav.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    alignItems: "center",
                    color: "var(--foreground)",
                    display: "flex",
                    fontWeight: 500,
                    gap: "8px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-link-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                >
                  <GlobeIcon />
                  <span>kairav.dev</span>
                </a>
              </div>
            </div>
          </div>

          {/* CAD SOCIAL LINKS BAR (Single Horizontal Line) */}
          <div
            style={{
              alignItems: "center",
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke-accent)",
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "11px",
              gap: "12px",
              justifyContent: "space-between",
              marginTop: "16px",
              padding: "10px 14px",
              position: "relative",
            }}
          >
            <CadDimensionLabel />
            {/* Left Label */}
            <div style={{ alignItems: "center", color: "var(--nav-link)", display: "flex", fontSize: "10px", gap: "8px", letterSpacing: "0.08em" }}>
              <span>Connect</span>
            </div>

            {/* Single Line Social Buttons */}
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {/* X */}
              <a
                href="https://x.com/iamkairav"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <XIcon />
                <span>X</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/kairavb"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <GithubSocialIcon />
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/kairavb"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>

              {/* daily.dev */}
              <a
                href="https://leetcode.com/u/kairavb/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.48 0a1.37 1.37 0 0 0-.98.42L7.6 5.52l-3.9 4a4.4 4.4 0 0 0-1.25 3.03 4.4 4.4 0 0 0 1.25 3.03l3.9 4.06a5.3 5.3 0 0 0 3.86 1.6 5.3 5.3 0 0 0 3.86-1.6l2.3-2.37a1.37 1.37 0 0 0-1.97-1.9l-2.3 2.37a2.57 2.57 0 0 1-1.89.76 2.57 2.57 0 0 1-1.88-.76l-3.9-4.06a1.65 1.65 0 0 1-.48-1.13c0-.43.17-.83.48-1.12l3.9-4.01 4.9-5.1a1.37 1.37 0 0 0-.98-2.33Zm1.36 7.65a1.37 1.37 0 0 0 0 2.74h6.8a1.37 1.37 0 0 0 0-2.74h-6.8Z"/></svg>
                <span>LeetCode</span>
              </a>

              {/* Discord */}
              <a
                href="https://www.instagram.com/iamkairav/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.95c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.41-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.17.42-.36 1.04-.41 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.41 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.17 1.04.36 2.19.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.41.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.17-.42.36-1.04.41-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.41-2.19a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.42-.17-1.04-.36-2.19-.41-1.24-.06-1.61-.07-4.76-.07Zm0 3.32a4.57 4.57 0 1 1 0 9.14 4.57 4.57 0 0 1 0-9.14Zm0 7.54a2.97 2.97 0 1 0 0-5.94 2.97 2.97 0 0 0 0 5.94Zm5.82-7.76a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0Z"/></svg>
                <span>Instagram</span>
              </a>

              {/* Medium */}
              <a
                href="https://codeforces.com/profile/kairav/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5h3Zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3Zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h3Z"/></svg>
                <span>CodeForces</span>
              </a>

              {/* takeUforward */}
              <a
                href="https://takeuforward.org/profile/kairav"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3zM5 13.18v3.5l7 3.82 7-3.82v-3.5l-7 3.82-7-3.82z"/></svg>
                <span>takeUforward</span>
              </a>

              {/* Blog (Medium) */}
              <a
                href="https://medium.com/@kairavb"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "4px",
                  color: "var(--foreground)",
                  display: "flex",
                  fontSize: "11px",
                  gap: "6px",
                  padding: "5px 10px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                <span>Blog</span>
              </a>
            </div>
          </div>
          {/* CAD GITHUB CONTRIBUTION CHART */}
          <CadGithubChart />

          {/* LEETCODE + CODEFORCES STATS */}
          <CodingStats />

          {/* CAD ABOUT ME SECTION */}
          <CadAboutMe />

          {/* CAD TECH STACK SPECIFICATION MATRIX */}
          <CadTechStack />

          {/* CAD EXPERIENCE TIMELINE */}
          <CadExperience />

          {/* CAD EDUCATION TIMELINE */}
          <CadEducation />

          {/* CAD PROJECTS SCHEMA */}
          <CadProjects />

          {/* INSPIRED BY — single line credit */}
          <div
            style={{
              alignItems: "center",
              color: "var(--nav-link)",
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "11px",
              gap: "6px",
              justifyContent: "center",
              letterSpacing: "0.03em",
              lineHeight: "1.6",
              marginTop: "24px",
              textAlign: "center",
            }}
          >
            <span>Designed with ♥ · CAD concept by</span>
            <a
              href="https://parminder.pro"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--foreground)", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
            >
              Parminder Singh
            </a>
          </div>

          {/* CAD Title Block for Mobile (Hidden on Desktop) */}
          <div className={clsx('flex', '2xl:hidden', 'mt-12', 'mb-8', 'justify-center')}>
            <TitleBlock className="relative" />
          </div>
        </section>
      </div>

    </main>
  );
}