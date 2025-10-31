// src/animations/motionVariants.ts
import { Variants, Transition } from "framer-motion";

// Standard easing
const easeOut: [number, number, number, number] = [0.25, 0.8, 0.25, 1];
const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];

// Default transition
const defaultTransition: Transition = { duration: 0.6, ease: easeOut };


// Slow fade-in
export const fadeInSlow: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeInOut } },
};


// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: defaultTransition },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: defaultTransition },
};

// Slide in from bottom
export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};

// Fade in (simple)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition },
};

// Scale up from 0.95 to 1 (nice for cards/buttons)
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: defaultTransition },
};

// Slight bounce effect (hero titles, main CTA)
export const bounceIn: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

// Staggered container for multiple children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Staggered item (used with staggerContainer)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};
