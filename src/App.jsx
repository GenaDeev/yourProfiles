import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/Home';
import PersonPage from './pages/Person';
import Header from './components/Header';
import Footer from './components/Footer';
import SubmitPage from './pages/Submit'

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.2, // Escala inicial para el zoom out
  },
  enter: {
    opacity: 1,
    scale: 1, // Escala final para el zoom in
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 1.8, // Escala final para el zoom out
    transition: { duration: 0.25 },
  },
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="home"
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                >
                  <HomePage />
                </motion.div>
              </AnimatePresence>
            }
          />
           <Route
            path="/submit"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="person"
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                >
                  <SubmitPage/>
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="/person/:id"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="person"
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="h-full p-4 w-full flex flex-col items-center "
                >
                  <PersonPage />
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}