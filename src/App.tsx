import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import './App.css';
import Loader from './components/sections/Loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {loading ? (<Loader />) : (
          <Router>
            <Header />
            <AnimatePresence mode="wait">
              <motion.main
                key="content"
                className="min-h-screen"
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* <Route path="/project/:id" element={<ProjectDetail />} /> */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.main>
            </AnimatePresence>
            <Footer />
          </Router>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;