/**
 * Future CMS (Sanity) compatible document type definitions.
 * All data models follow Sanity's document shape with _id and _type.
 */

export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
  youtube: string;
}

export interface SiteConfig {
  _id: string;
  _type: 'siteConfig';
  name: string;
  roleTitle: string;
  tagline: string;
  shortBioIntro: string;
  contactEmail: string;
  socials: SocialLinks;
  navItems: NavItem[];
}

export interface WorkExperience {
  _id: string;
  _type: 'workExperience';
  role: string;
  organisation: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  /** Company logo for the Home page's "Currently" bubble (square, transparent). Without one, initials are shown. */
  logo?: string;
  bullets: string[];
  /**
   * TODO: confirm with supervisor before publishing.
   */
  supervisorApprovalNote: string;
}

export interface Project {
  _id: string;
  _type: 'project';
  title: string;
  slug: string;
  oneLineSummary: string;
  techTags: string[];
  year: string;
  category: 'personal' | 'work';
  /**
   * Generic placeholder description without internal details
   * TODO: confirm with supervisor before publishing.
   */
  placeholderDescription: string;
  supervisorApprovalNote?: string;
  featured: boolean;
  /** Shelf label: games get the black label, software gets the silver label. */
  kind: 'game' | 'software';
  /** Background colour of the spine's middle panel and the placeholder cover art. */
  spineColor: string;
  manual: ProjectManualInfo;
  /**
   * Optional image paths (relative to /public). Anything left out falls back
   * to the generated placeholder, so the shelf works before any art exists.
   */
  assets?: {
    /**
     * Custom spine art for the art panel (everything after the "Zahrin" label band),
     * authored lying flat at 1180 x 120 (see design/spine-art-template-explained.png). Replaces the plain title.
     */
    spineArt?: string;
    /**
     * Logo of who the project was made for, shown in a small square slot just
     * before the year (SVG, single-colour white reads best). Leave out for
     * personal projects: the slot stays empty so every title stays aligned.
     */
    clientLogo?: string;
    /** Manual cover, 4.5 x 7.125 ratio (e.g. 1000 x 1583). Also printed on the disc. */
    cover?: string;
    /** Short looping MP4 shown on the TV. */
    video?: string;
    /** Still frame shown on the TV while the video loads. */
    videoPoster?: string;
  };
}

export interface ProjectManualInfo {
  /** What the project was made for (purpose / brief). */
  madeFor: string;
  /** Organisation it was made under, or 'Personal project'. */
  madeUnder: string;
  /** My role, e.g. 'Sole developer'. */
  role: string;
  links: { label: string; href: string }[];
}

export type MemoryCategory = 'education' | 'hard-skill' | 'soft-skill' | 'event';

/** One "save" on the About page's memory grid. */
export interface Memory {
  _id: string;
  _type: 'memory';
  title: string;
  /** Second line under the name, e.g. dates or a skill group */
  subtitle: string;
  category: MemoryCategory;
  /** Year or full date for sorting, e.g. '2024' or '2024-03'. Undated memories sort last. */
  date?: string;
  /** 2D image of any shape, tilted in the grid and spinning when opened. Without one a generated tile is shown. */
  image?: string;
  facts?: { label: string; value: string }[];
  body: string[];
  /** Gallery shown when the memory is opened */
  photos?: string[];
}

export interface AboutContent {
  _id: string;
  _type: 'about';
  name: string;
  headline: string;
  bioParagraphs: string[];
  /** Square photo, e.g. 800 x 800. Without one a generated tile is shown. */
  portrait?: string;
}
