export interface TimelineEntry {
  year: number;
  title: string;
  label: string;
  description: string;
  exhibit?: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: 2089,
    title: 'Memory Interfaces',
    label: 'Neural Technology',
    description:
      'In this imagined future, the first consent-first memory interfaces arrive. They help people keep, revisit and gently release their own memories, and they spark a public conversation about who owns an experience.',
    exhibit: 'ORB-01: MEMORY ORB',
  },
  {
    year: 2096,
    title: 'Distributed Clean Energy',
    label: 'Clean Energy',
    description:
      'Compact, shared power systems begin to anchor whole districts. Cities are imagined as generators of clean energy rather than only consumers of it.',
    exhibit: 'HELIOS CORE',
  },
  {
    year: 2104,
    title: 'Autonomous Planetary Exploration',
    label: 'Space Exploration',
    description:
      'Self-reliant explorers travel ahead of people to distant worlds, mapping terrain and reading atmospheres without waiting for instructions from home.',
    exhibit: 'AETHER-7',
  },
  {
    year: 2110,
    title: 'Ecological Restoration Systems',
    label: 'Bioengineering',
    description:
      'Restoration becomes a design discipline. Speculative living systems help damaged ecosystems recover, guided by local communities and long-term care.',
    exhibit: 'EDEN PROTOCOL',
  },
  {
    year: 2120,
    title: 'Quantum Knowledge Archives',
    label: 'Quantum Computing',
    description:
      'Archives that can be simulated, not just read, preserve scientific knowledge along with the methods behind it, and let future researchers test new questions against the past.',
    exhibit: 'CHRONOS ARCHIVE',
  },
  {
    year: 2150,
    title: 'The Interplanetary Era',
    label: 'Civilization',
    description:
      'Humanity becomes a multi-world civilization in this far-future vision. The questions that started in the museum, about memory, energy, exploration and care, now travel with us beyond Earth.',
  },
];
