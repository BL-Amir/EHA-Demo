# EHA-Demo local recreation

Reconstructed from the public eharchitects.co.uk site inspected on 15 September 2026.

## Run

- npm install
- npm run dev
- npm run build
- npm run preview -- --host 127.0.0.1 --port 5173

## Editing

The current application is in src/site/LiveSite.jsx. It contains named React components, page content, project data, and the live loading sequence. Styles are in src/site/live.css; media and fonts are in public/assets. src/App.jsx forwards to this current application. Older component and page files remain for reference and are not imported by the current entry point.

React, React Router, and GSAP are normal package imports; the production vendor bundle is not used as application source.

## Preview behavior

All three enquiry forms validate locally and explicitly report that nothing was sent. They make no submission requests.

The Privacy Policy and Terms & Conditions pages describe this local demo and general website use. Production-specific details requiring confirmation are listed below. Local direct page URLs work; forthcoming projects remain clearly identified.

Display controls, gallery reorder mode (Shift+E), and display-dock visibility (Shift+D) follow the public version.
## Appearance and legal content (September 2026)

Shared font, palette and accent settings live in src/site/appearance.js. This module applies preferences before React mounts. Accent preferences migrate once to version 2 (Orange); later selections persist. The demo controls are hidden at 900px and below.

Helvetica Bold uses system Helvetica where available and Arial Bold otherwise. Futura uses a system face where available, then the bundled SansSerifFLF geometric substitute, then Jost. These are fallback stacks: licensed Helvetica and Futura webfonts are not included.

Legal-page content lives in src/site/legalContent.js. Before production publication, confirm the business/controller identity, actual contact details, hosting/email services, data sharing/transfers, retention criteria and any analytics or cookies; revise the notice to match. The current copy accurately identifies the forms as local previews and makes no delivery promises. Website terms are not a contract for architectural services.

Reference guidance: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/ and https://www.gov.uk/guidance/writing-a-fair-contract-for-customers

## Prepared Resend integration (inactive)
Local previews simulate submission and send no request. The Netlify function `/.netlify/functions/enquiry` is prepared for future deployment. To activate later, configure a verified sender in ENQUIRY_FROM, a fixed recipient in ENQUIRY_TO, and a server-only RESEND_API_KEY. Set ENQUIRY_ENABLED=true on the server and VITE_ENQUIRY_LIVE=true before rebuilding the frontend. Deploy the function with the site on Netlify; Vite preview alone does not run server functions. Test provider acceptance/failure, configure abuse protection appropriate to the deployment, and update the privacy notice before enabling production enquiries. No credentials or delivery service are configured now.
Custom palette/accent values are stored only in browser preferences.


## Invisible reCAPTCHA v3
All three enquiry forms request a fresh v3 token on live submission. The server checks Google acceptance, action (`enquiry`), configured hostname, age and score before calling Resend. Verification failures preserve the form values and never send email. The Google badge remains visible after loading.

Register a **reCAPTCHA v3** site at https://www.google.com/recaptcha/admin/create and register the production domains. Set `VITE_RECAPTCHA_SITE_KEY` at build time. Set `RECAPTCHA_SECRET_KEY` only in the server environment, never in a VITE variable or committed file. Set `RECAPTCHA_HOSTNAMES` to comma-separated exact allowed hostnames (no scheme or port). `RECAPTCHA_MIN_SCORE` defaults to 0.5; review real scores before tuning. Rebuild/redeploy after setting the public key. Existing frontend and server enquiry activation switches and Resend settings are still required. Demo mode neither loads Google nor sends email.

Before production activation, review Google's data processing terms and the privacy notice for your deployment. Test real-domain verification with your own keys. Automated tests mock Google and Resend and do not validate a real Google account.
