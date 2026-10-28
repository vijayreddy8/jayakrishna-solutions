"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { courses, upcomingClasses } from "@/lib/courses";

type Section = "home" | "live" | "markets" | "software" | "settings";

const navItems: { id: Section; icon: string; label: string }[] = [
  { id: "home", icon: "⌂", label: "Home" },
  { id: "live", icon: "◉", label: "Live classes" },
  { id: "markets", icon: "↗", label: "Stock market" },
  { id: "software", icon: "⌘", label: "Software courses" },
  { id: "settings", icon: "⚙", label: "Settings" },
];

function CourseCard({ course, open }: { course: (typeof courses)[number]; open: () => void }) {
  const available = course.lessons.filter(l => l.status === "available").length;
  return <article className="card">
    <div className={"course-visual " + course.accent}>
      <span className="label-tag">{course.category}</span>
      <span className="course-symbol" style={{ marginLeft: "auto" }}>{course.symbol}</span>
    </div>
    <div className="card-pad">
      <div className="eyebrow">{course.level} · Learning track</div>
      <h3>{course.title}</h3>
      <p className="subtext">{course.description}</p>
      <div className="course-meta"><span>▤ {available} sample lessons</span><span>◷ Self-paced</span></div>
      <div className="card-actions"><button className="btn btn-primary" onClick={open}>Explore course <span>→</span></button><span className="pill">{course.lessons.length - available} coming soon</span></div>
    </div>
  </article>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState<Section>("home");
  const [email, setEmail] = useState("learner@demo.jayakrishna");
  const [language, setLanguage] = useState("English");
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const demo = sessionStorage.getItem("jks-demo-session");
    const demoEmail = sessionStorage.getItem("jks-demo-email");
    if (demo === "true") {
      if (demoEmail) setEmail(demoEmail);
      setReady(true);
      return;
    }
    import("@/lib/supabase").then(({ createSupabaseBrowserClient }) => {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) { router.replace("/login"); return; }
      supabase.auth.getUser().then(({ data }) => {
        if (!data.user) router.replace("/login");
        else { setEmail(data.user.email || "learner"); setReady(true); }
      });
    });
  }, [router]);

  const initials = useMemo(() => email.split("@")[0].slice(0, 2).toUpperCase(), [email]);

  function logout() {
    const isDemo = sessionStorage.getItem("jks-demo-session") === "true";
    if (isDemo) {
      sessionStorage.removeItem("jks-demo-session");
      sessionStorage.removeItem("jks-demo-email");
      router.replace("/login");
      return;
    }
    import("@/lib/supabase").then(async ({ createSupabaseBrowserClient }) => {
      const supabase = createSupabaseBrowserClient();
      await supabase?.auth.signOut();
      router.replace("/login");
    });
  }

  if (!ready) return <main className="form-wrap"><div className="form-card"><div className="eyebrow">JAYAKRISHNA SOLUTIONS</div><h2 style={{marginTop:12}}>Opening your learning studio…</h2></div></main>;

  function showCourse(courseId: string) {
    router.push("/courses/" + courseId);
  }
  function showSoon(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3500);
  }

  return <div className="shell">
    <aside className="sidebar">
      <a className="brand" href="/dashboard" aria-label="Jayakrishna Solutions home">
        <div className="brand-mark">J</div>
        <div className="brand-text"><div className="brand-name">Jayakrishna</div><div className="brand-sub">Learning Studio</div></div>
      </a>
      <div>
        <div className="nav-label">LEARNING SPACE</div>
        <nav className="nav">{navItems.map(item => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></button>)}</nav>
      </div>
      <div>
        <div className="nav-label">YOUR ACCOUNT</div>
        <nav className="nav"><button onClick={() => setActive("settings")}><span className="nav-icon">♙</span><span>Profile & preferences</span></button><button onClick={logout}><span className="nav-icon">↪</span><span>Sign out</span></button></nav>
      </div>
      <div className="side-bottom"><div className="eyebrow">LEARN EVERY DAY</div><p>Small steps today. Stronger skills tomorrow.</p><button className="btn btn-ghost" style={{width:"100%"}} onClick={() => setActive("software")}>Browse courses →</button></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><div className="breadcrumb">Learning Studio <span style={{color:"#536785"}}>/</span> {navItems.find(n => n.id === active)?.label || "Home"}</div></div>
        <div className="top-right"><span className="pill"><span className="dot"/> Demo environment</span><button className="avatar" title={email}>{initials}</button><button className="btn btn-ghost hide-mobile" onClick={logout}>Sign out ↗</button></div>
      </header>

      {active === "home" && <HomeContent showCourse={showCourse} setActive={setActive} showSoon={showSoon} />}
      {active === "live" && <LiveContent showSoon={showSoon} />}
      {active === "markets" && <CourseList title="Stock Market Learning" subtitle="Learn market concepts and build your knowledge at your own pace." selected={["market-foundations"]} showCourse={showCourse} />}
      {active === "software" && <CourseList title="Software Courses" subtitle="Explore developer tools, cloud foundations and practical engineering skills." selected={["devops-essentials","python-starter"]} showCourse={showCourse} />}
      {active === "settings" && <section><div className="eyebrow">PREFERENCES</div><h1>Settings</h1><p className="subtext">Manage your learning experience.</p><div className="card card-pad" style={{marginTop:22,maxWidth:760}}><div className="settings-row"><div><h3>Signed-in email</h3><p className="subtext">{email}</p></div><span className="pill">Demo / account</span></div><div className="settings-row"><div><h3>Preferred learning language</h3><p className="subtext">Choose the language you would like to hear when supported.</p></div><select className="form-input" style={{width:150}} value={language} onChange={e=>setLanguage(e.target.value)}><option>English</option><option>తెలుగు</option><option>हिन्दी</option><option>മലയാളം</option><option>தமிழ்</option><option>ಕನ್ನಡ</option></select></div><div className="settings-row"><div><h3>Live translation</h3><p className="subtext">The demo shows available language choices; no AI speech service is connected yet.</p></div><span className="pill">Integration pending</span></div><div className="notice" style={{marginTop:18}}>Language options are a user-interface preview. The selected translation will only work after a compatible speech service is configured and tested.</div></div></section>}

      <footer className="footer"><span>© {new Date().getFullYear()} Jayakrishna Solutions · Learning Studio</span><div style={{display:"flex",gap:16}}><a href="/terms">Terms of use</a><a href="/terms">Privacy</a><a href="mailto:support@example.com">Support</a></div></footer>
    </main>
    {toast && <div role="status" style={{position:"fixed",right:22,bottom:22,padding:"14px 18px",borderRadius:12,background:"#172844",border:"1px solid #4b6b9b",color:"#eaf2ff",fontSize:12,zIndex:10}}>{toast}</div>}
  </div>;
}

