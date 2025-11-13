import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const HomePageLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-24">
                <Outlet />
            </div>
        </div>
    );
};

export default HomePageLayout;