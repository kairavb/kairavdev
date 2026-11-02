"use client";

import { useEffect, useState } from "react";

/* ── Shared CAD card styling ── */
const cardStyle: React.CSSProperties = {
  backgroundColor: "var(--line-fill)",
  border: "1px solid var(--line-stroke-accent)",
  fontFamily: "var(--font-geist-mono)",
  fontSize: "12px",
  display: "flex",
  flexDirection: "column",
};

const headerStyle: React.CSSProperties = {
  alignItems: "center",
  backgroundColor: "var(--line-fill-accent)",
  borderBottom: "1px solid var(--line-stroke-accent)",
  color: "var(--nav-link-hover)",
  display: "flex",
  fontSize: "10px",
  justifyContent: "space-between",
  letterSpacing: "0.1em",
  padding: "10px 14px",
};

const dot = (color: string) => (
  <span style={{ backgroundColor: color, borderRadius: "50%", display: "inline-block", height: "6px", width: "6px" }} />
);

/* ── Codeforces rank → colour (matches CF's own scheme) ── */
function cfRankColor(rank: string): string {
  const r = (rank || "").toLowerCase();
  if (r.includes("legendary")) return "#ff0000";
  if (r.includes("international grandmaster")) return "#ff0000";
  if (r.includes("grandmaster")) return "#ff0000";
  if (r.includes("international master")) return "#ff8c00";
  if (r.includes("master")) return "#ff8c00";
  if (r.includes("candidate")) return "#aa00aa";
  if (r.includes("expert")) return "#0000ff";
  if (r.includes("specialist")) return "#03a89e";
  if (r.includes("pupil")) return "#008000";
  return "#9aa0a6"; // newbie / unrated
}

/* ───────────────────────── LeetCode panel ───────────────────────── */
type LCData = {
  matchedUser: {
    username: string;
    profile: { ranking: number };
    submitStats: { acSubmissionNum: { difficulty: string; count: number }[] };
  };
  allQuestionsCount: { difficulty: string; count: number }[];
};

const LC_COLORS: Record<string, string> = { Easy: "#00b8a3", Medium: "#ffc01e", Hard: "#ff375f" };

function LeetCodePanel({ data }: { data: LCData | null }) {
  const stats = data?.matchedUser?.submitStats?.acSubmissionNum ?? [];
  const totals = data?.allQuestionsCount ?? [];
  const get = (arr: { difficulty: string; count: number }[], d: string) =>
    arr.find((x) => x.difficulty === d)?.count ?? 0;

  const solvedAll = get(stats, "All");
  const ranking = data?.matchedUser?.profile?.ranking;

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          {dot("#ffa116")}
          <span>LeetCode</span>
        </div>
        <span>@kairavb</span>
      </div>

      <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
        {!data ? (
          <div style={{ color: "var(--nav-link)", fontSize: "11px" }}>Syncing…</div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "30px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                {solvedAll}
              </span>
              <span style={{ fontSize: "11px", color: "var(--nav-link)" }}>problems solved</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {(["Easy", "Medium", "Hard"] as const).map((d) => {
                const solved = get(stats, d);
                const total = get(totals, d) || 1;
                const pct = Math.min(100, Math.round((solved / total) * 100));
                return (
                  <div key={d}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", marginBottom: "3px" }}>
                      <span style={{ color: LC_COLORS[d], fontWeight: 600 }}>{d}</span>
                      <span style={{ color: "var(--nav-link)" }}>
                        {solved} / {get(totals, d)}
                      </span>
                    </div>
                    <div style={{ height: "4px", backgroundColor: "var(--line-stroke)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", backgroundColor: LC_COLORS[d], borderRadius: "2px" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {ranking ? (
              <div style={{ marginTop: "auto", paddingTop: "6px", fontSize: "10px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>
                GLOBAL RANK · #{ranking.toLocaleString()}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Codeforces panel ───────────────────────── */
type CFData = {
  user: { handle: string; rating?: number; maxRating?: number; rank?: string; maxRank?: string };
  ratingHistory: { newRating: number }[];
};

function RatingSparkline({ history, color }: { history: { newRating: number }[]; color: string }) {
  if (!history || history.length < 2) return null;
  const vals = history.map((h) => h.newRating);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const W = 260;
  const H = 54;
  const pts = vals
    .map((v, i) => {
      const x = (i / (vals.length - 1)) * W;
      const y = H - ((v - min) / span) * H;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={W} cy={H - ((vals[vals.length - 1] - min) / span) * H} r="2.5" fill={color} />
    </svg>
  );
}

function CodeForcesPanel({ data }: { data: CFData | null }) {
  const u = data?.user;
  const color = cfRankColor(u?.rank ?? "");
  const contests = data?.ratingHistory?.length ?? 0;

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          {dot("#1f8acb")}
          <span>Codeforces</span>
        </div>
        <span>@kairav</span>
      </div>

      <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
        {!data ? (
          <div style={{ color: "var(--nav-link)", fontSize: "11px" }}>Syncing…</div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "30px", fontWeight: 700, color, letterSpacing: "-0.02em" }}>
                  {u?.rating ?? "—"}
                </span>
                <span style={{ fontSize: "11px", color, fontWeight: 600, textTransform: "capitalize" }}>{u?.rank}</span>
              </div>
              <span style={{ fontSize: "10px", color: "var(--nav-link)" }}>max {u?.maxRating ?? "—"}</span>
            </div>

            <RatingSparkline history={data.ratingHistory} color={color} />

            <div style={{ marginTop: "auto", paddingTop: "6px", display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>
              <span>CONTESTS · {contests}</span>
              <span style={{ textTransform: "capitalize" }}>MAX · {u?.maxRank}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Combined section ───────────────────────── */
export function CodingStats() {
  const [lc, setLc] = useState<LCData | null>(null);
  const [cf, setCf] = useState<CFData | null>(null);
  const [lcDown, setLcDown] = useState(false);
  const [cfDown, setCfDown] = useState(false);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => (d?.data?.matchedUser ? setLc(d.data) : setLcDown(true)))
      .catch(() => setLcDown(true));

    fetch("/api/codeforces")
      .then((r) => r.json())
      .then((d) => (d?.user ? setCf(d) : setCfDown(true)))
      .catch(() => setCfDown(true));
  }, []);

  // Both unavailable → render nothing (no broken UI)
  if (lcDown && cfDown) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: "24px" }}>
      {!lcDown && <LeetCodePanel data={lc} />}
      {!cfDown && <CodeForcesPanel data={cf} />}
    </div>
  );
}
