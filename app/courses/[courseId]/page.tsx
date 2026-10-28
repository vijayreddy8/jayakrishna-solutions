"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { courses } from "@/lib/courses";

export default function CourseDetailPage() {
  const params = useParams<{courseId:string}>();
  const router = useRouter();
  const [demo,setDemo] = useState(false);
  const [authReady,setAuthReady] = useState(false);
  const [selected,setSelected] = useState<string | null>(null);
  const course = courses.find(item=>item.id===params.courseId);

  useEffect(()=>{
    const isDemo = sessionStorage.getItem("jks-demo-session")==="true";
    if (isDemo) { setDemo(true); setAuthReady(true); return; }
    import("@/lib/supabase").then(({createSupabaseBrowserClient})=>{
      const sb=createSupabaseBrowserClient();
      if(!sb){router.replace("/login");return;}
      sb.auth.getUser().then(({data})=>{if(!data.user)router.replace("/login");else setAuthReady(true);});
    });
  },[router]);

  if(!authReady) return <main className="form-wrap"><div className="form-card">Loading course…</div></main>;
  if(!course) return <main style={{maxWidth:900,margin:"0 auto",padding:32}}><h1>Course not found</h1><a className="btn btn-primary" href="/dashboard">Back to dashboard</a></main>;

  const lesson = course.lessons.find(item=>item.id===selected) || course.lessons.find(item=>item.status==="available");

  return <main className="main" style={{maxWidth:1250,margin:"0 auto"}}>
    <header className="topbar"><a className="subtext" href="/dashboard">← Back to dashboard</a><span className="pill">Learning Studio</span></header>
    <div className="eyebrow">{course.category} / {course.level}</div>
    <h1>{course.title}</h1><p className="subtext" style={{maxWidth:760}}>{course.description}</p>
    <div className="grid grid-2" style={{marginTop:26,alignItems:"start"}}>
      <section className="card">
        <div className="player">
          {lesson?.videoId ? <iframe src={"https://www.youtube-nocookie.com/embed/"+lesson.videoId} title={lesson.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <div className="player-placeholder"><div className="play">▶</div><h3>Lesson coming soon</h3><p className="subtext">This lesson will be available in a future course update.</p></div>}
        </div>
        <div className="card-pad"><div className="eyebrow">NOW LEARNING</div><h2 style={{marginTop:8}}>{lesson?.title || "Choose a lesson"}</h2><p className="subtext">{lesson?.description}</p><div className="notice" style={{marginTop:16}}>Public educational video embed. This lesson is for general learning only and is not investment or financial advice.</div></div>
      </section>
      <section className="card card-pad">
        <div className="eyebrow">COURSE CURRICULUM</div><h2 style={{margin:"8px 0 18px"}}>Lessons & modules</h2>
        {course.lessons.map((item,index)=><button key={item.id} onClick={()=>item.status==="available"?setSelected(item.id):undefined} disabled={item.status!=="available"} style={{display:"flex",width:"100%",textAlign:"left",gap:12,padding:14,marginBottom:9,border:"1px solid "+(lesson?.id===item.id?"#668acb":"var(--line)"),borderRadius:12,background:lesson?.id===item.id?"#182a45":"#0d1726",color:"var(--text)",opacity:item.status==="coming-soon"?.7:1}}>
          <span style={{width:31,height:31,borderRadius:9,display:"grid",placeItems:"center",background:item.status==="available"?"#1d3c3d":"#26344a",color:item.status==="available"?"#76e0c0":"#9aabc5",flexShrink:0}}>{item.status==="available"?"▶":"🔒"}</span>
          <span style={{flex:1}}><strong style={{fontSize:12,display:"block",lineHeight:1.5}}>{index+1}. {item.title}</strong><span style={{display:"block",color:"var(--muted)",fontSize:10,marginTop:5}}>{item.duration} · {item.status==="available"?"Available":"Coming soon"}</span></span>
        </button>)}
        <p className="subtext" style={{fontSize:11}}>Additional lessons and instructor sessions will be published soon.</p>
      </section>
    </div>
  </main>;
}
