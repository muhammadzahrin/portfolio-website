import { WorkExperience } from './types';

/**
 * Work and leadership roles, newest first, from Zahrin's master CV.
 * All entries follow future Sanity CMS document structure.
 * At most 3 paragraphs each, of similar length, so an entry fits one screen without scrolling.
 */
export const workExperiences: WorkExperience[] = [
  {
    _id: 'exp-sd-guthrie-berhad',
    _type: 'workExperience',
    kind: 'work',
    role: 'Software Engineering Intern',
    organisation: 'SD Guthrie Berhad',
    location: 'Petaling Jaya',
    startDate: '2026-08',
    endDate: '2026-12',
    isCurrent: true,
    bullets: [
      'Researched Azure AI Foundry and Azure AI Search to replace [MillGPT](/projects?open=proj-millgpt), used across 30+ mills; the findings led to an Azure RAG chatbot, now with the data team.',
      'Designing a [workload tracker](/projects?open=proj-workload-tracker) web app for a 5-person software engineering team to plan monthly capacity in mandays (Next.js, Node.js, Azure, Entra ID).',
      'Developing a live [shuttle tracker](/projects?open=proj-shuttle-tracker) for an employee van service used by around 80 staff daily (React Native/Expo, TypeScript, Node.js, Postgres).',
    ],
    // Placeholder captions until there are real photos
    gallery: [{ caption: 'MillGPT research' }, { caption: 'Workload tracker' }, { caption: 'Shuttle tracker' }],
  },
  {
    _id: 'exp-performing-arts-club',
    _type: 'workExperience',
    kind: 'leadership',
    role: 'President & Founder',
    organisation: 'Performing Arts Club',
    location: 'UniKL MIIT, Kuala Lumpur',
    startDate: '2026-01',
    endDate: '2026-12',
    isCurrent: true,
    bullets: [
      'Founded and grew a campus club from 0 to 280+ members across 7 divisions, leading a 9-person executive committee to run its day-to-day operations.',
      'Coordinated talent logistics and performance schedules for major university events, with crowds ranging from 200 to over 1,900 attendees.',
      'Secured funding and venue approvals from UniKL management through formal proposals, and managed the budget for professional coaching fees.',
    ],
    gallery: [{ caption: 'Campus performance' }, { caption: 'Executive committee' }, { caption: 'Rehearsals' }],
  },
  {
    _id: 'exp-fishpond-restoration',
    _type: 'workExperience',
    kind: 'leadership',
    role: 'Project Manager',
    organisation: 'Fishpond Restoration Project',
    location: 'UniKL MIIT, Kuala Lumpur',
    // Month not certain (Zahrin, 2026-11-26)
    startDate: '2025-05',
    endDate: '2025-05',
    isCurrent: false,
    bullets: [
      'Led a team of 25 classmates in executing a community service project for 50+ lower form student participants, from concept to completion.',
      'Demonstrated negotiation, coordination, and team leadership skills while trusting team members to deliver on their responsibilities.',
      'Achieved 100% participant satisfaction and received recognition from the school administration for the project.',
    ],
    gallery: [{ caption: 'Before the clean-up' }, { caption: 'Restoration day' }, { caption: 'The finished pond' }],
  },
  {
    _id: 'exp-asis-tv',
    _type: 'workExperience',
    kind: 'leadership',
    role: 'Head Video Editor',
    organisation: 'ASiS TV',
    location: 'SM Sains Alam Shah, Kuala Lumpur',
    startDate: '2022',
    endDate: '2024',
    isCurrent: false,
    bullets: [
      "Produced 30+ video projects for the school's YouTube channel, overseeing content creation and editing with 100% on-time delivery.",
      'Directed and edited a short film that won the First Place Gold Award and 3 Special Awards at International Creative Creators Playground 2023.',
      'Managed the end-to-end production workflow, from planning to the final edit, and coordinated a team of 5 to 10 members.',
    ],
    gallery: [{ caption: 'Award-winning short film' }, { caption: 'Behind the scenes' }, { caption: 'Editing' }],
  },
];
