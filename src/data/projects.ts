export interface Project {
  title: string;
  description: string;
  status?: string;
  tags: string[];
  githubUrl?: string;
  websiteUrl?: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    title: 'Reusable PCF Controls with React',
    description:
      'An open-source project exploring how to build maintainable, reusable, and testable Power Apps Component Framework controls using React and a shared component architecture.',
    status: 'Open Source',
    tags: [
      'PCF',
      'React',
      'TypeScript',
      'Fluent UI',
      'Dataverse',
      'Vitest',
    ],
    githubUrl: 'https://github.com/gjorgjigjuzelov/reusable-pcf-controls-react',
  },
  {
    title: 'Community Event Hub',
    description:
      'An open-source Power Platform project exploring how to design and build a maintainable event-management solution with Microsoft Dataverse, following practical architecture and engineering principles.',
    status: 'In Progress',
    tags: [
      'Power Platform',
      'Dynamics 365 CE',
      'Dataverse',
      'C#',
      'TypeScript',
      'Power Automate',
      'Open Source',
    ],
    githubUrl: 'https://github.com/gjorgjigjuzelov/community-event-hub',
  },
];