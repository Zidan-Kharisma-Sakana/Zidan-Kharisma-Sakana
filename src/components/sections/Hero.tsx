import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP animation for background elements
  useEffect(() => {
    if (!heroRef.current) return;

    // Create a timeline for sequenced animations
    const tl = gsap.timeline();
    
    // Animate the circle
    if (circleRef.current) {
      tl.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)" }
      );
    }

    // Animate background particles
    const particles = heroRef.current.querySelectorAll('.particle');
    gsap.fromTo(
      particles,
      { 
        y: () => Math.random() * 100 - 50,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 0.7, 
        duration: 1.5, 
        stagger: 0.1,
        ease: "power3.out" 
      }
    );

    // Initialize mouse movement effect for parallax
    const handleMouseMove = (e: MouseEvent): void => {
      if (!circleRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(circleRef.current, {
        x: x * -1,
        y: y * -1,
        duration: 1,
        ease: "power2.out"
      });

      particles.forEach((particle, i) => {
        gsap.to(particle, {
          x: x * (i % 3 + 1) * -0.5,
          y: y * ((i % 2) + 1) * -0.5,
          duration: 1,
          ease: "power2.out"
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={circleRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-radial from-primary-light/30 to-transparent rounded-full blur-3xl"></div>
        
        {/* Create background particles */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="particle absolute rounded-full opacity-20 blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: i % 2 === 0 ? '#6366f1' : '#f97316'
            }}
          ></div>
        ))}
      </div>

      {/* Content layer */}
      <div className="container-custom relative z-10 text-center px-4">
        <motion.div
          ref={textRef}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.h2 
            custom={0}
            variants={textVariants}
            className="text-lg md:text-xl font-medium text-boysenberry mb-2"
          >
            Welcome to my portfolio
          </motion.h2>
          
          <motion.h1 
            custom={1}
            variants={textVariants}
            className="text-4xl md:text-7xl font-bold text-wine-berry mb-6"
          >
            Frontend Developer
          </motion.h1>
          
          <motion.p 
            custom={2}
            variants={textVariants}
            className="text-lg md:text-xl mb-10 text-deep-coffe"
          >
            Building beautiful, interactive, and high-performance web experiences
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;