import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { futureIdeas, type FutureIdea } from '../data/futureIdeas';
import { Reveal, SplitWords } from './Reveal';

function shuffled(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

type CopyState = 'idle' | 'copied' | 'failed';

export function FutureLab() {
  const [idea, setIdea] = useState<FutureIdea | null>(null);
  const [count, setCount] = useState(0);
  const [copy, setCopy] = useState<CopyState>('idle');
  const bag = useRef<number[]>([]);
  const lastIndex = useRef(-1);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const generate = () => {
    if (bag.current.length === 0) {
      const next = shuffled(futureIdeas.length);
      // Never repeat the idea that was just shown when the bag refills.
      if (next[next.length - 1] === lastIndex.current && next.length > 1) {
        [next[0], next[next.length - 1]] = [next[next.length - 1], next[0]];
      }
      bag.current = next;
    }
    const index = bag.current.pop() as number;
    lastIndex.current = index;
    setIdea(futureIdeas[index]);
    setCount((c) => c + 1);
    setCopy('idle');
  };

  const handleCopy = async () => {
    if (!idea) return;
    const text = `${idea.name} (${idea.category})\n${idea.description}\n${idea.whatIf}`;
    const ok = await copyText(text);
    setCopy(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopy('idle'), 2200);
  };

  return (
    <section id="lab" className="section lab" aria-labelledby="lab-title">
      <div className="lab__floor" aria-hidden="true" />
      <div className="lab__glow" aria-hidden="true" />

      <div className="container lab__inner">
        <p className="label label--violet">SECTOR 05 / THE FUTURE LAB</p>
        <SplitWords id="lab-title" text="THE FUTURE IS STILL UNWRITTEN." className="lab__title" />
        <Reveal delay={0.1}>
          <p className="lab__lede">Every invention begins as a question. Start with yours.</p>
        </Reveal>

        <Reveal delay={0.2} className="lab__actions">
          <button type="button" className="btn btn--primary" onClick={generate}>
            <Sparkles size={16} aria-hidden="true" /> GENERATE AN IDEA
          </button>
          <p className="label lab__count">{futureIdeas.length} CONCEPTS IN THE ARCHIVE</p>
        </Reveal>

        <div className="idea" aria-live="polite">
          <AnimatePresence mode="wait">
            {idea ? (
              <motion.article
                key={`${idea.id}-${count}`}
                className="idea__card"
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <p className="label label--violet">
                  CONCEPT {String(count).padStart(2, '0')} <span aria-hidden="true">/</span> {idea.category}
                </p>
                <h3 className="idea__name">{idea.name}</h3>
                <p className="idea__desc">{idea.description}</p>
                <p className="idea__whatif">
                  <span className="label label--cyan">WHAT IF?</span> {idea.whatIf}
                </p>
                <div className="idea__foot">
                  <button
                    type="button"
                    className="btn btn--ghost btn--small"
                    onClick={handleCopy}
                    aria-label={copy === 'copied' ? 'Idea copied to clipboard' : copy === 'failed' ? 'Copy failed' : 'Copy idea to clipboard'}
                  >
                    {copy === 'copied' ? (
                      <Check size={14} aria-hidden="true" />
                    ) : (
                      <Copy size={14} aria-hidden="true" />
                    )}
                    {copy === 'copied' ? 'COPIED TO CLIPBOARD' : copy === 'failed' ? 'COPY UNAVAILABLE' : 'COPY IDEA'}
                  </button>
                </div>
              </motion.article>
            ) : (
              <motion.p
                key="empty"
                className="idea__empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Press the button to draw a concept from the archive.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
