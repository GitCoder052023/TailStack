import { BookOpen, Globe, Layers, Rocket, Server } from "lucide-react";

export const docsSections = [
  {
    path: '/docs',
    label: 'Introduction',
    icon: BookOpen,
    description: 'Overview of TailStack'
  },
  {
    path: '/docs/getting-started',
    label: 'Getting Started',
    icon: Rocket,
    description: 'Installation and setup'
  },
  {
    path: '/docs/architecture',
    label: 'Architecture',
    icon: Layers,
    description: 'Project structure'
  },
  {
    path: '/docs/frontend',
    label: 'Frontend',
    icon: Globe,
    description: 'React application'
  },
  {
    path: '/docs/backend',
    label: 'Backend',
    icon: Server,
    description: 'Express server'
  },
];