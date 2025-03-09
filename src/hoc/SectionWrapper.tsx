import { motion } from "framer-motion";

import { staggerContainer } from "../utils/motion";

type SectionWrapperProps = {
  children: React.ReactNode;
  idName?: string;
  className?: string
};

export const SectionWrapper = ({ children, idName, className }: SectionWrapperProps) => (
  <motion.section
    variants={staggerContainer()}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    className={`relative ${className}`}
  >
    <div id={idName} className="absolute left-0 -top-20" />
    {children}
  </motion.section>
);
