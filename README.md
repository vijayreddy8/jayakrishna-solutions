# Jayakrishna Solutions — Learning Platform

A full-stack demo learning portal for stock-market and software courses, with a planned self-hosted live classroom and multilingual live translation.

## Current MVP scope

- Email/password authentication through a server-side API (demo accounts only when explicitly configured).
- Student dashboard and course catalogue.
- Stock market learning module with curated public educational video embeds.
- Software courses (Docker, AWS, Python) with video lessons and coming-soon placeholders.
- Live classroom UI prepared for a self-hosted WebRTC SFU integration.
- Language selector and translation status UI; AI translation is an integration point, not enabled until provider credentials are configured.
- Terms, Privacy, and responsible-learning notices.

## Tech stack

- Next.js App Router, TypeScript, Tailwind CSS
- Supabase Auth + Postgres for real accounts and course entitlements
- LiveKit self-hosted WebRTC for live audio/video
- Server-side translation adapter so providers and supported target languages can be tested independently

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local` and fill in the values for services you have configured.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

Never commit real API keys, service-role keys, passwords, or private credentials. Authentication and payment access must be validated on the server.

## Demo limitations

Video embeds link to public educational content, which may change or be unavailable. The classroom and translation layers require their own deployment, configuration, and real-device testing before production use. Do not use this demo as investment advice or as a platform for executing trades.

## Planned milestones

1. Full-stack UI, routes, and server-side auth wiring.
2. Course catalogue, access policies, and admin seed workflow.
3. Self-hosted LiveKit rooms with teacher moderation and scoped access tokens.
4. Real-time speech translation provider evaluation for Telugu, Hindi, and Malayalam.
5. Payment webhook verification, monitoring, load tests, and production deployment.
