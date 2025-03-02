import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState<boolean>(false);
  const [linkHovered, setLinkHovered] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    // Function to update cursor position
    const updatePosition = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Function to handle mouse down event
    const handleMouseDown = (): void => {
      setClicked(true);
    };

    // Function to handle mouse up event
    const handleMouseUp = (): void => {
      setClicked(false);
    };

    // Function to handle mouse leaving window
    const handleMouseLeave = (): void => {
      setHidden(true);
    };

    // Function to handle mouse entering window
    const handleMouseEnter = (): void => {
      setHidden(false);
    };

    // Check for link hovers
    const addLinkEvents = (): void => {
      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    // Add all event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Initial check for link elements
    addLinkEvents();

    // Set up a mutation observer to watch for new elements
    const observer = new MutationObserver(addLinkEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();

      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.removeEventListener('mouseenter', () => setLinkHovered(true));
        el.removeEventListener('mouseleave', () => setLinkHovered(false));
      });
    };
  }, []);

  // Cursor animation variants
  const mainCursorVariants = {
    default: {
      opacity: 1,
      height: 30,
      width: 30,
      fontSize: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      x: position.x - 15,
      y: position.y - 15,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      opacity: 1,
      height: 60,
      width: 60,
      fontSize: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "#fff",
      x: position.x - 30,
      y: position.y - 30,
    },
    clicked: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      x: position.x - 5,
      y: position.y - 5,
    },
    hidden: {
      opacity: 0,
      x: position.x - 15,
      y: position.y - 15,
    },
  };

  const dotCursorVariants = {
    default: {
      opacity: 1,
      height: 6,
      width: 6,
      x: position.x - 3,
      y: position.y - 3,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 400,
        damping: 15,
      },
    },
    hover: {
      opacity: 0,
    },
    clicked: {
      opacity: 0,
    },
    hidden: {
      opacity: 0,
      x: position.x - 3,
      y: position.y - 3,
    },
  };

  const cursorVariant = hidden ? "hidden" : clicked ? "clicked" : linkHovered ? "hover" : "default";

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white"
        variants={mainCursorVariants}
        animate={cursorVariant}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          pointerEvents: "none",
          zIndex: 9999
        }}
      />
      <motion.div
        ref={cursorDotRef}
        className="custom-cursor fixed top-0 left-0 rounded-full bg-white"
        variants={dotCursorVariants}
        animate={cursorVariant}
        style={{
          pointerEvents: "none",
          zIndex: 9999
        }}
      />
    </>
  );
};

export default CustomCursor;