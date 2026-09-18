let loading;
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function loadRecaptcha() {
  if (!siteKey) return Promise.reject(new Error('Spam protection is not configured'));
  if (!loading) loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timer = setTimeout(() => fail(), 15000);
    function fail() {
      clearTimeout(timer);
      script.remove();
      loading = undefined;
      reject(new Error('Spam protection could not load. Please try again.'));
    }
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.onerror = fail;
    script.onload = () => window.grecaptcha.ready(() => {
      clearTimeout(timer);
      resolve(window.grecaptcha);
    });
    document.head.append(script);
  });
  return loading;
}

export async function getEnquiryToken() {
  const recaptcha = await loadRecaptcha();
  // Tokens expire quickly: request a fresh one for every submission.
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Verification timed out')), 15000);
    recaptcha.execute(siteKey, { action: 'enquiry' }).then(resolve, reject)
      .finally(() => clearTimeout(timer));
  });
}
