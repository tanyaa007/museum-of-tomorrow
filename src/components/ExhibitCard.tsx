import { motion, useMotionValue, useSpring, useTransform, type MotionStyle } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { PointerEvent } from 'react';
import type { Exhibit } from '../data/exhibits';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ExhibitScene } from './ExhibitScene';
import { SceneCanvas } from './SceneCanvas';

export type CardSlot = 'solo' | 'half' | 'feature' | 'a' | 'b' | 'c' | 'd' | 'e';

interface Props {
  exhibit: Exhibit;
  slot: CardSlot;
  onOpen: (id: string) => void;
}

export function ExhibitCard({ exhibit, slot, onOpen }: Props) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 140, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 140, damping: 18 });

  const handleMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const style = {
    rotateX: reduced ? 0 : rotateX,
    rotateY: reduced ? 0 : rotateY,
    transformPerspective: 1000,
    '--accent': exhibit.color,
  } as MotionStyle;

  return (
    <motion.article
      className={`card card--${slot}`}
      style={style}
      onClick={() => onOpen(exhibit.id)}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      <span className="card__index" aria-hidden="true">
        {exhibit.number}
      </span>

      <SceneCanvas
        className="card__scene scene--static"
        label={exhibit.alt}
        cameraPosition={[0, 0, slot === 'feature' ? 4.6 : 5.2]}
      >
        <ExhibitScene variant={exhibit.variant} color={exhibit.color} accent={exhibit.accent} />
      </SceneCanvas>

      <div className="card__body">
        <p className="label card__meta">
          <span>{exhibit.category}</span>
          <span aria-hidden="true">/</span>
          <span>{exhibit.year}</span>
        </p>
        <h3 className="card__title">
          <button
            type="button"
            className="card__open"
            aria-haspopup="dialog"
            onClick={() => onOpen(exhibit.id)}
          >
            {exhibit.title}
            <span className="sr-only">. Open exhibit details.</span>
          </button>
        </h3>
        <p className="card__summary">{exhibit.summary}</p>
        <span className="card__cta" aria-hidden="true">
          VIEW EXHIBIT <ArrowUpRight size={14} />
        </span>
      </div>
    </motion.article>
  );
}
