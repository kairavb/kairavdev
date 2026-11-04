
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HoverTechTag } from "../components/HoverTechTag";
import { ProjectLogo } from "../components/ProjectLogo";
import { CadProjectCardItem } from "../components/CadProjectCardItem";

export default function ProjectsPage() {
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
          <span style={{ color: "var(--foreground)" }}>PROJECTS</span>
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
              Projects
            </h1>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <CadProjects />
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

const projectCardMeta: Record<string, { brandColor: string; bgGradient: string; stars: string }> = {
  "Cloud-Native AI Deployment Platform": {
    brandColor: "#059669",
    bgGradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.16) 0%, rgba(6, 78, 59, 0.22) 100%)",
    stars: "",
  },
  "Scalable URL Shortening Service": {
    brandColor: "#0284c7",
    bgGradient: "linear-gradient(135deg, rgba(2, 132, 199, 0.16) 0%, rgba(12, 74, 110, 0.22) 100%)",
    stars: "",
  },
  "Linux Command-Line Assistant": {
    brandColor: "#06b6d4",
    bgGradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.16) 0%, rgba(14, 116, 144, 0.22) 100%)",
    stars: "",
  },
  "Virtual Banking System": {
    brandColor: "#2563eb",
    bgGradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.16) 0%, rgba(30, 58, 138, 0.22) 100%)",
    stars: "",
  },
  "Chef Hiring Portal": {
    brandColor: "#f59e0b",
    bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(146, 64, 14, 0.22) 100%)",
    stars: "",
  },
  "NFT Ticket Marketplace": {
    brandColor: "#7c3aed",
    bgGradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.16) 0%, rgba(76, 29, 149, 0.22) 100%)",
    stars: "",
  },
  "Live Snake Game": {
    brandColor: "#16a34a",
    bgGradient: "linear-gradient(135deg, rgba(22, 163, 74, 0.16) 0%, rgba(20, 83, 45, 0.22) 100%)",
    stars: "",
  },
  "Single Layer Perceptron": {
    brandColor: "#db2777",
    bgGradient: "linear-gradient(135deg, rgba(219, 39, 119, 0.16) 0%, rgba(131, 24, 67, 0.22) 100%)",
    stars: "",
  },
  "Duplicate File Remover": {
    brandColor: "#ea580c",
    bgGradient: "linear-gradient(135deg, rgba(234, 88, 12, 0.16) 0%, rgba(124, 45, 18, 0.22) 100%)",
    stars: "",
  },
  "CP Practice Game": {
    brandColor: "#0891b2",
    bgGradient: "linear-gradient(135deg, rgba(8, 145, 178, 0.16) 0%, rgba(14, 116, 144, 0.22) 100%)",
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
              ? { x1: [3, 9, 3], x2: [21, 15, 21] }
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
              ? { x1: [3, 8, 3], x2: [21, 13, 21] }
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
      name: "Cloud-Native AI Deployment Platform",
      status: "PROD",
      description: [
        "Built a cloud-native platform that deploys machine learning models as scalable inference APIs through automated containerization, model versioning, and deployment orchestration.",
        "Designed a complete model lifecycle management system with deployment monitoring, health validation, and centralized logging.",
        "Added interactive inference testing for reliable, production-ready model serving."
      ],
      tech: ["FastAPI", "React", "PostgreSQL", "Docker", "Prometheus"],
      link: "https://github.com/kairavb/model-deployment-platform",
    },
    {
      id: "PRJ-02",
      name: "Scalable URL Shortening Service",
      status: "OSS",
      description: [
        "Built a backend URL shortening service in Go with clean REST APIs and collision-safe short-code generation.",
        "Implemented concurrency-safe request handling with token-bucket rate limiting, in-memory caching for hot URLs, persistent storage, and health/readiness endpoints.",
        "Stress-tested under concurrent load to measure throughput and latency, identify bottlenecks, and optimize request handling."
      ],
      tech: ["Go", "REST APIs", "Caching", "Rate Limiting", "Load Testing"],
      link: "https://github.com/kairavb/URL-Shortener",
    },
    {
      id: "PRJ-03",
      name: "Linux Command-Line Assistant",
      status: "OSS",
      description: [
        "Built a Go-based Linux CLI that converts natural-language queries into shell commands with clear explanations.",
        "Added flag-based controls, a monitoring mode, and command-history logging.",
        "Implemented safety-first execution — dry-run mode, explicit confirmation, command validation, and warnings for destructive commands."
      ],
      tech: ["Go", "Bash", "Linux", "CLI"],
      link: "https://github.com/kairavb/go-linux",
    },
    {
      id: "PRJ-04",
      name: "Virtual Banking System",
      status: "PROD",
      description: [
        "Built a banking backend with user account creation, transaction history, and fund transfers.",
        "Added role-based dashboards for both users and administrators.",
        "Exposed functionality via RESTful APIs backed by structured data models."
      ],
      tech: ["MongoDB", "Node.js", "Express", "JavaScript"],
      link: "https://mock-bank.pages.dev/",
    },
    {
      id: "PRJ-05",
      name: "Chef Hiring Portal",
      status: "PROD",
      description: [
        "Engineered and deployed a high-performance backend for a chef-hiring platform.",
        "Enabled communication, profile management, view tracking, and global browsing of 12+ chefs.",
        "Implemented name-based search with response times under 200ms."
      ],
      tech: ["Flask", "Python", "MySQL", "JavaScript"],
      link: "https://kairavb.pythonanywhere.com/",
    },
    {
      id: "PRJ-06",
      name: "NFT Ticket Marketplace",
      status: "OSS",
      description: [
        "Built a blockchain-based ticketing platform that issues tickets as NFTs to prevent fraud and black-marketing.",
        "Implemented minting and ownership flows on the Aptos blockchain.",
        "Shipped a React front-end for browsing and purchasing tickets."
      ],
      tech: ["Aptos", "TypeScript", "React", "JavaScript"],
      link: "https://github.com/AryanGupta0007/NFTmarketPlace",
    },
    {
      id: "PRJ-07",
      name: "Live Snake Game",
      status: "PROD",
      description: [
        "A clean, minimal take on the classic snake game in pure JavaScript on the HTML canvas.",
        "Optimized and deployed static assets via the Cloudflare CDN for fast, low-latency global delivery.",
        "Responsive, multi-device controls with a distraction-free interface."
      ],
      tech: ["JavaScript", "Canvas", "Cloudflare"],
      link: "https://saap.pages.dev",
    },
    {
      id: "PRJ-08",
      name: "Single Layer Perceptron",
      status: "OSS",
      description: [
        "Built a single-layer perceptron from scratch with NumPy to classify image inputs.",
        "Used OpenCV for image preprocessing and feature extraction.",
        "A hands-on exercise in the fundamentals of neural networks."
      ],
      tech: ["Python", "NumPy", "OpenCV"],
      link: "https://github.com/kairavb/single_layer_perceptron",
    },
    {
      id: "PRJ-09",
      name: "Duplicate File Remover",
      status: "OSS",
      description: [
        "Built a Windows desktop app to detect and remove duplicate files automatically.",
        "Optimized the scan algorithm to process thousands of files in seconds.",
        "Reduced storage clutter with a simple Tkinter GUI."
      ],
      tech: ["Python", "Tkinter"],
      link: "https://github.com/kairavb/duplicate_file_finder",
    },
    {
      id: "PRJ-10",
      name: "CP Practice Game",
      status: "PROD",
      description: [
        "Created a timer-based environment for revising algorithms with a points-based progress system.",
        "Added 4 practice modes to suit different user needs.",
        "Built to make competitive-programming practice more engaging."
      ],
      tech: ["Python", "Web"],
      link: "https://github.com/kairavb/dsaplatform",
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

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span className="hidden sm:inline">TOTAL: 0{projects.length}_ACTIVE_NODES</span>

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
            style={{ display: "flex", flexDirection: "column" }}
          >
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
                              color: prj.status === "PROD" ? "#3b82f6" : "#f59e0b",
                              letterSpacing: "0.08em",
                              borderRadius: "3px",
                              fontWeight: 600,
                              border: prj.status === "PROD" ? "1px solid #3b82f6" : "1px solid #f59e0b",
                              borderStyle: "dashed",
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
                        <motion.a
                          href={prj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
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
                          <span>{/github\.com/.test(prj.link) ? "GITHUB" : "LIVE"}</span>
                        </motion.a>
                      )}

                      {/* Expand/Collapse chevron with Motion rotation */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "1px solid var(--line-stroke-accent)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
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
            {projects.map((prj, i) => {
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
    </div>
  );
}
