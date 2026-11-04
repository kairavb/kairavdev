"use client";

import React from "react";
import Link from "next/link";

/* ── Shared CAD card chrome ── */
function CadCard({
  dotColor,
  title,
  meta,
  children,
}: {
  dotColor: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        position: "relative",
      }}
    >
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
          <span style={{ backgroundColor: dotColor, borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
          <span>{title}</span>
        </div>
        <span>{meta}</span>
      </div>
      {children}
    </div>
  );
}

function CadCommunity() {
  const items = [
    { id: "ORG-01", role: "Founder", org: "Pipebit.dev", url: "https://pipebit.dev", tag: "STARTUP", note: "Delivering custom software and workflow solutions for startups and growing businesses." },
    { id: "ORG-02", role: "Co-Founder", org: "Devnovate.co", url: "https://devnovate.co", tag: "STARTUP", note: "A developer platform for hackathons, projects, networking, and career opportunities." },
    { id: "ORG-03", role: "Co-Founder", org: "Snyco.ai", url: "https://snyco.ai", tag: "STARTUP", note: "Building AI-powered workflow automation and productivity solutions for the public." },
    { id: "ORG-04", role: "Community Partner", org: "HackWithIndia", url: "", tag: "COMMUNITY", note: "Supporting hackathon operations and community engagement." },
    { id: "ORG-05", role: "Mentor", org: "National & International Hackathons", url: "", tag: "MENTORSHIP", note: "Mentored 100+ teams on software development and technical problem-solving." },
  ];

  return (
    <CadCard dotColor="#ec4899" title="Startups & Community" meta={`TOTAL: 0${items.length}_VENTURES`}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((it, index) => (
          <div
            key={it.id}
            style={{
              backgroundColor: "var(--background)",
              borderBottom: index === items.length - 1 ? "none" : "1px solid var(--line-stroke)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "16px 20px",
            }}
          >
            <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {it.url ? (
                <a
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--foreground)", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nav-link-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                >
                  {it.org}
                </a>
              ) : (
                <span style={{ color: "var(--foreground)", fontSize: "15px", fontWeight: 700 }}>{it.org}</span>
              )}
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
                {it.tag}
              </span>
            </div>
            <span style={{ color: "var(--nav-link-hover)", fontSize: "11px", fontWeight: 500 }}>{it.role}</span>
            <span style={{ color: "var(--nav-link-hover)", fontSize: "13px", lineHeight: "1.6" }}>{it.note}</span>
          </div>
        ))}
      </div>
    </CadCard>
  );
}

function CadAchievements() {
  const achievements = [
    "Published research paper — “Temporal Image-Based Pseudo-Random Bit Generator: Harnessing Time Seeds and Input Images”, a nature-dependent random number generating algorithm.",
    "Ranked 3,228th in the ICPC 2026 Online Challenge 1, powered by Huawei.",
    "Solved 800+ algorithmic problems across LeetCode, Codeforces, and TakeUForward over 50+ contests (LeetCode max 1675, Codeforces max 1081).",
    "1st place — Web Technologies quiz competition at VIPS-TC, Pitampura.",
    "1st place — Debugging competition at Amity University, Noida.",
    "Reached the highest competitive league on Chess.com.",
  ];

  return (
    <CadCard dotColor="#eab308" title="Achievements" meta={`TOTAL: 0${achievements.length}_RECORDS`}>
      <ul style={{ backgroundColor: "var(--background)", display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", margin: 0, padding: "20px" }}>
        {achievements.map((a, i) => (
          <li key={i} style={{ color: "var(--nav-link-hover)", display: "flex", fontSize: "13px", gap: "12px", lineHeight: "1.6" }}>
            <span style={{ color: "var(--line-stroke-accent)", fontSize: "10px", marginTop: "2px" }}>▪</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </CadCard>
  );
}

function CadCertifications() {
  const certs = [
    "Harvard CS50x — Introduction to Computer Science (10 problem sets + final project)",
    "TakeUForward DSA Course & A2Z Sheet",
  ];

  return (
    <CadCard dotColor="#8b5cf6" title="Certifications" meta={`TOTAL: 0${certs.length}_CERTS`}>
      <div style={{ backgroundColor: "var(--background)", display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>
        {certs.map((c) => (
          <div
            key={c}
            style={{
              alignItems: "center",
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke-accent)",
              borderRadius: "4px",
              color: "var(--foreground)",
              display: "flex",
              fontSize: "13px",
              gap: "10px",
              padding: "12px 14px",
            }}
          >
            <span style={{ fontSize: "14px" }}>🎓</span>
            <span>{c}</span>
          </div>
        ))}
      </div>
    </CadCard>
  );
}

function CadOpenSource() {
  const items = [
    { label: "RocketRideServer", url: "https://github.com/kairavb/rocketride-server", note: "Contributed to the RocketRideServer repository — fixing documentation and multiple UI issues." },
    { label: "Linux Daily Driver", url: "", note: "Running Linux as a daily driver since 2021 for development, experimentation, and community contribution." },
    { label: "GitHub & Stack Overflow", url: "https://github.com/kairavb", note: "Maintaining active GitHub and Stack Overflow profiles since 2018 and 2019 respectively." },
  ];

  return (
    <CadCard dotColor="#22c55e" title="Open Source" meta={`TOTAL: 0${items.length}_NODES`}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((it, index) => (
          <div
            key={it.label}
            style={{
              backgroundColor: "var(--background)",
              borderBottom: index === items.length - 1 ? "none" : "1px solid var(--line-stroke)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "16px 20px",
            }}
          >
            {it.url ? (
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--foreground)", fontSize: "14px", fontWeight: 700, textDecoration: "none", width: "fit-content" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nav-link-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              >
                {it.label}
              </a>
            ) : (
              <span style={{ color: "var(--foreground)", fontSize: "14px", fontWeight: 700 }}>{it.label}</span>
            )}
            <span style={{ color: "var(--nav-link-hover)", fontSize: "13px", lineHeight: "1.6" }}>{it.note}</span>
          </div>
        ))}
      </div>
    </CadCard>
  );
}

export default function OtherPage() {
  return (
    <main
      style={{
        gridColumn: "2",
        gridRow: "5",
        padding: "80px 24px 60px",
        fontFamily: "var(--font-geist-mono)",
        minWidth: 0,
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: "32px" }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: "10px",
            color: "var(--nav-link)",
            letterSpacing: "0.08em",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Link
            href="/"
            style={{ color: "var(--nav-link)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nav-link-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nav-link)")}
          >
            HOME
          </Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--foreground)" }}>OTHER</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.1em", marginBottom: "6px" }}>
              SECTION_04 // BEYOND_THE_BUILD
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--foreground)",
                margin: 0,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Startups, Achievements & More
            </h1>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <CadCommunity />
        <CadAchievements />
        <CadCertifications />
        <CadOpenSource />
      </div>

      {/* Back to Home Link */}
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--nav-link)",
            textDecoration: "none",
            padding: "8px 16px",
            border: "1px solid var(--line-stroke-accent)",
            borderRadius: "3px",
            transition: "all 0.2s",
            fontFamily: "var(--font-geist-mono)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--foreground)";
            e.currentTarget.style.borderColor = "var(--foreground)";
            e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--nav-link)";
            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          ← BACK_TO_HOME
        </Link>
      </div>
    </main>
  );
}
