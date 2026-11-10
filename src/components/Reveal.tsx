import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and lifts content in once as it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SplitWordsProps {
  text: string;
  as?: 'h1' | 'h2' | 'p';
  id?: string;
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (used by the hero). */
  immediate?: boolean;
  /** Number of trailing words to render with the accent gradient. */
  accentLast?: number;
}

/** Staggered, masked word-by-word headline reveal that stays readable to screen readers. */
export function SplitWords({
  text,
  as: Tag = 'h2',
  id,
  className,
  delay = 0,
  immediate = false,
  accentLast = 0,
}: SplitWordsProps) {
  const words = text.split(' ');
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="split"
        initial="hidden"
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
        {...trigger}
      >
        {words.map((word, i) => (
          <span className="word-mask" key={`${word}-${i}`}>
            <motion.span
              className={i >= words.length - accentLast ? 'word word--accent' : 'word'}
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.65, ease: [0.2, 0.7, 0.2, 1] } },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
