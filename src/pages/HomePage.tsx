import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Project';
import WorkExperiences from '../components/sections/Work';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=100',
          end: 'bottom top+=100',
          toggleActions: 'play none none reverse',
        }
      });

      const revealElements = section.querySelectorAll('.reveal');
      if (revealElements.length) {
        tl.fromTo(
          revealElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />
      {/* <About /> */}
      {/* <Experience /> */}
      <WorkExperiences />
      {/* <Skills /> */}
      {/* Projects Section */}
      <Projects />
      {/* <Contact /> */}
    </motion.div>
  );
};

export default HomePage;