import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const url = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  if (!url || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Live classroom is not configured on this deployment." }, { status: 503 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Authentication provider is not configured." }, { status: 503 });
  }
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return NextResponse.json({ error: "Sign in is required to join a live classroom." }, { status: 401 });
  }

  let body: { room?: string } = {};
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Send a valid JSON body." }, { status: 400 });
  }
  const room = (body.room || "").trim();
  if (!/^[a-zA-Z0-9_-]{3,80}$/.test(room)) {
    return NextResponse.json({ error: "Room name must be 3–80 characters and use letters, numbers, _ or -." }, { status: 400 });
  }

  // TODO: Query enrolments and class schedule here. Do not expose token generation until
  // course-entitlement and teacher/student role checks are connected to the database.
  return NextResponse.json({ error: "LiveKit token endpoint is scaffolded but room entitlement checks are not yet configured. No token was issued." }, { status: 501 });
}
