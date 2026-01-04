import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const HomePageLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="pt-24 flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default HomePageLayout;