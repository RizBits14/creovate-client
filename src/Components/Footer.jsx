import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 grid gap-8 md:grid-cols-3">
                <div>
                    <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF]">
                        Creovate
                    </h2>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        A creative hub for artists and art lovers to share, explore,
                        and celebrate digital and traditional artworks in one place.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-[#6C63FF] hover:via-[#FF6584] hover:to-[#6C63FF] transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/explore" className="text-gray-600 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-[#6C63FF] hover:via-[#FF6584] hover:to-[#6C63FF] transition">
                                Explore Artworks
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-art" className="text-gray-600 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-[#6C63FF] hover:via-[#FF6584] hover:to-[#6C63FF] transition">
                                Add Artwork
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-gallery" className="text-gray-600 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-[#6C63FF] hover:via-[#FF6584] hover:to-[#6C63FF] transition">
                                My Gallery
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        Stay Connected
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Have feedback, collaboration ideas, or portfolio to share?
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                        <FaEnvelope className="text-gray-500 dark:text-gray-300" />
                        <a href="mailto:hello@creovate.art" className="text-sm text-gray-600 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-[#6C63FF] hover:via-[#FF6584] hover:to-[#6C63FF] transition">
                            hello@creovate.art
                        </a>
                    </div>

                    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300 text-xl">
                        <a href="#" aria-label="X" className="hover:text-[#6C63FF] dark:hover:text-[#FF6584] transition">
                            <FaXTwitter />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-[#6C63FF] dark:hover:text-[#FF6584] transition">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-[#6C63FF] dark:hover:text-[#FF6584] transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" aria-label="GitHub" className="hover:text-[#6C63FF] dark:hover:text-[#FF6584] transition">
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
                © {year} Creovate · Crafted for art lovers & creators.
            </div>
        </footer>
    );
};

export default Footer;
