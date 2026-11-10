import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { timeline } from '../data/timeline';
import { Reveal, SplitWords } from './Reveal';

export function FutureTimeline() {
  const [active, setActive] = useState(0);
  const entry = timeline[active];

  return (
    <section id="timeline" className="section timeline" aria-labelledby="timeline-title">
      <div className="container">
        <p className="label label--cyan">SECTOR 04 / THE FUTURE TIMELINE</p>
        <SplitWords id="timeline-title" text="A SPECULATIVE HISTORY OF WHAT COMES NEXT" className="section-title" />
        <Reveal className="timeline__hint" delay={0.1}>
          <p>Select a milestone to read its story. All dates are fictional.</p>
        </Reveal>

        <ol className="tl">
          {timeline.map((item, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <motion.li
                key={item.year}
                className="tl__item"
                data-active={isActive}
                data-past={isPast}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {i < timeline.length - 1 && (
                  <span className="tl__seg" data-filled={i < active} aria-hidden="true">
                    <span className="tl__seg-fill" />
                  </span>
                )}
                <button
                  type="button"
                  className="tl__btn"
                  aria-pressed={isActive}
                  aria-controls="timeline-panel"
                  onClick={() => setActive(i)}
                >
                  <span className="tl__dot" aria-hidden="true" />
                  <span className="tl__year">{item.year}</span>
                  <span className="tl__title">{item.title}</span>
                </button>
              </motion.li>
            );
          })}
        </ol>

        <div id="timeline-panel" className="tl-panel" role="region" aria-live="polite" aria-label="Milestone details">
          <AnimatePresence mode="wait">
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="label label--cyan">
                {entry.year} <span aria-hidden="true">/</span> {entry.label}
              </p>
              <h3 className="tl-panel__title">{entry.title}</h3>
              <p className="tl-panel__text">{entry.description}</p>
              {entry.exhibit && (
                <p className="label tl-panel__ref">RELATED EXHIBIT: {entry.exhibit}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
