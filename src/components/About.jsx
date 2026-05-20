export default function About() {
  return (
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
  )
}
