import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const inputSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128)
});

export async function POST(request: NextRequest) {
  let raw: unknown;
  try { raw = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = inputSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and a password of at least 8 characters." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Authentication is not configured. Use demo mode for preview only." }, { status: 503 });

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return NextResponse.json({ error: "Unable to sign in with these details." }, { status: 401 });

  return NextResponse.json({ user: { id: data.user.id, email: data.user.email } });
}
