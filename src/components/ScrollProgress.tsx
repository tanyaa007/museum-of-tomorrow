import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Thin cyan progress line pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const reduced = useReducedMotion();

  return <motion.div className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : smooth }} aria-hidden="true" />;
}
