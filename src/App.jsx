import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Works from './pages/Works';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Cursor from './components/CustomCursor';

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <>
      <Cursor />
      {!isAdminPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/legends" element={<Navigate to="/works" replace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
