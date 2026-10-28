import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "jayakrishna-solutions",
    environment: process.env.NODE_ENV || "development",
    integrations: {
      supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      livekit: Boolean(process.env.LIVEKIT_URL && process.env.LIVEKIT_API_KEY && process.env.LIVEKIT_API_SECRET),
      translation: Boolean(process.env.TRANSLATION_PROVIDER && process.env.TRANSLATION_API_KEY)
    },
    note: "Integration flags indicate environment configuration, not provider end-to-end readiness."
  });
}
