import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const HomePageLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomePageLayout;