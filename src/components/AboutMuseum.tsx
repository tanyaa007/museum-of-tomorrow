import { exhibits } from '../data/exhibits';
import { futureIdeas } from '../data/futureIdeas';
import { timeline } from '../data/timeline';
import { CountUp } from './CountUp';
import { Reveal, SplitWords } from './Reveal';

export function AboutMuseum() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__copy">
          <p className="label label--cyan">SECTOR 06 / ABOUT THE MUSEUM</p>
          <SplitWords id="about-title" text="WE EXHIBIT POSSIBILITIES." className="section-title" />

          <Reveal delay={0.1}>
            <p className="about__lede">
              The Museum of Tomorrow is a fictional digital institution exploring the intersection of technology,
              science, design, and human imagination. Nothing here exists yet, and that is the point.
            </p>
          </Reveal>

          <div className="about__cols">
            <Reveal delay={0.15}>
              <h3 className="label">OUR MISSION</h3>
              <p>
                To make the future easier to talk about. We turn speculative ideas into objects people can look at,
                question and argue with.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <h3 className="label">OUR APPROACH</h3>
              <p>
                We pair careful imagination with clear labels. Every exhibit is marked as speculative, so wonder never
                gets mistaken for a claim.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="archive" delay={0.2}>
          <div className="archive__panel" role="group" aria-label="Archive index">
            <div className="archive__rings" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <p className="label label--cyan">ARCHIVE INDEX / SPECULATIVE</p>

            <ul className="archive__list">
              {exhibits.map((e) => (
                <li key={e.id}>
                  <span className="archive__n">{e.number}</span>
                  <span className="archive__t">{e.title}</span>
                  <span className="archive__y">{e.year}</span>
                </li>
              ))}
            </ul>

            <dl className="stats">
              <div>
                <dt className="label">SPECULATIVE EXHIBITS</dt>
                <dd>
                  <CountUp to={exhibits.length} />
                </dd>
              </div>
              <div>
                <dt className="label">LAB CONCEPTS</dt>
                <dd>
                  <CountUp to={futureIdeas.length} />
                </dd>
              </div>
              <div>
                <dt className="label">MILESTONES</dt>
                <dd>
                  <CountUp to={timeline.length} />
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
