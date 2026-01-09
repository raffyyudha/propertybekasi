
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

const PublicLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

export default PublicLayout;
