import { Reveal, SplitWords } from './Reveal';

const PRINCIPLES = [
  { n: '01', title: 'IMAGINE BEYOND LIMITS', text: 'Start where today’s rules stop. Every breakthrough was once an impossible sketch.' },
  { n: '02', title: 'QUESTION THE PRESENT', text: 'What we accept as normal was designed by someone. It can be redesigned.' },
  { n: '03', title: 'DESIGN WHAT COMES NEXT', text: 'Ideas matter most when they are shaped, tested and shared with care.' },
];

export function Manifesto() {
  return (
    <section id="manifesto" className="section manifesto" aria-labelledby="manifesto-title">
      <div className="container">
        <div className="annotation">
          <span className="label">SECTOR 02 / THE MANIFESTO</span>
          <span className="annotation__line" aria-hidden="true" />
          <span className="label">REF. MOT-M-001</span>
        </div>

        <SplitWords
          id="manifesto-title"
          text="THE FUTURE IS NOT A DESTINATION. IT IS A DESIGN CHOICE."
          className="manifesto__title"
          accentLast={3}
        />

        <Reveal delay={0.1} className="manifesto__lede">
          <p>
            We collect possibilities, question assumptions, and imagine the technologies that could redefine how
            humanity lives, creates, explores, and survives.
          </p>
        </Reveal>

        <ul className="principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.n}>
              <Reveal delay={i * 0.12} className="principle">
                <span className="principle__n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
