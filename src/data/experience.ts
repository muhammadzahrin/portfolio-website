import { WorkExperience } from './types';

/**
 * Work and leadership roles, newest first, from Zahrin's master CV.
 * All entries follow future Sanity CMS document structure.
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
      'Researched Azure AI Foundry and Azure AI Search as a replacement for [MillGPT](/projects?open=proj-millgpt), a Copilot Studio assistant used across 30+ mills; compared 4 approaches by capability and cost, and the findings led to an Azure-based RAG chatbot for the board, now handed over to the data team.',
      'Built a Python RAG prototype (Gemini API, ChromaDB) over 8 mill SOPs to test retrieval accuracy before the Azure build.',
      'Designing a [workload tracker](/projects?open=proj-workload-tracker) web app for a 5-person software engineering team (Next.js, Node.js, Azure, Entra ID) to plan monthly capacity in mandays.',
      'Developing a live [shuttle tracker](/projects?open=proj-shuttle-tracker) for an employee van service used by around 80 staff daily (React Native/Expo, TypeScript, Node.js, Postgres).',
      'Revised the approval memo for Apple and Google developer accounts so the company can publish several internal apps for estate staff, working with Legal, Compliance and Group IT.',
    ],
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
      'Founded and scaled a campus organization from 0 to 280+ members across 7 divisions, leading a 9-person executive committee to streamline administrative operations.',
      'Established a multi-channel social media presence and enforced strict brand style guides across all digital assets to maintain a cohesive visual identity.',
      'Coordinated talent logistics and performance scheduling for multiple high-profile university events, managing crowds ranging from 200 to over 1,900+ attendees.',
      'Secured funding and venue approvals from UniKL management by defending formal proposals and managing budget allocations for professional coaching fees.',
    ],
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
      'Achieved 100% participant satisfaction and received recognition from school administration.',
    ],
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
      "Produced 30+ video projects for school's YouTube channel, overseeing content creation and editing with 100% on-time delivery.",
      'Directed and edited an award-winning short film securing First Place Gold Award and 3 Special Awards for International Creative Creators Playground 2023.',
      'Managed end-to-end production workflow and team coordination for a team of 5-10 members.',
    ],
  },
];
