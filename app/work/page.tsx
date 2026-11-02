
"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { techLogos, getTechLogo } from "../data/techLogos";
import { ProjectLogo } from "../components/ProjectLogo";

function HoverTechTag({ techName, baseStyle }: { techName: string; baseStyle: React.CSSProperties }) {
  const [isHovered, setIsHovered] = useState(false);
  const logo = getTechLogo(techName) || techLogos[techName];

  const height = baseStyle.height || "32px";
  const minWidth = baseStyle.minWidth || "32px";

  const smoothEase = [0.16, 1, 0.3, 1] as const; // Smooth ease-out curve

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        borderColor: isHovered ? "var(--foreground)" : (baseStyle.borderColor as string || "var(--line-stroke-accent)"),
        backgroundColor: isHovered ? "var(--line-fill-accent)" : (baseStyle.backgroundColor as string || "transparent"),
      }}
      transition={{
        duration: 0.3,
        ease: smoothEase,
        layout: { duration: 0.3, ease: smoothEase },
      }}
      style={{
        ...baseStyle,
        height,
        minWidth,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        whiteSpace: "nowrap",
        userSelect: "none",
        position: "relative",
        padding: baseStyle.padding || "10px 10px",
      }}
    >
      {/* Icon on Left with Shadow on the right side when text is coming out */}
      {logo ? (
        <motion.span
          layout
          animate={{
            filter: isHovered
              ? "drop-shadow(3px 0px 4px rgba(0,0,0,0.5))"
              : "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
          }}
          transition={{ duration: 0.25, ease: smoothEase }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            zIndex: 2,
            position: "relative",
          }}
        >
          {logo}
        </motion.span>
      ) : null}

      {/* Tech Name on Right - Instant Text View with Smooth Width Expansion */}
      <AnimatePresence initial={false}>
        {(isHovered || !logo) && (
          <motion.span
            initial={{ opacity: 1, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: logo ? 6 : 0 }}
            exit={{ opacity: 1, width: 0, marginLeft: 0 }}
            transition={{
              duration: 0.3,
              ease: smoothEase,
            }}
            style={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontSize: baseStyle.fontSize || "11px",
              fontWeight: baseStyle.fontWeight || 500,
              color: baseStyle.color || "var(--foreground)",
              letterSpacing: baseStyle.letterSpacing || "normal",
              zIndex: 1,
            }}
          >
            {techName}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WorkPage() {
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
          <span style={{ color: "var(--foreground)" }}>WORK</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.1em", marginBottom: "6px" }}>
              SECTION_02 // PROFESSIONAL_PORTFOLIO
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
              Work Experience
            </h1>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <CadExperience />
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

function CadExperience() {

  const experiences = [
    {
      id: "EXP-01",
      role: "Freelance Web & DevOps Developer",
      company: "Freelancing",
      period: "2024 — Present",
      location: "Remote",
      status: "ACTIVE",
      description: [
        "Building full-stack web applications for clients using React, Node.js, and Go.",
        "Provisioning and managing Linux servers end to end — Nginx, Docker, hosting, and domains.",
        "Handling deployments, process management, and security hardening for client projects."
      ],
      tech: ["React", "Node.js", "Express", "Go", "Linux", "Nginx", "Docker", "Hosting"],
    },
    {
      id: "EXP-02",
      role: "DevOps Engineer · Internship",
      company: "Devnovate",
      period: "May 2025 — Aug 2025",
      location: "Remote",
      status: "COMPLETED",
      description: [
        "Managed hosting and deployment infrastructure on Linux VPS instances.",
        "Set up process management with PM2 and reverse proxying with Nginx.",
        "Hardened servers with UFW firewall rules and automated routine tasks with Bash."
      ],
      tech: ["Linux VPS", "PM2", "Bash", "Nginx", "UFW"],
    },
    {
      id: "EXP-03",
      role: "Server Setup · Freelance",
      company: "Trid India",
      period: "Aug 2025",
      location: "Remote",
      status: "COMPLETED",
      description: [
        "Set up and configured the client's web server on a Linux VPS.",
        "Deployed and managed the WordPress stack using HestiaCP.",
        "Configured Nginx and handled DNS, SSL, and ongoing hosting."
      ],
      tech: ["Linux VPS", "HestiaCP", "WordPress", "Nginx"],
    },
    {
      id: "EXP-04",
      role: "Full-Stack Developer · Freelance",
      company: "Cheap Printouts",
      period: "Jan 2025",
      location: "Remote",
      status: "COMPLETED",
      description: [
        "Built the storefront and ordering flow for a printing service.",
        "Developed the React front-end and a Node/Express back-end.",
        "Handled the hosting and deployment setup end to end."
      ],
      tech: ["React", "Node.js", "Express", "Hosting"],
    },
  ];

  return (
    <div
      id="experience"
      style={{
        marginTop: "24px",
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--line-fill)",
        position: "relative",
        fontSize: "12px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >



      {/* Header Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--line-stroke-accent)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--line-fill-accent)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--nav-link-hover)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", backgroundColor: "#f59e0b", borderRadius: "50%", display: "inline-block" }} />
          <span>Experience</span>
        </div>
        <span>TOTAL: 0{experiences.length}_NODES</span>
      </div>

      {/* Experience Entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "24px 20px" }}>
        {experiences.map((exp, index) => {
          const statusColor = exp.status === "ACTIVE" ? "#22c55e" : "var(--nav-link)";
          const isLast = index === experiences.length - 1;

          return (
            <div
              key={exp.id}
              style={{
                borderBottom: isLast ? "none" : "1px dashed var(--line-stroke)",
                paddingBottom: isLast ? "0" : "12px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Top Row: Company, Role, Date, Location */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                {/* Left Side */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>{exp.company}</span>
                    {exp.status === "ACTIVE" ?
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "3px 10px",
                          border: `1px solid ${statusColor}`,
                          borderStyle: "dotted",
                          borderRadius: "5px",
                          fontSize: "11px",
                          color: statusColor,
                          backgroundColor: "var(--line-fill-accent)",
                          letterSpacing: "0.05em",
                          fontWeight: 500,
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: statusColor }} />
                        Working
                      </span> : null}
                  </div>
                  <span style={{ fontSize: "14px", color: "var(--nav-link-hover)" }}>{exp.role}</span>
                </div>

                {/* Right Side */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{ fontSize: "14px", color: "var(--nav-link-hover)" }}>{exp.period}</span>
                  <span style={{ fontSize: "13px", color: "var(--nav-link)" }}>{exp.location}</span>
                </div>
              </div>

              {/* Technologies & Tools */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Technologies & Tools</span>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {exp.tech.map((t) => (
                    <HoverTechTag
                      key={t}
                      techName={t}
                      baseStyle={{
                        padding: "12px 12px",
                        backgroundColor: "var(--line-fill-accent)",
                        border: "1px dashed var(--line-stroke-accent)",
                        color: "var(--foreground)",
                        fontSize: "12px",
                        borderRadius: "6px",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* What I've done */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>What I've done</span>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc, i) => (
                    <li key={i} style={{ display: "flex", gap: "12px", color: "var(--nav-link-hover)", fontSize: "13px", lineHeight: "1.6" }}>
                      <span style={{ color: "var(--line-stroke-accent)", marginTop: "1px", fontSize: "10px" }}>▪</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CadProjects() {
  const [expandedId, setExpandedId] = useState<string>("PRJ-01");

  const projects = [
    {
      id: "PRJ-01",
      name: "Payment System",
      status: "PRODUCTION",
      description: [
        "Built a mock banking and payments platform from scratch with account management and secure balance transfers.",
        "Implemented a full transaction history with a clean, responsive front-end.",
        "Deployed on Cloudflare Pages with a Node/Express back-end and PostgreSQL database."
      ],
      tech: ["React", "Node.js", "Express", "PostgreSQL", "Cloudflare"],
      link: "https://mock-bank.pages.dev/",
    },
    {
      id: "PRJ-02",
      name: "LinkedIn for Chefs",
      status: "PRODUCTION",
      description: [
        "Built a social network for chefs with profiles, posts, and a recipe-driven feed.",
        "Developed the back-end with Flask and a SQLite database.",
        "Shipped a responsive server-rendered interface for culinary professionals to connect."
      ],
      tech: ["Flask", "Python", "SQLite", "HTML", "CSS"],
      link: "https://kairavb.pythonanywhere.com/",
    },
    {
      id: "PRJ-03",
      name: "GO Linux CLI",
      status: "OPEN_SOURCE",
      description: [
        "Built a command-line toolkit for Linux written in Go.",
        "Ships as a single static binary with zero runtime dependencies.",
        "Focused on speed and a clean, scriptable interface."
      ],
      tech: ["Go", "CLI", "Linux"],
      link: "https://github.com/kairavb/go-linux",
    },
    {
      id: "PRJ-04",
      name: "GO URL Shortener",
      status: "OPEN_SOURCE",
      description: [
        "Built a lightweight URL shortener in Go with fast redirects.",
        "Added basic click analytics and short-code generation.",
        "Backed by Redis for low-latency lookups."
      ],
      tech: ["Go", "Redis"],
      link: "https://github.com/kairavb/URL-Shortner",
    },
  ];

  return (
    <div
      id="projects"
      style={{
        marginTop: "24px",
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--line-fill)",
        position: "relative",
        fontSize: "12px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >


      {/* Header Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--line-stroke-accent)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--line-fill-accent)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--nav-link-hover)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", backgroundColor: "#3b82f6", borderRadius: "50%", display: "inline-block" }} />
          <span>Projects</span>
        </div>
        <span>TOTAL: 0{projects.length}_ACTIVE_NODES</span>
      </div>

      {/* Projects Grid */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((prj, index) => {
          const isExpanded = expandedId === prj.id;
          const isLast = index === projects.length - 1;

          return (
            <div
              key={prj.id}
              style={{
                borderBottom: isLast ? "none" : "1px solid var(--line-stroke-accent)",
                backgroundColor: "var(--background)",
                transition: "background-color 0.2s ease",
              }}
            >
              {/* Compact Header Row */}
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedId(isExpanded ? "" : prj.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {/* Project icon */}
                  <ProjectLogo url={prj.link} name={prj.name} size={36} shape="circle" />

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)" }}>{prj.name}</span>
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 6px",
                          border: "1px solid #3b82f6",
                          color: "#3b82f6",
                          letterSpacing: "0.08em",
                          borderRadius: "3px",
                          fontWeight: 600,
                        }}
                      >
                        {prj.status}
                      </span>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>{prj.id}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Live link */}
                  {prj.link && prj.link !== "#" && (
                    <a
                      href={prj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 10px",
                        border: "1px dashed var(--line-stroke-accent)",
                        borderRadius: "4px",
                        color: "var(--foreground)",
                        fontSize: "10px",
                        textDecoration: "none",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
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
                    </a>
                  )}

                  {/* Expand/Collapse chevron */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                      color: "var(--foreground)",
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
                        transition: "transform 0.3s ease",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <polyline points="6 15 12 9 18 15" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Dotted Divider */}
                  <div style={{ borderTop: "1px dotted var(--line-stroke-accent)", margin: "0" }} />

                  {/* Technologies & Tools */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Technologies & Tools</span>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {prj.tech.map((t) => (
                        <HoverTechTag
                          key={t}
                          techName={t}
                          baseStyle={{
                            padding: "12px 12px",
                            backgroundColor: "var(--line-fill-accent)",
                            border: "1px dashed var(--line-stroke-accent)",
                            color: "var(--foreground)",
                            fontSize: "12px",
                            borderRadius: "6px",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* What I've done (5 Points) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>What I've done</span>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {(Array.isArray(prj.description) ? prj.description : [prj.description]).map((desc, i) => (
                        <li key={i} style={{ display: "flex", gap: "12px", color: "var(--nav-link-hover)", fontSize: "13px", lineHeight: "1.6" }}>
                          <span style={{ color: "var(--line-stroke-accent)", marginTop: "1px", fontSize: "10px" }}>▪</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
