import { NextResponse } from "next/server";

// Public (unofficial) LeetCode GraphQL endpoint — no auth needed.
// Must be called server-side (LeetCode blocks browser CORS).
const USERNAME = "kairavb";

export async function GET() {
  const query = `
    query userData($username: String!) {
      matchedUser(username: $username) {
        username
        profile { ranking }
        submitStats { acSubmissionNum { difficulty count } }
        submissionCalendar
      }
      allQuestionsCount { difficulty count }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "portfolio-leetcode-stats",
      },
      body: JSON.stringify({ query, variables: { username: USERNAME } }),
      next: { revalidate: 3600 }, // cache 1h
    });

    if (!res.ok) {
      return NextResponse.json({ error: `LeetCode API ${res.status}` }, { status: res.status });
    }
    const data = await res.json();
    if (!data?.data?.matchedUser) {
      return NextResponse.json({ error: "LeetCode user not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
