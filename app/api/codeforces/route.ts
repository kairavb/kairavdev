import { NextResponse } from "next/server";

// Official Codeforces API — public, no key required.
const HANDLE = "kairav";

export async function GET() {
  try {
    const [infoRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${HANDLE}`, {
        headers: { "User-Agent": "portfolio-cf-stats" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://codeforces.com/api/user.rating?handle=${HANDLE}`, {
        headers: { "User-Agent": "portfolio-cf-stats" },
        next: { revalidate: 3600 },
      }),
    ]);

    const info = await infoRes.json();
    const rating = await ratingRes.json();

    if (info?.status !== "OK" || !info?.result?.[0]) {
      return NextResponse.json({ error: "Codeforces user not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: info.result[0],
      ratingHistory: rating?.status === "OK" ? rating.result : [],
    });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
