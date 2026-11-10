import { AnimatePresence, motion, type MotionStyle } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Exhibit } from '../data/exhibits';
import { ExhibitScene } from './ExhibitScene';
import { SceneCanvas } from './SceneCanvas';

interface Props {
  exhibit: Exhibit;
  index: number;
  total: number;
  prevTitle: string;
  nextTitle: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ExhibitModal({ exhibit, index, total, prevTitle, nextTitle, onClose, onPrev, onNext }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const handlers = useRef({ onClose, onPrev, onNext });
  handlers.current = { onClose, onPrev, onNext };

  // Lock the page behind the dialog, move focus in, and put it back afterwards.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = document.getElementById('root');
    root?.setAttribute('inert', '');
    root?.setAttribute('aria-hidden', 'true');

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    closeRef.current?.focus();

    return () => {
      root?.removeAttribute('inert');
      root?.removeAttribute('aria-hidden');
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      previous?.focus?.();
    };
  }, []);

  // Keyboard: Escape closes, arrows navigate, Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handlers.current.onClose();
      } else if (e.key === 'ArrowLeft') {
        handlers.current.onPrev();
      } else if (e.key === 'ArrowRight') {
        handlers.current.onNext();
      } else if (e.key === 'Tab' && dialogRef.current) {
        const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const style = { '--accent': exhibit.color } as MotionStyle;

  return createPortal(
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${exhibit.id}`}
        aria-describedby={`modal-desc-${exhibit.id}`}
        tabIndex={-1}
        className="modal"
        style={style}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="modal__stage">
          <SceneCanvas eager className="modal__scene" label={exhibit.alt} cameraPosition={[0, 0, 5]}>
            <ExhibitScene variant={exhibit.variant} color={exhibit.color} accent={exhibit.accent} interactive />
          </SceneCanvas>
          <span className="modal__number" aria-hidden="true">
            {exhibit.number}
          </span>
          <span className="label modal__hint">DRAG TO ROTATE</span>
        </div>

        <div className="modal__panel">
          <button ref={closeRef} type="button" className="icon-btn modal__close" aria-label="Close exhibit" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={exhibit.id}
              className="modal__content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="label label--accent">
                {exhibit.category} <span aria-hidden="true">/</span> {exhibit.year}
              </p>
              <h2 id={`modal-title-${exhibit.id}`} className="modal__title">
                {exhibit.title}
              </h2>
              <p id={`modal-desc-${exhibit.id}`} className="modal__desc">
                {exhibit.concept}
              </p>

              <h3 className="label modal__subhead">KEY SPECULATIVE FEATURES</h3>
              <ul className="feature-list">
                {exhibit.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <p className="note">A fictional, speculative concept. It is not a claim about any existing technology.</p>
            </motion.div>
          </AnimatePresence>

          <div className="modal__nav">
            <button type="button" className="nav-btn" onClick={onPrev} aria-label={`Previous exhibit: ${prevTitle}`}>
              <ChevronLeft size={18} aria-hidden="true" />
              <span>PREV</span>
            </button>
            <p className="label" aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button type="button" className="nav-btn" onClick={onNext} aria-label={`Next exhibit: ${nextTitle}`}>
              <span>NEXT</span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
