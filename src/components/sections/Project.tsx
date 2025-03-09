import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import { Project } from '../../types';
import { SectionWrapper } from '../../hoc/SectionWrapper';

const projectsData: Project[] = [
  {
    id: 'e3ws',
    title: 'Eearthquake Early Warning System',
    description: 'System to detect p-wave of earthquake using ML with real-time data. Architected with Event-Driven System and Scalability in mind using Kafka and Docker',
    image: '/projects/e3ws.png',
    tags: ['Go', 'Python', 'Kafka', 'React'],
    demoUrl: 'https://www.youtube.com/watch?v=KL9jZ7Uj_ZE',
    codeUrl: 'https://github.com/distributed-eews/eews',
  },
  {
    id: 'karira',
    title: 'Karira',
    description: 'Freelance Marketplace Android Application for Bangkit Capstone. Powered by AI for recommendation engine and budget estimation',
    image: '/projects/karira.png',
    tags: ['Express JS', 'GCP', 'DevOps', 'CI/CD'],
    codeUrl: 'https://github.com/Karira-Capstone',
  },
  {
    id: 'spo',
    title: 'Pengaduan BAPPEBTI',
    description: 'Revamping a legacy system of an online conflict resolution system in BAPPEBTI. Create Auth Mechanism, Application Form, Dashboard, and multiple other improvements',
    image: '/projects/spo.png',
    tags: ['Laravel', 'MySql', 'Apache Web Server'],
    codeUrl: 'https://github.com/Zidan-Kharisma-Sakana/conflict-resolution',
  },
];

// Filter categories
const categories: string[] = ['All', 'React', 'Go', 'Kafka', 'DevOps'];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  // Filter projects based on selected category
  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(project => project.tags.includes(filter));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <SectionWrapper idName="projects">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">My <span className="text-gradient">Projects</span></h2>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === category
                ? 'text-misty-rose shadow-lg'
                : 'bg-light-rose text-deep-coffe hover:bg-wine-berry hover:text-misty-rose'
              }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* Show more button */}
      {filter === 'All' && projectsData.length > 6 && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="btn-outline">
            View More Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      )}
    </SectionWrapper>
  );
};

export default Projects;