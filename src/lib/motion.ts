// JS-side equivalents of the CSS easing/duration tokens in globals.css —
// Motion and GSAP need array/number values, not CSS custom properties.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION_FAST = 0.2;
export const DURATION_BASE = 0.4;
export const DURATION_SLOW = 0.8;
