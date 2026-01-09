import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import SpecialOffers from './pages/SpecialOffers';
import Contact from './pages/Contact';
import Articles from './pages/Articles';

import Guides from './pages/Guides';
import GuideDetail from './pages/GuideDetail';
import Login from './pages/Admin/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import PropertyManager from './pages/Admin/PropertyManager';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/special-offers" element={<SpecialOffers />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertyManager />} />
          <Route path="articles" element={<div className="p-10">Feature coming soon...</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
