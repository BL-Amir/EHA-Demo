export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__header">
        <span className="section-label">Contact us</span>
      </div>
      <div className="contact__inner">
        <form
          className="contact__form"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="contact__bot-field">
            <label>
              Do not fill this out
              <input name="bot-field" tabIndex="-1" autoComplete="off" />
            </label>
          </p>
          <label className="contact__field">
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label className="contact__field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className="contact__field contact__field--message">
            <span>Message</span>
            <textarea name="message" rows="4" required></textarea>
          </label>
          <button type="submit" className="contact__submit">Send enquiry</button>
        </form>
        <div className="contact__info">
          <a href="mailto:enquiries@eharchitects.co.uk" className="contact__email">
            enquiries@eharchitects.co.uk
          </a>
          <div className="contact__details">
            <p>69 Harlesden Gardens</p>
            <p>London, NW10 4HB</p>
          </div>
        </div>
      </div>
    </section>
  )
}
