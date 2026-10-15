import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  _id: 'siteConfig-default',
  _type: 'siteConfig',
  name: 'Zahrin',
  roleTitle: 'Diploma in Information Technology Student & Software / Game Dev Enthusiast',
  tagline: 'Bridging practical IT solutions, creative storytelling, and game craft.',
  shortBioIntro:
    'Hi, I’m Zahrin. Currently pursuing my Diploma in Information Technology at UniKL MIIT, interning at SD Guthrie Berhad, and passionate about Malaysian game development.',
  contactEmail: 'zahrin.zamri@example.com', // Placeholder email
  socials: {
    email: 'mailto:zahrin.zamri@example.com',
    linkedin: 'https://linkedin.com/in/zahrin-zamri-placeholder',
    github: 'https://github.com/muhammadzahrin',
    youtube: 'https://youtube.com/@zahrin-placeholder',
  },
  navItems: [
    {
      label: 'Home',
      href: '/',
      description: 'Overview and table of contents',
    },
    {
      label: 'About',
      href: '/about',
      description: 'Bio, education, skills & LinkedIn highlights',
    },
    {
      label: 'Work Experience',
      href: '/experience',
      description: 'Professional timeline at SD Guthrie Berhad',
    },
    {
      label: 'Projects',
      href: '/projects',
      description: 'Software solutions and game projects',
    },
    {
      label: 'Contact',
      href: '/contact',
      description: 'Social links and message channel',
    },
  ],
};
