import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { SectionWrapper } from '../../hoc/SectionWrapper';

const Hero: React.FC = () => {

  // Text animation variants for Framer Motion
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <SectionWrapper idName='home' className="h-screen flex items-center justify-center overflow-hidden">
      <div className="container-custom relative z-10 text-center px-4 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            custom={0}
            variants={textVariants}
            className="text-lg md:text-xl font-medium text-boysenberry mb-2"
          >
            <TypeAnimation
              sequence={[
                "Hello there! Welcome!",
                1000,
                "Hello there! My Name is Zidan",
                4000
              ]}
              wrapper='span'
              speed={50}
              repeat={0}
              cursor={false}
            />
          </motion.h2>

          <motion.h1
            custom={1}
            variants={textVariants}
            className="italic grid grid-cols-1 text-5xl lg:text-7xl text-wine-berry my-6 w-fit mx-auto"
          >
            <p className='font-bold text-2xl text-boysenberry'>I'M A</p>
            <div className='hidden md:block heading-container'>
              <h1 className='heading-background'>FULLSTACK ENGINEER</h1>
              <h1 className='heading-clipped'>FULLSTACK ENGINEER</h1>
            </div>
            <div className='heading-container text-center md:hidden'>
              <h1 className='heading-background left-1/2 -translate-x-1/2'>FULLSTACK</h1>
              <h1 className='heading-clipped'>FULLSTACK</h1>
            </div>
            <div className='heading-container text-center md:hidden'>
              <h1 className='heading-background left-1/2 -translate-x-1/2'>ENGINEER</h1>
              <h1 className='heading-clipped'>ENGINEER</h1>
            </div>
          </motion.h1>

          <motion.p
            custom={2}
            variants={textVariants}
            className="text-base md:text-xl text-deep-coffe max-w-3/4 mx-auto h-20 mb-6"
          >
            <TypeAnimation
              sequence={[
                "Creating High Performance Systems with Go",
                4000,
                "Building Enterprise Applications with Java",
                4000,
                "Crafting Captivating Websites with React",
                4000,
                "Automating Kubernetes Deployment with CI/CD ",
                4000
              ]}
              speed={40}
              deletionSpeed={99}
              repeat={Infinity}
            />
          </motion.p>

          <motion.div
            custom={3}
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#projects" className="">
              View My Work
            </a>
            <a href="#contact" className="">
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-bashful-pink"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </SectionWrapper>
  );
};

export default Hero;