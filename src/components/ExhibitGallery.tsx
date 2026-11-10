import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { exhibits, FILTERS, type ExhibitFilter } from '../data/exhibits';
import { ExhibitCard, type CardSlot } from './ExhibitCard';
import { ExhibitModal } from './ExhibitModal';
import { Reveal, SplitWords } from './Reveal';

const SLOTS: CardSlot[] = ['feature', 'a', 'b', 'c', 'd', 'e'];

function slotFor(index: number, total: number): CardSlot {
  if (total === 1) return 'solo';
  if (total === 2) return 'half';
  return SLOTS[index] ?? 'e';
}

export function ExhibitGallery() {
  const [filter, setFilter] = useState<'all' | ExhibitFilter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? exhibits : exhibits.filter((e) => e.filter === filter)),
    [filter],
  );

  const openIndex = openId ? visible.findIndex((e) => e.id === openId) : -1;
  const openExhibit = openIndex >= 0 ? visible[openIndex] : null;

  const go = (delta: number) => {
    if (openIndex < 0) return;
    const next = (openIndex + delta + visible.length) % visible.length;
    setOpenId(visible[next].id);
  };

  const countFor = (id: 'all' | ExhibitFilter) =>
    id === 'all' ? exhibits.length : exhibits.filter((e) => e.filter === id).length;

  return (
    <section id="exhibits" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery__head">
          <div>
            <p className="label label--cyan">SECTOR 03 / THE COLLECTION</p>
            <SplitWords id="gallery-title" text="SIX EXHIBITS FROM TOMORROW" className="section-title" />
          </div>
          <Reveal className="gallery__intro" delay={0.1}>
            <p>
              Every object here is fictional. Each is a speculative concept, imagined to start a conversation about
              what we might build, and why.
            </p>
          </Reveal>
        </div>

        <div className="filters" role="group" aria-label="Filter exhibits by category">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              <span>{f.label}</span>
              <span className="chip__count" aria-hidden="true">
                {String(countFor(f.id)).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {exhibits.length} exhibits.
        </p>

        <motion.ul layout className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((exhibit, i) => (
              <motion.li
                key={exhibit.id}
                layout
                className={`slot slot--${slotFor(i, visible.length)}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <ExhibitCard exhibit={exhibit} slot={slotFor(i, visible.length)} onOpen={setOpenId} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {openExhibit && (
          <ExhibitModal
            key="exhibit-modal"
            exhibit={openExhibit}
            index={openIndex}
            total={visible.length}
            prevTitle={visible[(openIndex - 1 + visible.length) % visible.length].title}
            nextTitle={visible[(openIndex + 1) % visible.length].title}
            onClose={() => setOpenId(null)}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
