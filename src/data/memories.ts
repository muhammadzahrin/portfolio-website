import { Memory, MemoryCategory } from './types';

const skill = (title: string, subtitle: string, category: MemoryCategory): Memory => ({
  _id: `memory-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  _type: 'memory',
  title,
  subtitle,
  category,
  body: ['[Placeholder: where I used this and what I made with it]'],
});

/**
 * The About page's memory grid. Add art under public/memories/ and point `image`
 * (and optionally `photos`) at it to replace a placeholder.
 */
export const memoriesData: Memory[] = [
  {
    _id: 'memory-unikl-miit',
    _type: 'memory',
    title: 'UniKL MIIT',
    subtitle: 'Diploma in Information Technology',
    category: 'education',
    facts: [
      { label: 'Institution', value: 'Universiti Kuala Lumpur Malaysian Institute of Information Technology' },
      { label: 'Status', value: 'Current student' },
      { label: 'Dates', value: 'Expected graduation: [Year placeholder]' },
    ],
    body: ['[Placeholder: Core coursework including Software Engineering, Database Systems, Web Development, and Networks]'],
  },

  ...['TypeScript', 'JavaScript', 'Python', 'React / Next.js', 'Tailwind CSS', 'HTML5 Canvas'].map((s) =>
    skill(s, 'Programming & Web', 'hard-skill')
  ),
  ...['Pygame', '2D Game Loops', 'Point-and-Click Mechanics', 'Game Prototyping', 'Level Design Basics'].map((s) =>
    skill(s, 'Game Development', 'hard-skill')
  ),
  ...['Git & GitHub', 'VS Code', 'Enterprise IT Support', 'Technical Documentation'].map((s) =>
    skill(s, 'IT & Tools', 'hard-skill')
  ),
  {
    ...skill('Claude', 'IT & Tools', 'hard-skill'),
    image: '/memories/claude.svg',
    body: Array.from(
      { length: 6 },
      (_, i) =>
        `[Placeholder paragraph ${i + 1}: long sample text to show how scrolling works. Replace this with where I used Claude and what I made with it. It only needs to be long enough to overflow the text box on a phone and on desktop.]`
    ),
  },

  ...['Performing Arts Leadership', 'Event Production', 'Cross-team Communication', 'Creative Direction'].map((s) =>
    skill(s, 'Leadership & Creative', 'soft-skill')
  ),

  {
    _id: 'memory-performing-arts-club',
    _type: 'memory',
    title: 'Founding the Performing Arts Club',
    subtitle: '2023 - 2024',
    category: 'event',
    facts: [
      { label: 'Event', value: 'UniKL MIIT Performing Arts Club Establishment & Campus Productions' },
      { label: 'My role', value: 'Founder & President' },
    ],
    body: ['[Placeholder: What I learnt regarding team coordination, creative direction, cross-department scheduling, and stakeholder communication]'],
  },
  {
    _id: 'memory-expired-game-dev',
    _type: 'memory',
    title: 'Building "Expired" with Pygame',
    subtitle: '2023',
    category: 'event',
    facts: [
      { label: 'Event', value: 'Game Jam / Indie Development Milestone' },
      { label: 'My role', value: 'Solo Developer & Designer' },
    ],
    body: ['[Placeholder: What I learnt regarding player experience, state machines, sound cues, and scoping technical scope within tight limits]'],
  },
  {
    _id: 'memory-malaysian-game-industry',
    _type: 'memory',
    title: 'Malaysian Game Industry Meetups',
    subtitle: '2024',
    category: 'event',
    facts: [
      { label: 'Event', value: 'Local Game Developers Community & Industry Insights' },
      { label: 'My role', value: 'Participant & Aspiring Game Developer' },
    ],
    body: ['[Placeholder: What I learnt regarding local gaming ecosystem growth, production pipelines, and independent studio challenges in Malaysia]'],
  },
];
