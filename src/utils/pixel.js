export const PIXEL_ID = '1171343402127798';

/**
 * Safely track standard Meta Pixel events
 * Handles SPAs (Single Page Apps), prevents crashes, logs in dev mode
 */
export function trackPixel(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', eventName, params);
      console.log(`[Meta Pixel ${PIXEL_ID}] Event tracked:`, eventName, params);
      return true;
    }
  } catch (err) {
    console.warn('[Meta Pixel] Error sending event:', err);
  }
  return false;
}
