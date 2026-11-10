import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroScene } from './HeroScene';
import { SceneCanvas } from './SceneCanvas';
import { SplitWords } from './Reveal';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <SceneCanvas
        className="hero__scene scene--static"
        label="A slowly rotating holographic artifact surrounded by orbital rings and floating particles."
        cameraPosition={[0, 0, 6.4]}
        fov={42}
        eager
      >
        <HeroScene />
      </SceneCanvas>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__meta">
          <span className="label">EST. 2089</span>
          <span className="label label--status">
            <span className="status-dot" aria-hidden="true" />
            ARCHIVE STATUS: ONLINE
          </span>
        </div>

        <div className="hero__content">
          <motion.p
            className="label label--cyan"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Explore What Doesn&apos;t Exist. Yet.
          </motion.p>

          <SplitWords as="h1" id="hero-title" text="MUSEUM OF TOMORROW" className="hero__title" immediate delay={0.2} />

          <div className="hero__row">
            <motion.p
              className="hero__lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
            >
              A living archive of tomorrow&apos;s inventions, impossible ideas, and technologies waiting to be imagined.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
            >
              <a href="#exhibits" className="btn btn--primary">
                ENTER THE MUSEUM <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#exhibits" className="btn btn--ghost">
                EXPLORE EXHIBITS
              </a>
            </motion.div>
          </div>
        </div>

        <a href="#manifesto" className="scroll-cue" aria-label="Scroll to the manifesto">
          <span className="label">SCROLL</span>
          <span className="scroll-cue__line" aria-hidden="true" />
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
