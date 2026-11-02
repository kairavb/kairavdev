"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectLogo } from "./ProjectLogo";

export interface ProjectSlide {
  badge: string;
  title: string;
  subtitle: string;
  render: (brandColor: string) => React.ReactNode;
}

export interface ProjectCardMeta {
  brandColor: string;
  bgGradient: string;
  stars: string;
}


// ── GENERIC, DATA-DRIVEN SLIDES (built from each project's real data) ──

function getProjectSlides(prj: {
  name: string;
  description: string | string[];
  link: string;
  status: string;
  tech: string[];
}): ProjectSlide[] {
  const bullets = Array.isArray(prj.description) ? prj.description : [prj.description];
  let host = prj.link;
  try {
    host = new URL(prj.link).hostname.replace(/^www\./, "") + new URL(prj.link).pathname.replace(/\/$/, "");
  } catch {
    host = prj.link;
  }
  const isRepo = /github\.com/.test(prj.link);

  return [
    {
      badge: "OVERVIEW",
      title: prj.name,
      subtitle: bullets[0] ?? "",
      render: (brand) => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 14px", gap: "9px", justifyContent: "center" }}>
          {bullets.slice(0, 3).map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span style={{ color: brand, fontSize: "10px", fontWeight: 700, marginTop: "1px", fontFamily: "var(--font-geist-mono)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "10px", color: "var(--foreground)", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      badge: "TECH_STACK",
      title: "Built with",
      subtitle: `${prj.tech.length} technologies`,
      render: (brand) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "14px", alignContent: "center", height: "100%" }}>
          {prj.tech.map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: "9px",
                fontFamily: "var(--font-geist-mono)",
                padding: "4px 9px",
                borderRadius: "4px",
                backgroundColor: "var(--line-fill-accent)",
                border: `1px solid ${brand}`,
                color: "var(--foreground)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      ),
    },
    {
      badge: isRepo ? "ACCESS // SOURCE" : "ACCESS // LIVE",
      title: isRepo ? "Open source" : "Live project",
      subtitle: host,
      render: (brand) => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "14px", gap: "10px", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              backgroundColor: "var(--line-fill-accent)",
              border: `1px solid ${brand}`,
              borderRadius: "6px",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "8px", color: brand, fontWeight: 700 }}>{isRepo ? "REPOSITORY" : "LIVE URL"}</div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist-mono)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {host}
              </div>
            </div>
            <span style={{ fontSize: "8px", padding: "3px 8px", borderRadius: "4px", backgroundColor: brand, color: "#ffffff", fontWeight: 600, flexShrink: 0 }}>
              {isRepo ? "CODE" : "OPEN"}
            </span>
          </div>
          <div style={{ fontSize: "9px", color: "var(--nav-link)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.06em" }}>
            STATUS: {prj.status}
          </div>
        </div>
      ),
    },
  ];
}


// ── CAD PROJECT CARD WITH VERTICAL BOTTOM-TO-TOP CAROUSEL ──

export function CadProjectCardItem({
  prj,
  meta,
  index = 0,
}: {
  prj: {
    id: string;
    name: string;
    description: string | string[];
    link: string;
    status: string;
    tech: string[];
  };
  meta: ProjectCardMeta;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = getProjectSlides(prj);
  const displayDesc = Array.isArray(prj.description) ? prj.description[0] : prj.description;

  // Auto-play vertical carousel from bottom to top on hover
  useEffect(() => {
    if (!hovered) return;

    const timer = setInterval(() => {
      setDirection(1); // Bottom to top
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [hovered, slides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Title Bar above card: matches reference screenshot */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          padding: "0 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 600,
              margin: 0,
              color: meta.brandColor,
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {prj.name.toLowerCase()}
          </h3>
        </div>

        {meta.stars ? (
          <motion.div
            whileHover={{ scale: 1.08 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "var(--nav-link)",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono), monospace",
              cursor: "default",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{meta.stars}</span>
          </motion.div>
        ) : null}
      </div>

      {/* Card Preview Container with Vertical Bottom-to-Top Carousel */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          position: "relative",
          height: "260px",
          borderRadius: "16px",
          overflow: "hidden",
          border: hovered ? `1px solid ${meta.brandColor}` : "1px solid var(--line-stroke-accent)",
          backgroundColor: "var(--line-fill)",
          boxShadow: hovered ? "0 14px 34px -10px rgba(0,0,0,0.3)" : "none",
          transition: "border 0.3s ease, box-shadow 0.3s ease",
          userSelect: "none",
        }}
      >
        {/* Top-Right Circular External Link Button (as seen in reference image) */}
        {prj.link && prj.link !== "#" && (
          <motion.a
            href={prj.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            title={`Visit ${prj.name}`}
            aria-label={`Visit ${prj.name}`}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 30,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </motion.a>
        )}

        {/* Bottom-Right Vertical Indicator Dots (matches reference screenshot) */}
        <div
          style={{
            position: "absolute",
            right: "12px",
            bottom: "12px",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            padding: "5px 4px",
            borderRadius: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {slides.map((_, dotIdx) => {
            const isActive = activeSlide === dotIdx;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(dotIdx >= activeSlide ? 1 : -1);
                  setActiveSlide(dotIdx);
                }}
                title={`Slide ${dotIdx + 1}`}
                aria-label={`Slide ${dotIdx + 1}`}
                style={{
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  width: "5px",
                  height: isActive ? "16px" : "5px",
                  borderRadius: isActive ? "3px" : "50%",
                  backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            );
          })}
        </div>

        {/* Animated Vertical Carousel Slides: Flow from Bottom to Top */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                y: dir > 0 ? "100%" : "-100%",
                opacity: 0,
              }),
              center: {
                y: 0,
                opacity: 1,
              },
              exit: (dir: number) => ({
                y: dir > 0 ? "-100%" : "100%",
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25 },
            }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--background)",
            }}
          >
            {/* Slide Top Navigation Header Ribbon */}
            <div
              style={{
                padding: "8px 14px",
                borderBottom: "1px solid var(--line-stroke-accent)",
                backgroundColor: "var(--line-fill-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ProjectLogo url={prj.link} name={prj.name} size={18} shape="rounded" />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "0.04em" }}>
                  {prj.name.toUpperCase()}
                </span>
                <span style={{ fontSize: "8px", color: meta.brandColor, fontWeight: 600, letterSpacing: "0.08em" }}>
                  // {slides[activeSlide]?.badge}
                </span>
              </div>

              {/* Faux window action dots */}
              <div style={{ display: "flex", gap: "4px", marginRight: prj.link ? "32px" : "0" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
              </div>
            </div>

            {/* Slide Body Content */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              {slides[activeSlide]?.render(meta.brandColor)}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Description below card */}
      <div
        style={{
          marginTop: "12px",
          color: "var(--nav-link-hover)",
          fontSize: "13px",
          lineHeight: "1.6",
          fontFamily: "var(--font-geist-sans), sans-serif",
        }}
      >
        {displayDesc}
      </div>

      {/* Tech pills row with motion */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginTop: "12px",
        }}
      >
        {prj.tech.map((t: string) => (
          <motion.span
            key={t}
            whileHover={{ scale: 1.06, y: -1 }}
            transition={{ duration: 0.15 }}
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--line-stroke-accent)",
              color: "var(--nav-link)",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px",
              letterSpacing: "0.04em",
              padding: "2px 6px",
              borderRadius: "3px",
              cursor: "default",
            }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
