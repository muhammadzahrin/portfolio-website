import { WorkExperience } from './types';

/**
 * Work experience timeline data.
 * All entries follow future Sanity CMS document structure.
 */
export const workExperiences: WorkExperience[] = [
  {
    _id: 'exp-sd-guthrie-berhad',
    _type: 'workExperience',
    role: 'IT Intern',
    organisation: 'SD Guthrie Berhad',
    location: 'Malaysia',
    startDate: '2024',
    endDate: 'Present',
    isCurrent: true,
    bullets: [
      // TODO: confirm with supervisor before publishing.
      '[Placeholder: Brief bullet describing general IT support and development tasks]',
      // TODO: confirm with supervisor before publishing.
      '[Placeholder: Brief bullet describing collaboration with enterprise systems team]',
      // TODO: confirm with supervisor before publishing.
      '[Placeholder: Brief bullet describing tool maintenance and technical documentation]',
    ],
    // TODO: confirm with supervisor before publishing.
    supervisorApprovalNote: 'TODO: confirm with supervisor before publishing.',
  },
];