function HomeContent({showCourse,setActive,showSoon}:{showCourse:(id:string)=>void;setActive:(s:Section)=>void;showSoon:(message:string)=>void}) {
  return <>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow">WELCOME TO YOUR LEARNING STUDIO</div><h1>Learn something<br/>that moves you forward.</h1><p>Build market knowledge, explore new technologies and join instructor-led sessions — all from one focused learning space.</p><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:22}}><button className="btn btn-primary" onClick={()=>setActive("live")}>Explore live classes <span>→</span></button><button className="btn btn-ghost" onClick={()=>setActive("software")}>Browse courses</button></div></div>
    </section>
    <div className="stats"><div className="stat"><div className="stat-label">COURSE PATHS</div><div className="stat-value">03</div><div className="stat-note">Markets · Cloud · Coding</div></div><div className="stat"><div className="stat-label">SAMPLE LESSONS</div><div className="stat-value">08</div><div className="stat-note">Curated learning resources</div></div><div className="stat"><div className="stat-label">LIVE LEARNING</div><div className="stat-value" style={{fontSize:21}}>Ready to explore</div><div className="stat-note">Demo classroom experience</div></div></div>
    <div className="section-head"><div><div className="eyebrow">CHOOSE YOUR PATH</div><h2 style={{marginTop:8}}>Continue exploring</h2><p className="subtext">A carefully organised start for your learning journey.</p></div><button className="btn btn-ghost" onClick={()=>setActive("software")}>All courses →</button></div>
    <div className="grid grid-3">{courses.map(course=><CourseCard key={course.id} course={course} open={()=>showCourse(course.id)}/>)}</div>
    <div className="section-head"><div><div className="eyebrow">INSTRUCTOR-LED LEARNING</div><h2 style={{marginTop:8}}>Live classroom</h2><p className="subtext">Meet your instructor online with a language-first learning experience.</p></div><span className="pill"><span className="dot"/> Classroom preview</span></div>
    {upcomingClasses.map(item=><div className="live-row" key={item.id}><div className="live-icon">{item.icon}</div><div className="live-details"><h3>{item.title}</h3><p>{item.subtitle} · {item.time}</p></div><button className="btn btn-ghost" onClick={()=>setActive("live")}>Open room →</button></div>)}
    <div className="notice" style={{marginTop:20}}>Live video, room permissions and AI-powered voice translation require server and provider configuration before real classes can be hosted. This screen is a demo preview.</div>
  </>;
}

