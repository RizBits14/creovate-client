/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { ThemeContext } from "../Provider/ThemeContext";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout().catch((err) => console.log(err));
        setIsOpen(false);
    };

    const activeClass =
        "text-transparent bg-clip-text bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] font-semibold";
    const normalClass =
        "text-gray-700 dark:text-gray-200 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-[#6C63FF] hover:via-[#FF6584] hover:to-[#6C63FF] transition-all duration-300";

    return (
        <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-xl backdrop-blur-md transition-colors duration-500">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] hover:scale-105 transition-transform duration-300"
                >
                    Creovate
                </Link>

                <div className="hidden md:flex flex-1 justify-center space-x-8 font-medium text-lg">
                    <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
                    <NavLink to="/explore" className={({ isActive }) => isActive ? activeClass : normalClass}>Explore</NavLink>
                    <NavLink to="/add-art" className={({ isActive }) => isActive ? activeClass : normalClass}>Add Artwork</NavLink>
                    <NavLink to="/my-gallery" className={({ isActive }) => isActive ? activeClass : normalClass}>My Gallery</NavLink>
                    <NavLink to="/favourites" className={({ isActive }) => isActive ? activeClass : normalClass}>Favourites</NavLink>
                </div>

                <div className="hidden md:flex items-center space-x-4">

                    <button
                        onClick={toggleTheme}
                        className="relative w-12 h-6 flex items-center rounded-full bg-gray-300 dark:bg-gray-700 p-1 transition-all duration-300 shadow-inner"
                    >
                        <span
                            className={`absolute w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md text-yellow-500 dark:text-blue-300 transform transition-all duration-300`}
                            style={{ left: theme === "light" ? "0px" : "24px" }}
                        >
                            {theme === "light" ? "🌞" : "🌜"}
                        </span>
                    </button>

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6C63FF] hover:text-[#6C63FF] transition-all duration-300"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden">
                                    <img src={user.photoURL || "https://cdn-icons-png.flaticon.com/128/17561/17561717.png"} alt="User Avatar" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-3 shadow-lg bg-white dark:bg-gray-800 rounded-xl w-52">
                                <li className="font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2">
                                    {user.displayName || "User"}
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-red-500 dark:text-red-400 font-medium hover:underline">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200">
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
                    >
                        <div className="flex flex-col items-center py-6 space-y-4 text-lg">
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setIsOpen(false);
                                }}
                                className="relative w-12 h-6 flex items-center rounded-full bg-gray-300 dark:bg-gray-700 p-1 transition-all duration-300 shadow-inner"
                            >
                                <span
                                    className={`absolute w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md text-yellow-500 dark:text-blue-300 transform transition-all duration-300`}
                                    style={{ left: theme === "light" ? "0px" : "24px" }}
                                >
                                    {theme === "light" ? "🌞" : "🌜"}
                                </span>
                            </button>

                            {user && (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={user.photoURL || "https://cdn-icons-png.flaticon.com/128/17561/17561717.png"}
                                        alt="User Avatar"
                                        className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
                                    />
                                    <p className="mt-2 font-semibold text-gray-700 dark:text-gray-200">{user.displayName || "User"}</p>
                                </div>
                            )}

                            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
                            <NavLink to="/explore" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Explore</NavLink>
                            {user && (
                                <>
                                    <NavLink to="/add-art" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Add Artwork</NavLink>
                                    <NavLink to="/my-gallery" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>My Gallery</NavLink>
                                    <NavLink to="/favourites" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Favourites</NavLink>
                                </>
                            )}
                            {!user ? (
                                <div className="flex flex-col w-full items-center gap-3 px-6">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full px-4 py-2 rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300">Login</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="w-full px-4 py-2 rounded-full border border-gray-400 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6C63FF] hover:text-[#6C63FF] transition-all duration-300">Register</Link>
                                </div>
                            ) : (
                                <button onClick={handleLogout} className="text-red-500 dark:text-red-400 font-medium hover:underline">Logout</button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
