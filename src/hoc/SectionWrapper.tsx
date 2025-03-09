import { motion } from "framer-motion";

import { staggerContainer } from "../utils/motion";

type SectionWrapperProps = {
  children: React.ReactNode;
  idName?: string;
  className?: string
  title?: string
};

export const SectionWrapper = ({ children, idName, className, title }: SectionWrapperProps) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`relative w-full mb-10 md:mb-20 ${className}`}
    >
      <div id={idName} className="absolute left-0 -top-10 md:-top-20" />
      {title && (<motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-boysenberry">{title}</h2>
      </motion.div>)}
      {children}
    </motion.section>
  )
}
