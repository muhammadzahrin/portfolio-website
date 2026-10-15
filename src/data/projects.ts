import { Project } from './types';

/**
 * Projects data shaped for future CMS integration.
 * Descriptions are generic placeholders with supervisor TODO comments.
 */
export const projectsData: Project[] = [
  {
    _id: 'proj-shuttle-tracker',
    _type: 'project',
    title: 'Shuttle Tracker',
    slug: 'shuttle-tracker',
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
