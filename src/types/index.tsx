export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl?: string;
    codeUrl?: string;
    details?: ProjectDetails;
  }
  
  export interface ProjectDetails {
    clientName?: string;
    duration?: string;
    role?: string;
    technologies: string[];
    challenge?: string;
    solution?: string;
    results?: string;
    images?: string[];
  }
  
  export interface ThemeToggleProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  export interface ProjectCardProps {
    project: Project;
  }
  
  export interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
  }
  
  export type AnimationDirection = 'up' | 'down' | 'left' | 'right';
  
  export interface AnimatedElementProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: AnimationDirection;
    className?: string;
  }