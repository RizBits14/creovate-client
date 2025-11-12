import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaPalette } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className="font-medium bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] hover:opacity-80 transition duration-300"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/explore"
                    className="font-medium bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] hover:opacity-80 transition duration-300"
                >
                    Explore Artworks
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/add"
                    className="font-medium bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] hover:opacity-80 transition duration-300"
                >
                    Add Artwork
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/gallery"
                    className="font-medium bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] hover:opacity-80 transition duration-300"
                >
                    My Gallery
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/favorites"
                    className="font-medium bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] hover:opacity-80 transition duration-300"
                >
                    My Favorites
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] transition duration-500 hover:opacity-90"
                >
                    <FaPalette className="text-[#6C63FF]" />
                    Creovate
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-6">{navLinks}</ul>

                {/* Right Side Buttons (optional placeholder) */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="px-4 py-1.5 rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white font-medium hover:scale-105 transition-transform duration-300">
                        Login
                    </button>
                    <button className="px-4 py-1.5 rounded-full border border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition duration-300">
                        Register
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-2xl text-[#6C63FF]"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <ul className="flex flex-col items-center gap-4 py-4">{navLinks}</ul>
                    <div className="flex justify-center gap-4 pb-4">
                        <button className="px-4 py-1.5 rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white font-medium hover:scale-105 transition-transform duration-300">
                            Login
                        </button>
                        <button className="px-4 py-1.5 rounded-full border border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition duration-300">
                            Register
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
