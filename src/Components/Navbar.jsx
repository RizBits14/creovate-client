/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; 

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout().catch((err) => console.log(err));
        setIsOpen(false);
    };

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-pink-500 to-indigo-500">Creovate
                </Link>
                <div className="hidden md:flex flex-1 justify-center space-x-6 font-medium">
                    <Link to="/" className="hover:text-indigo-500 dark:hover:text-pink-400 text-gray-700 dark:text-gray-200">Home</Link>
                    <Link to="/explore" className="hover:text-indigo-500 dark:hover:text-pink-400 text-gray-700 dark:text-gray-200">Explore Artworks</Link>

                    {user && (
                        <>
                            <Link to="/add-art" className="hover:text-indigo-500 dark:hover:text-pink-400 text-gray-700 dark:text-gray-200">Add Artwork</Link>
                            <Link to="/my-gallery" className="hover:text-indigo-500 dark:hover:text-pink-400 text-gray-700 dark:text-gray-200">My Gallery</Link>
                            <Link to="/favorites" className="hover:text-indigo-500 dark:hover:text-pink-400 text-gray-700 dark:text-gray-200">My Favorites</Link>
                        </>
                    )}
                </div>

                <div className="hidden md:flex items-center space-x-3">
                    {!user ? (
                        <>
                            <Link to="/login" className="btn btn-sm rounded-full bg-linear-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 transition">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-sm rounded-full border border-gray-400 text-gray-700 dark:text-gray-200 hover:border-indigo-500 dark:hover:border-pink-400 transition">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border border-gray-300 dark:border-gray-600">
                                    <img
                                        src={user?.photoURL || "https://cdn-icons-png.flaticon.com/128/17561/17561717.png"}
                                        alt="User Avatar"
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-3 shadow bg-white dark:bg-gray-800 rounded-box w-52"
                            >
                                <li className="font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                                    {user?.displayName || "User"}
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-500 dark:text-red-400 font-medium"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 dark:text-gray-200 focus:outline-none"
                    >
                        {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4 font-medium">

                            {user && (
                                <div className="flex flex-col items-center mb-3">
                                    <img
                                        src={user.photoURL || "https://cdn-icons-png.flaticon.com/128/17561/17561717.png"}
                                        alt="User Avatar"
                                        className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600"
                                    />
                                    <p className="mt-2 font-semibold text-gray-700 dark:text-gray-200">
                                        {user.displayName || "User"}
                                    </p>
                                </div>
                            )}

                            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400">Home</Link>

                            <Link to="/explore" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400">Explore Artworks</Link>

                            {user && (
                                <>
                                    <Link to="/add-art" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400">Add Artwork</Link>

                                    <Link to="/my-gallery" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400">My Gallery</Link>

                                    <Link to="/favorites" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400">My Favorites</Link>
                                </>
                            )}

                            {!user ? (
                                <div className="flex flex-col items-center gap-3 w-full px-6">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn w-full rounded-full bg-linear-to-r from-indigo-500 to-pink-500 text-white">
                                        Login
                                    </Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="btn w-full rounded-full border border-gray-400 text-gray-700 dark:text-gray-200 hover:border-indigo-500 dark:hover:border-pink-400">
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 dark:text-red-400 font-medium"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Navbar;
