import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-page__header">
        <h1 className="about-page__title">About</h1>
      </div>

      <section className="about" id="about">
        <div className="about__inner">
          <span className="section-label">Studio</span>
          <div className="about__cols">
            <div className="about__col--statement">
              <p className="about__statement">
                A leading architecture firm providing high-end residential and commercial solutions for clients in London.
              </p>
            </div>
            <div className="about__col--detail">
              <p className="about__detail">
                Comfortable challenging traditional construction methods and materials, EH Architects brings a thoughtful, thorough process to every project — listening closely, planning carefully, reviewing rigorously, and delivering with precision.
              </p>
              <dl className="about__facts">
                <div className="about__facts-row">
                  <dt>Location</dt>
                  <dd>London</dd>
                </div>
                <div className="about__facts-row">
                  <dt>Scope</dt>
                  <dd>Residential &amp; Commercial</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy">
        <p className="philosophy__quote">
          "Every project is an exercise in listening — to the site, the structure, and the people who will inhabit it."
        </p>
      </section>

      <Footer />
    </main>
  )
}
