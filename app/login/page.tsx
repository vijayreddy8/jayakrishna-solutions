"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (authError) { setError(authError.message); return; }
      router.replace("/dashboard");
      router.refresh();
      return;
    }
    setBusy(false);
    setError("Real login is not configured yet. For the client walkthrough, use the clearly labelled demo mode below.");
  }

  function enterDemo() {
    sessionStorage.setItem("jks-demo-session", "true");
    sessionStorage.setItem("jks-demo-email", email.trim() || "learner@demo.jayakrishna");
    router.replace("/dashboard");
  }

  return <main className="form-wrap">
    <section className="form-card">
      <div className="brand" style={{ padding: 0, marginBottom: 34 }}>
        <div className="brand-mark">J</div>
        <div><div className="brand-name">Jayakrishna Solutions</div><div className="brand-sub">Learning Studio</div></div>
      </div>
      <div className="eyebrow">YOUR LEARNING, YOUR PACE</div>
      <h1>Welcome back.</h1>
      <p className="subtext">Sign in to continue with live classes, market learning and software courses.</p>
      <form onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="email">Email address</label>
        <input className="form-input" id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-input" id="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
        {error && <div role="alert" className="alert">{error}</div>}
        <button className="btn btn-primary" type="submit" disabled={busy} style={{ width: "100%", marginTop: 23 }}>{busy ? "Signing in…" : "Sign in securely"} <span>→</span></button>
      </form>
      <div style={{ display:"flex", alignItems:"center", gap:12, margin:"23px 0", color:"#657895", fontSize:10 }}><div style={{height:1,background:"var(--line)",flex:1}}/>CLIENT DEMO ACCESS<div style={{height:1,background:"var(--line)",flex:1}}/></div>
      <button className="btn btn-ghost" style={{ width:"100%" }} onClick={enterDemo}>Continue in demo mode</button>
      <p style={{ fontSize:11, color:"#93a5c3", lineHeight:1.7, marginTop:13 }}>Demo mode uses sample content only; it is not a secured production account and does not unlock paid courses.</p>
      <div className="footer" style={{ marginTop:26 }}><span>© {new Date().getFullYear()} Jayakrishna Solutions</span><a href="/terms">Terms & Privacy</a></div>
    </section>
  </main>;
}
