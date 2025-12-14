import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function badRequest(msg: string) {
  return new NextResponse(msg, { status: 400 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url");

  if (!target) return badRequest("Missing url");

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return badRequest("Invalid url");
  }

  // 🔒 Prevent open proxy: only allow your Supabase project host
  const allowedHosts: string[] = [];
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    allowedHosts.push(new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host);
  }

  if (!allowedHosts.includes(url.host)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  // Forward Range header for PDF.js
  const range = req.headers.get("range") || undefined;

  const upstream = await fetch(url.toString(), {
    headers: range ? { range } : undefined,
  });

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Upstream fetch failed", { status: 502 });
  }

  const headers = new Headers();
  headers.set(
    "Content-Type",
    upstream.headers.get("content-type") || "application/pdf"
  );

  const acceptRanges = upstream.headers.get("accept-ranges");
  if (acceptRanges) headers.set("Accept-Ranges", acceptRanges);

  const contentRange = upstream.headers.get("content-range");
  if (contentRange) headers.set("Content-Range", contentRange);

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  headers.set("Cache-Control", "public, max-age=3600");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  });
}