function LiveContent({showSoon}:{showSoon:(message:string)=>void}) {
  const [lang,setLang] = useState("English");
  return <section><div className="eyebrow">INSTRUCTOR-LED LEARNING</div><h1>Live classes</h1><p className="subtext">A dedicated space for interactive learning, instructor moderation and multilingual classroom tools.</p>
    <div className="hero" style={{marginTop:24,minHeight:210,gridTemplateColumns:"1fr .6fr"}}><div className="hero-copy"><span className="pill"><span className="dot"/> DEMO ROOM</span><h1 style={{fontSize:30}}>Live Market Learning Room</h1><p>Join the learning room when the instructor schedules a session. In the production build, room access will be limited to enrolled learners.</p><button className="btn btn-primary" onClick={()=>showSoon("LiveKit is not configured yet. Add LIVEKIT_URL, LIVEKIT_API_KEY and LIVEKIT_API_SECRET to the deployment environment after deploying a LiveKit server.")}>Join classroom preview →</button></div><div className="hero-art"><div className="chart"><div className="chart-head"><span>CLASSROOM CONTROLS</span><span>●</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>{["Mic permission","Camera permission","Raise hand","Live captions"].map(s=><div key={s} style={{padding:10,border:"1px solid var(--line)",borderRadius:10,fontSize:10,color:"#c3d2eb"}}>◉ {s}</div>)}</div><div className="chart-foot"><span>TEACHER MODERATED</span><span>WEBRTC</span></div></div></div></div>
    <div className="grid grid-2"><div className="card card-pad"><div className="eyebrow">PERSONALISE YOUR CLASS</div><h2 style={{marginTop:10}}>Choose audio language</h2><p className="subtext">Select your preferred language. Translation is shown as a preview until the AI audio service is connected.</p><label className="form-label" htmlFor="language">Preferred language</label><select className="form-input" id="language" value={lang} onChange={e=>setLang(e.target.value)}><option>English</option><option>తెలుగు</option><option>हिन्दी</option><option>മലയാളം</option><option>தமிழ்</option><option>ಕನ್ನಡ</option></select><div className="notice" style={{marginTop:16}}>Selected: <strong>{lang}</strong>. Real-time translated audio will be available after model support, latency, and audio quality are verified.</div></div><div className="card card-pad"><div className="eyebrow">CLASSROOM FEATURES</div><h2 style={{marginTop:10}}>Built for interaction</h2>{["Teacher-controlled mic and camera permissions","Participant list and raise-hand queue","Captions and language preference","Connection and device status","Reconnect and session-expiry handling"].map(s=><div key={s} className="settings-row"><span className="subtext" style={{color:"#c0cee5"}}>✓ &nbsp;{s}</span><span className="kbd">Planned</span></div>)}</div></div>
    <div className="section-head"><div><div className="eyebrow">UPCOMING ROOMS</div><h2 style={{marginTop:8}}>Class schedule</h2></div></div>{upcomingClasses.map(item=><div className="live-row" key={item.id}><div className="live-icon">{item.icon}</div><div className="live-details"><h3>{item.title}</h3><p>{item.subtitle} · {item.time}</p></div><span className="pill">Schedule soon</span></div>)}
  </section>;
}

function CourseList({title,subtitle,selected,showCourse}:{title:string;subtitle:string;selected:string[];showCourse:(id:string)=>void}) {
  const list = courses.filter(course=>selected.includes(course.id));
  return <section><div className="eyebrow">CURATED LEARNING PATHS</div><h1>{title}</h1><p className="subtext">{subtitle}</p><div className="grid grid-2" style={{marginTop:24}}>{list.map(course=><CourseCard key={course.id} course={course} open={()=>showCourse(course.id)}/>)}</div><div className="notice" style={{marginTop:20}}>More courses, assessments and instructor-led workshops will be added soon.</div></section>;
}
