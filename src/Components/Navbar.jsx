import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaPalette } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const navLinks = (
        <>
            <li><NavLink to="/" className="hover:text-[#A855F7]">Home</NavLink></li>
            <li><NavLink to="/explore" className="hover:text-[#A855F7]">Explore Artworks</NavLink></li>
            <li><NavLink to="/add" className="hover:text-[#A855F7]">Add Artwork</NavLink></li>
            <li><NavLink to="/gallery" className="hover:text-[#A855F7]">My Gallery</NavLink></li>
            <li><NavLink to="/favorites" className="hover:text-[#A855F7]">My Favorites</NavLink></li>
        </>
    );

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#7C3AED] hover:text-[#A855F7] transition duration-300">
                    <FaPalette className="text-[#A855F7]" />
                    Creovate
                </Link>

                <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">{navLinks}</ul>

                <div className="hidden md:flex items-center gap-4">
                    <button className="btn btn-sm bg-[#A855F7] hover:bg-[#7C3AED] text-white border-none rounded-full">Login
                    </button>
                    <button className="btn btn-sm border border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7] hover:text-white rounded-full">Register</button>
                </div>

                <button className="md:hidden text-2xl text-[#7C3AED]" onClick={() => setOpen(!open)}>
                    {open ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <ul className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
                        {navLinks}
                        <button className="btn btn-sm bg-[#A855F7] text-white border-none rounded-full w-70">Login
                        </button>
                        <button className="btn btn-sm border border-[#A855F7] text-[#A855F7] rounded-full w-70">Register
                        </button>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
