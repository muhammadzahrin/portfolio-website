import { Project } from './types';

/**
 * Projects data shaped for future CMS integration.
 * Descriptions are generic placeholders with supervisor TODO comments.
 * Add art under public/projects/<slug>/ and point `assets` at it to replace a placeholder.
 */
export const projectsData: Project[] = [
  {
    _id: 'proj-shuttle-tracker',
    _type: 'project',
    title: 'Shuttle Tracker',
    slug: 'shuttle-tracker',
    kind: 'software',
    spineColor: '#1d4e89',
    manual: {
      madeFor: '[Placeholder: what problem it solved / who it was for]',
      madeUnder: 'SD Guthrie Berhad (internship)',
      role: '[Placeholder: e.g. Sole developer]',
      links: [{ label: '[Placeholder link]', href: '#' }],
    },
    oneLineSummary: '[One line about this project: Transit tracking utility for campus/facility routes]',
    techTags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Maps API'],
    year: '2024',
    category: 'work',
    // TODO: confirm with supervisor before publishing.
    placeholderDescription:
      '[Placeholder: Overview of Shuttle Tracker architecture, routing logic, and general user interface. No confidential internal metrics.]',
    supervisorApprovalNote: 'TODO: confirm with supervisor before publishing.',
    featured: true,
  },
  {
    _id: 'proj-millgpt',
    _type: 'project',
    title: 'MillGPT',
    slug: 'millgpt',
    kind: 'software',
    spineColor: '#0f5257',
    manual: {
      madeFor: '[Placeholder: what problem it solved / who it was for]',
      madeUnder: 'SD Guthrie Berhad (internship)',
      role: '[Placeholder: e.g. Sole developer]',
      links: [{ label: '[Placeholder link]', href: '#' }],
    },
    oneLineSummary: '[One line about this project: AI-assisted documentation & knowledge lookup assistant]',
    techTags: ['Python', 'LLM API', 'React', 'FastAPI'],
    year: '2024',
    category: 'work',
    // TODO: confirm with supervisor before publishing.
    placeholderDescription:
      '[Placeholder: High-level overview of MillGPT conversational lookup system without disclosing proprietary company data or operational models.]',
    supervisorApprovalNote: 'TODO: confirm with supervisor before publishing.',
    featured: true,
  },
  {
    _id: 'proj-workload-tracker',
    _type: 'project',
    title: 'Workload Tracker',
    slug: 'workload-tracker',
    kind: 'software',
    spineColor: '#4a2c6d',
    manual: {
      madeFor: '[Placeholder: what problem it solved / who it was for]',
      madeUnder: 'SD Guthrie Berhad (internship)',
      role: '[Placeholder: e.g. Sole developer]',
      links: [{ label: '[Placeholder link]', href: '#' }],
    },
    oneLineSummary: '[One line about this project: Task and resource allocation dashboard for team workflows]',
    techTags: ['React', 'TypeScript', 'Node.js', 'CSS Modules'],
    year: '2024',
    category: 'work',
    // TODO: confirm with supervisor before publishing.
    placeholderDescription:
      '[Placeholder: Summary of workload tracking features, progress metrics visualization, and task assignment views.]',
    supervisorApprovalNote: 'TODO: confirm with supervisor before publishing.',
    featured: false,
  },
  {
    _id: 'proj-expired',
    _type: 'project',
    title: 'Expired',
    slug: 'expired',
    kind: 'game',
    spineColor: '#6b1d1d',
    manual: {
      madeFor: '[Placeholder: e.g. class assignment, game jam, or just for fun]',
      madeUnder: 'Personal project',
      role: '[Placeholder: e.g. Sole developer]',
      links: [{ label: '[Placeholder link]', href: '#' }],
    },
    oneLineSummary: '[One line about this project: 2D point-and-click horror game created in Python & Pygame]',
    techTags: ['Python', 'Pygame', 'Game Design', '2D Art'],
    year: '2023',
    category: 'personal',
    // TODO: confirm with supervisor before publishing.
    placeholderDescription:
      '[Placeholder: Overview of game mechanics, atmospheric sound design, inventory puzzle loops, and narrative pacing in Expired.]',
    supervisorApprovalNote: 'TODO: confirm with supervisor before publishing.',
    featured: true,
  },
  {
    _id: 'proj-js-canvas-game',
    _type: 'project',
    title: 'JavaScript Canvas Game',
    slug: 'javascript-canvas-game',
    kind: 'game',
    spineColor: '#7a4a0c',
    manual: {
      madeFor: '[Placeholder: e.g. class assignment, game jam, or just for fun]',
      madeUnder: 'Personal project',
      role: '[Placeholder: e.g. Sole developer]',
      links: [{ label: '[Placeholder link]', href: '#' }],
    },
    oneLineSummary: '[One line about this project: Interactive 2D arcade prototype built using HTML5 Canvas]',
    techTags: ['JavaScript', 'HTML5 Canvas', 'Physics Loop', 'CSS'],
    year: '2023',
    category: 'personal',
    // TODO: confirm with supervisor before publishing.
    placeholderDescription:
      '[Placeholder: Description of collision detection algorithms, render loop optimization, and responsive sprite controls.]',
    supervisorApprovalNote: 'TODO: confirm with supervisor before publishing.',
    featured: false,
  },
];
