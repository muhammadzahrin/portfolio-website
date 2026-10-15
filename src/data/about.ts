import { AboutContent } from './types';

export const aboutData: AboutContent = {
  _id: 'about-default',
  _type: 'about',
  name: 'Zahrin',
  headline: 'IT Student, Enterprise Intern, and Game Developer at Heart',
  bioParagraphs: [
    'I am an Information Technology student at Universiti Kuala Lumpur Malaysian Institute of Information Technology (UniKL MIIT), currently expanding my practical experience as an intern at SD Guthrie Berhad.',
    'Beyond software and IT infrastructure, I have a deep creative drive for game development—having created a 2D point-and-click horror game called "Expired" using Python and Pygame. I actively follow and seek to contribute to the thriving Malaysian games industry.',
    'As the Founder and President of UniKL MIIT’s Performing Arts Club, I believe in pairing technical rigor with human storytelling, expressive collaboration, and thoughtful interface design.',
  ],
  education: [
    {
      _id: 'edu-unikl-miit',
      _type: 'education',
      qualification: 'Diploma in Information Technology',
      institution: 'Universiti Kuala Lumpur Malaysian Institute of Information Technology (UniKL MIIT)',
      status: 'Current Student',
      dates: 'Expected Graduation: [Year Placeholder]',
      note: '[Placeholder: Core coursework including Software Engineering, Database Systems, Web Development, and Networks]',
    },
  ],
  skillCategories: [
    {
      _id: 'skill-cat-programming',
      categoryName: 'Programming & Web',
      skills: ['TypeScript', 'JavaScript', 'Python', 'React / Next.js', 'Tailwind CSS', 'HTML5 Canvas'],
    },
    {
      _id: 'skill-cat-gamedev',
      categoryName: 'Game Development',
      skills: ['Pygame', '2D Game Loops', 'Point-and-Click Mechanics', 'Game Prototyping', 'Level Design Basics'],
    },
    {
      _id: 'skill-cat-it-enterprise',
      categoryName: 'IT & Tools',
      skills: ['Git & GitHub', 'VS Code', 'Enterprise IT Support [Placeholder]', 'Technical Documentation'],
    },
    {
      _id: 'skill-cat-leadership',
      categoryName: 'Leadership & Creative',
      skills: ['Performing Arts Leadership', 'Event Production', 'Cross-team Communication', 'Creative Direction'],
    },
  ],
  focusAreas: [
    'Web & Interactive Application Architecture',
    'Malaysian Game Development & Indie Prototyping',
    'Enterprise Workflow Tools & UI Design',
  ],
};
