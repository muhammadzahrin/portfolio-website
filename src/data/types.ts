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
     * authored lying flat at about 9.5:1, e.g. 1140 x 120. Replaces the plain title.
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

export interface Highlight {
  _id: string;
  _type: 'highlight';
  title: string;
  event: string;
  role: string;
  whatILearnt: string;
  sourceNote: string;
  date: string;
}

export interface Education {
  _id: string;
  _type: 'education';
  qualification: string;
  institution: string;
  status: string;
  dates: string;
  note: string;
}

export interface SkillCategory {
  _id: string;
  categoryName: string;
  skills: string[];
}

export interface AboutContent {
  _id: string;
  _type: 'about';
  name: string;
  headline: string;
  bioParagraphs: string[];
  education: Education[];
  skillCategories: SkillCategory[];
  focusAreas: string[];
}
