export async function verifyRecaptcha(token, env, fetcher = fetch) {
  const hosts = (env.RECAPTCHA_HOSTNAMES || '').split(',').map(s => s.trim()).filter(Boolean);
  const threshold = Number(env.RECAPTCHA_MIN_SCORE || '0.5');
  if (!env.RECAPTCHA_SECRET_KEY || !hosts.length || !Number.isFinite(threshold) || threshold < 0 || threshold > 1) {
    return { status: 503, error: 'Spam protection is not configured' };
  }
  if (typeof token !== 'string' || !token.trim() || token.length > 10000) {
    return { status: 400, error: 'Verification is required' };
  }
  try {
    const response = await fetcher('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.RECAPTCHA_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Verification unavailable');
    const result = await response.json();
    const age = Date.now() - Date.parse(result.challenge_ts);
    if (result.success !== true || result.action !== 'enquiry' || !hosts.includes(result.hostname) ||
        typeof result.score !== 'number' || !Number.isFinite(result.score) || result.score < threshold ||
        !Number.isFinite(age) || age < -30000 || age > 120000) {
      return { status: 403, error: 'Verification failed. Please try again.' };
    }
    return null;
  } catch {
    return { status: 503, error: 'Verification unavailable. Please try again.' };
  }
}
