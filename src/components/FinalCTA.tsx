import { ArrowUp } from 'lucide-react';
import { CtaScene } from './CtaScene';
import { Reveal, SplitWords } from './Reveal';
import { SceneCanvas } from './SceneCanvas';

export function FinalCTA() {
  return (
    <section id="cta" className="section cta" aria-labelledby="cta-title">
      <SceneCanvas
        className="cta__scene scene--static"
        label="A slowly rotating abstract knot of light, floating among particles."
        cameraPosition={[0, 0, 6]}
        fov={42}
      >
        <CtaScene />
      </SceneCanvas>
      <div className="cta__shade" aria-hidden="true" />

      <div className="container cta__inner">
        <p className="label label--violet">SECTOR 07 / THE EXIT IS ALSO AN ENTRANCE</p>
        <SplitWords id="cta-title" text="YOUR FUTURE STARTS WITH A QUESTION." className="cta__title" accentLast={2} />
        <Reveal delay={0.2}>
          <a href="#exhibits" className="btn btn--primary">
            REVISIT THE ARCHIVE <ArrowUp size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
