export default function Home() {
  return (
    <main className="home-page">
      <section className="hero-card">
        <div className="brand-header">
          <img src="/logo.svg" alt="Corporate Career Academy logo" className="brand-logo" />
          <div>
            <p className="eyebrow">Corporate Career Academy</p>
            <h1>AI-powered career growth with a bold, confident brand.</h1>
          </div>
        </div>

        <p className="hero-copy">
          Experience a refreshed interface built around the logo colors, strong contrast, and a polished career development aesthetic.
        </p>

        <div className="feature-grid">
          <article className="feature-card">
            <h2>Career Clarity</h2>
            <p>Use intelligent prompts and curated coaching guidance to sharpen your next move.</p>
          </article>
          <article className="feature-card">
            <h2>Resume Power</h2>
            <p>Generate cleaner, more impactful resumes with AI-driven structure and language.</p>
          </article>
          <article className="feature-card">
            <h2>Mentor Match</h2>
            <p>Connect with mentors and learning paths that fit your leadership objectives.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
