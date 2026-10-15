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
