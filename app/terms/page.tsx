export default function TermsPage() {
  return <main style={{maxWidth:900,margin:"0 auto",padding:"36px 22px"}}>
    <a href="/login" className="subtext">← Back to sign in</a>
    <h1>Terms of Use & Privacy</h1>
    <p className="subtext">Demo policy for Jayakrishna Solutions Learning Studio.</p>
    <section className="card card-pad" style={{marginTop:22}}>
      <h2>Learning purpose</h2>
      <p className="subtext">Courses are provided for educational purposes. Stock-market content is not personalised financial advice or a recommendation to buy or sell securities. Trading involves risk; learners should do independent research and consult a qualified adviser where appropriate.</p>
      <h2 style={{marginTop:24}}>Accounts and access</h2>
      <p className="subtext">Users must protect their credentials. Production access to paid content must be validated server-side against verified payment records. Demo mode is only for previewing sample content.</p>
      <h2 style={{marginTop:24}}>Live sessions and recordings</h2>
      <p className="subtext">Microphone, camera, chat and recording features should be used respectfully. Any recording requires appropriate notice and permissions. Do not share private classroom links publicly.</p>
      <h2 style={{marginTop:24}}>Privacy</h2>
      <p className="subtext">A production deployment must publish its actual data controller details, contact information, retention periods, processors and user-rights process before collecting real personal data. This demo does not represent a final legal policy.</p>
    </section>
  </main>;
}
