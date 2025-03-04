import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ProjectCardProps } from '../../types';

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D rotation effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Add spring physics
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 25 });
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate distance from center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Set motion values based on mouse position
    const centerX = width / 2;
    const centerY = height / 2;
    
    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = (): void => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.215, 0.61, 0.355, 1] 
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.2, 
        duration: 0.4
      }
    }
  };

  // Shine effect animation
  const shineVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: { 
      opacity: 0.1, 
      x: '100%',
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-96 rounded-xl overflow-hidden shadow-2xl perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d" 
      }}
    >
      {/* Background Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0 h-full w-full"
        style={{ 
          backgroundImage: `url(${project.image})`,
          translateZ: isHovered ? -20 : 0,
          scale: isHovered ? 1.1 : 1,
          transition: "all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      {/* Shine Effect on hover */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent rotate-12 z-20" 
          variants={shineVariants}
          initial="hidden"
          animate="visible"
        />
      )}
      
      {/* Content Container */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full p-6 z-30"
        variants={contentVariants}
        style={{ 
          translateZ: 20,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag:string, index:number) => (
            <div 
              key={index}
              className="text-xs px-2 py-1 rounded-full text-white bg-gray-600/50 backdrop-blur-md shadow-md"
            >
              {tag}
            </div>
          ))}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <motion.p className="text-sm text-gray-300 mb-4">
          {project.description}
        </motion.p>
        
        <div className="flex gap-3 items-center">
          {project.demoUrl && (
            <a 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary text-sm font-medium flex items-center transition-colors"
            >
              <span>View Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          
          {project.codeUrl && (
            <a 
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary text-sm font-medium flex items-center transition-colors"
            >
              <span>View Code</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;