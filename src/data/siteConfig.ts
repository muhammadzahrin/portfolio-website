import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  _id: 'siteConfig-default',
  _type: 'siteConfig',
  name: 'Zahrin',
  roleTitle: 'Diploma in Information Technology Student & Software / Game Dev Enthusiast',
  tagline: 'Making software and games!',
  shortBioIntro:
    'Hi, I’m Zahrin. Currently pursuing my Diploma in Information Technology at UniKL MIIT, interning at SD Guthrie Berhad, and passionate about Malaysian game development.',
  contactEmail: 'zahrin.contact@gmail.com',
  socials: {
    email: 'mailto:zahrin.contact@gmail.com',
    linkedin: 'https://www.linkedin.com/in/muhammad-zahrin-124a452ba/',
    github: 'https://github.com/muhammadzahrin',
    youtube: 'https://www.youtube.com/@spongebear',
    itch: 'https://spongebear.itch.io/',
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
      label: 'Experience',
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
