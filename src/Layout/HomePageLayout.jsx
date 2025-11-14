import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const HomePageLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-24">
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomePageLayout;