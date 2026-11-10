export type ExhibitFilter = 'technology' | 'energy' | 'space' | 'biology';
export type ExhibitVariant = 'orb' | 'core' | 'drone' | 'neural' | 'eden' | 'quantum';

export interface Exhibit {
  id: string;
  number: string;
  title: string;
  category: string;
  filter: ExhibitFilter;
  year: number;
  summary: string;
  concept: string;
  features: string[];
  variant: ExhibitVariant;
  color: string;
  accent: string;
  alt: string;
}

export const FILTERS: { id: 'all' | ExhibitFilter; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'technology', label: 'TECHNOLOGY' },
  { id: 'energy', label: 'ENERGY' },
  { id: 'space', label: 'SPACE' },
  { id: 'biology', label: 'BIOLOGY' },
];

export const exhibits: Exhibit[] = [
  {
    id: 'memory-orb',
    number: '01',
    title: 'ORB-01: MEMORY ORB',
    category: 'Neural Technology',
    filter: 'technology',
    year: 2089,
    summary: 'A conceptual device that stores and replays selected memories through a neural interface.',
    concept:
      'The Memory Orb imagines a handheld object that lets a person choose which moments to keep, and replay them with gentle, consent-first control. In this speculative future, the orb is less a recorder than a curator: it helps people revisit what matters, and lets the rest fade.',
    features: [
      'Selective capture guided by the wearer, never by default',
      'Replay through a non-invasive neural interface',
      'Memories are sealed with a personal key that never leaves the orb',
      'A slow-fade mode that lets chosen memories soften over time',
    ],
    variant: 'orb',
    color: '#67F7FF',
    accent: '#A58BFF',
    alt: 'A glowing crystalline orb with a bright core and a thin orbital ring.',
  },
  {
    id: 'helios-core',
    number: '02',
    title: 'HELIOS CORE',
    category: 'Clean Energy',
    filter: 'energy',
    year: 2096,
    summary: 'A speculative compact energy system designed to power entire cities with minimal environmental impact.',
    concept:
      'Helios Core is an imagined district-scale power source: a luminous sphere held in the middle of gyroscopic rings. The concept explores what cities could look like if clean power were compact, quiet and shared, with generation woven into neighborhoods rather than hidden far away.',
    features: [
      'Compact enough to sit at the heart of a city district',
      'Imagined near-zero emissions across its whole life cycle',
      'Gyroscopic containment rings that double as heat exchangers',
      'Power shared across a neighborhood grid, not a single owner',
    ],
    variant: 'core',
    color: '#67F7FF',
    accent: '#F3F7FF',
    alt: 'A bright energy core suspended inside three tilted metallic rings.',
  },
  {
    id: 'aether-7',
    number: '03',
    title: 'AETHER-7',
    category: 'Space Exploration',
    filter: 'space',
    year: 2104,
    summary: 'An autonomous exploration drone designed to navigate distant planetary environments.',
    concept:
      'Aether-7 is a concept for a patient, self-reliant explorer. Sent ahead of people, it would map unfamiliar terrain, read the atmosphere and decide for itself where to look next when no signal can reach home.',
    features: [
      'Four-rotor flight tuned for thin and unusual atmospheres',
      'Onboard navigation that works without a live link to Earth',
      'A downward scan beam that builds terrain maps as it flies',
      'Designed to log findings for later human review',
    ],
    variant: 'drone',
    color: '#526BFF',
    accent: '#67F7FF',
    alt: 'A small metallic four-rotor drone with a glowing sensor and a scan beam below it.',
  },
  {
    id: 'synthesis',
    number: '04',
    title: 'SYNTHESIS',
    category: 'Artificial Intelligence',
    filter: 'technology',
    year: 2092,
    summary: 'An experimental AI system that collaborates with humans to create adaptive works of art, music, and architecture.',
    concept:
      'Synthesis imagines an AI that works beside people as a creative partner. It listens, proposes and adapts, helping a musician, painter or architect explore directions they might never have found alone, while the human stays the author.',
    features: [
      'Co-creates music, visual art and architectural form',
      'Adapts to the style and intent of each collaborator',
      'Shows its reasoning so people can steer or reject it',
      'Credits every human contribution in the finished work',
    ],
    variant: 'neural',
    color: '#A58BFF',
    accent: '#67F7FF',
    alt: 'A sculpture of glowing nodes joined by fine lines, shaped like a neural network.',
  },
  {
    id: 'eden-protocol',
    number: '05',
    title: 'EDEN PROTOCOL',
    category: 'Bioengineering',
    filter: 'biology',
    year: 2110,
    summary: 'A speculative ecological system designed to restore damaged ecosystems and support biodiversity.',
    concept:
      'The Eden Protocol is shown as a living specimen under glass: a seed of restoration that could help damaged land recover. It is a thought experiment about healing ecosystems with care, patience and respect for the life already there.',
    features: [
      'Imagined to support native species rather than replace them',
      'Bioluminescent markers show where recovery is taking hold',
      'Works at the pace of the ecosystem, not the pace of machines',
      'Built to be monitored openly by the communities nearby',
    ],
    variant: 'eden',
    color: '#5CFFB1',
    accent: '#67F7FF',
    alt: 'A glass dome holding a glowing living specimen with luminous stalks.',
  },
  {
    id: 'chronos-archive',
    number: '06',
    title: 'CHRONOS ARCHIVE',
    category: 'Quantum Computing',
    filter: 'technology',
    year: 2120,
    summary: 'A conceptual computational archive designed to explore new approaches to scientific simulation and knowledge preservation.',
    concept:
      'Chronos Archive pictures a quantum-inspired library where knowledge is stored as something that can be simulated, not just read. It asks how future science might preserve what we know and test what we have not yet imagined.',
    features: [
      'Nested lattice structure that suggests layers of stored knowledge',
      'Imagined to run large scientific simulations on demand',
      'Preserves methods and context along with results',
      'Designed to stay readable across generations',
    ],
    variant: 'quantum',
    color: '#526BFF',
    accent: '#A58BFF',
    alt: 'Nested glowing cubes joined by fine lines, with small orbiting points.',
  },
];
