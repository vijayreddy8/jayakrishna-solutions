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
    setError("Real login is not configured yet. Use demo mode to preview the learning dashboard.");
  }

  function enterDemo() {
    sessionStorage.setItem("jks-demo-session", "true");
    sessionStorage.setItem("jks-demo-email", email.trim() || "learner@demo.jayakrishna");
    router.replace("/dashboard");
  }

  return (
    <main className="login-page">
      <div className="login-layout">
        <section className="login-welcome" aria-label="Welcome to Jayakrishna Solutions">
          <div className="welcome-topline">
            <div className="brand-mark welcome-mark">J</div>
            <div className="welcome-brand">
              <div className="brand-name">Jayakrishna Solutions</div>
              <div className="brand-sub">Learning Studio</div>
            </div>
          </div>
          <div className="welcome-copy">
            <div className="eyebrow">LEARN · BUILD · GROW</div>
            <h1>Welcome to<br /><span>J. Krishna’s World.</span></h1>
            <p className="welcome-description">
              One place to explore new skills, learn from live sessions, understand the stock market,
              and build your future in technology.
            </p>
            <div className="welcome-highlights">
              <div className="welcome-highlight"><span className="highlight-icon">↗</span><div><strong>Market learning</strong><small>Build confidence with guided lessons</small></div></div>
              <div className="welcome-highlight"><span className="highlight-icon">⌘</span><div><strong>Software skills</strong><small>Learn practical, career-focused skills</small></div></div>
              <div className="welcome-highlight"><span className="highlight-icon">◎</span><div><strong>Live learning</strong><small>Keep your learning journey moving</small></div></div>
            </div>
          </div>
          <div className="welcome-bottom"><span className="welcome-status-dot" /> A smarter space for your next step <span className="welcome-bottom-year">© {new Date().getFullYear()}</span></div>
          <div className="welcome-orb welcome-orb-one" /><div className="welcome-orb welcome-orb-two" />
        </section>

        <section className="login-panel">
          <div className="login-panel-inner">
            <div className="mobile-brand">
              <div className="brand-mark">J</div>
              <div><div className="brand-name">Jayakrishna Solutions</div><div className="brand-sub">Learning Studio</div></div>
            </div>
            <div className="login-heading">
              <div className="eyebrow">YOUR JOURNEY STARTS HERE</div>
              <h2>Welcome back.</h2>
              <p className="subtext">Sign in to continue learning at your own pace.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="email">Email address</label>
              <input className="form-input" id="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-input" id="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              {error && <div role="alert" className="alert">{error}</div>}
              <button className="btn btn-primary login-submit" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in securely"} <span>→</span></button>
            </form>
            <div className="login-divider"><span />DEMO ACCESS<span /></div>
            <button className="btn btn-ghost demo-button" type="button" onClick={enterDemo}>Explore in demo mode <span>↗</span></button>
            <p className="login-footnote">Demo mode uses sample content only. It is not a secured production account and does not unlock paid courses.</p>
            <div className="login-legal"><span>© {new Date().getFullYear()} Jayakrishna Solutions</span><a href="/terms">Terms &amp; Privacy</a></div>
          </div>
        </section>
      </div>
    </main>
  );
}
