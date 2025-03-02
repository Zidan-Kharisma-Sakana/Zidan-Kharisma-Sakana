import { motion } from "framer-motion";

const Loader: React.FC = () => {
    // Loading animation variants
    const loadingVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };
    return (<motion.div
        key="loader"
        className="fixed inset-0 flex items-center justify-center bg-light"
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                scale: [0.8, 1.2, 1],
                opacity: 1
            }}
            transition={{
                duration: 1,
                ease: "easeInOut",
                times: [0, 0.5, 1]
            }}
            className="text-5xl font-bold text-gradient"
        >
            Portfolio
        </motion.div>
    </motion.div>)
}

export default Loader