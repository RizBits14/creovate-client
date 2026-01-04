/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { ThemeContext } from "../Provider/ThemeContext";
import { FiMenu, FiX } from "react-icons/fi";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const profileRef = useRef(null);

    const closeAll = () => {
        setIsOpen(false);
        setProfileOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            closeAll();
            navigate("/");
        } catch (e) {
            closeAll();
        }
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") closeAll();
        };
        const onClickOutside = (e) => {
            if (!profileRef.current) return;
            if (!profileRef.current.contains(e.target)) setProfileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("mousedown", onClickOutside);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("mousedown", onClickOutside);
        };
    }, []);

    const activeClass = "text-primary font-semibold";
    const normalClass = "text-base-content/80 hover:text-primary transition-colors";
    const linkClass = ({ isActive }) => (isActive ? activeClass : normalClass);

    const commonLinks = useMemo(
        () => [
            { to: "/", label: "Home" },
            { to: "/explore", label: "Explore" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
        ],
        []
    );

    const privateLinks = useMemo(
        () => [
            { to: "/dashboard", label: "Dashboard" },
            { to: "/dashboard/add-art", label: "Add Artwork" },
            { to: "/dashboard/my-gallery", label: "My Gallery" },
            { to: "/dashboard/favourites", label: "Favourites" },
        ],
        []
    );

    const navMotion = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
    };

    const panelMotion = {
        hidden: { opacity: 0, y: -8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.18 } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
    };

    const avatarSrc =
        user?.photoURL || "https://cdn-icons-png.flaticon.com/128/17561/17561717.png";

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-base-300 bg-base-100/90 backdrop-blur upports-backdrop-filter:bg-base-100/70">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-10">
                <Link
                    to="/"
                    onClick={closeAll}
                    className="inline-flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="Go to home"
                >
                    <span className="text-2xl font-extrabold tracking-tight text-base-content md:text-3xl">
                        <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            Creo
                        </span>
                        <span className="text-base-content">vate</span>
                    </span>
                </Link>

                <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    <div className="flex items-center gap-7 text-sm font-medium">
                        {commonLinks.map((l) => (
                            <NavLink key={l.to} to={l.to} onClick={closeAll} className={linkClass}>
                                {l.label}
                            </NavLink>
                        ))}
                        {user &&
                            privateLinks.map((l) => (
                                <NavLink key={l.to} to={l.to} onClick={closeAll} className={linkClass}>
                                    {l.label}
                                </NavLink>
                            ))}
                    </div>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-sm h-11 w-11 rounded-xl"
                        aria-label="Toggle theme"
                        title="Toggle theme"
                    >
                        <span className="text-lg">{theme === "light" ? "🌞" : "🌜"}</span>
                    </button>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="btn btn-ghost btn-sm h-11 rounded-xl bg-blue-600 text-black">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-outline btn-sm h-11 rounded-xl bg-blue-200 text-black">
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="relative" ref={profileRef}>
                            <button
                                type="button"
                                onClick={() => setProfileOpen((v) => !v)}
                                className="flex items-center gap-2 rounded-2xl border border-base-300 bg-base-100 px-2 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-base-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                aria-label="Open profile menu"
                                aria-expanded={profileOpen}
                            >
                                <span className="relative h-9 w-9 overflow-hidden rounded-full border border-base-300">
                                    <img src={avatarSrc} alt="User avatar" className="h-full w-full object-cover" />
                                </span>
                                <span className="hidden max-w-[140px] truncate text-sm font-semibold text-base-content sm:inline">
                                    {user?.displayName || "User"}
                                </span>
                                <span
                                    className={`hidden text-base-content/60 transition-transform sm:inline ${profileOpen ? "rotate-180" : ""
                                        }`}
                                >
                                    ⌄
                                </span>
                            </button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <Motion.div
                                        variants={panelMotion}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg"
                                    >
                                        <div className="px-4 py-4">
                                            <p className="text-xs text-base-content/60">Signed in as</p>
                                            <p className="mt-1 truncate text-sm font-semibold text-base-content">
                                                {user?.displayName || "User"}
                                            </p>
                                        </div>

                                        <div className="h-px bg-base-300/70" />

                                        <div className="p-2">
                                            <Link
                                                to="/dashboard/profile"
                                                onClick={closeAll}
                                                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content"
                                            >
                                                Profile <span className="text-base-content/50">→</span>
                                            </Link>

                                            <Link
                                                to="/dashboard"
                                                onClick={closeAll}
                                                className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content"
                                            >
                                                Dashboard Home <span className="text-base-content/50">→</span>
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-error transition-colors hover:bg-error/10"
                                            >
                                                Logout <span className="opacity-70">↩</span>
                                            </button>
                                        </div>
                                    </Motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                <div className="md:hidden">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen((v) => !v);
                            setProfileOpen(false);
                        }}
                        className="btn btn-ghost btn-sm h-11 w-11 rounded-xl"
                        aria-label="Open menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <Motion.div
                        variants={navMotion}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="md:hidden border-t border-base-300 bg-base-100"
                    >
                        <div className="mx-auto max-w-7xl px-4 py-6">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                                    Menu
                                </span>
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="btn btn-ghost btn-sm h-10 w-10 rounded-xl"
                                    aria-label="Toggle theme"
                                >
                                    <span className="text-lg">{theme === "light" ? "🌞" : "🌜"}</span>
                                </button>
                            </div>

                            <div className="mt-4 grid gap-2">
                                {commonLinks.map((l) => (
                                    <NavLink
                                        key={l.to}
                                        to={l.to}
                                        onClick={closeAll}
                                        className={({ isActive }) =>
                                            `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
                                            }`
                                        }
                                    >
                                        {l.label}
                                    </NavLink>
                                ))}

                                {user &&
                                    privateLinks.map((l) => (
                                        <NavLink
                                            key={l.to}
                                            to={l.to}
                                            onClick={closeAll}
                                            className={({ isActive }) =>
                                                `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
                                                }`
                                            }
                                        >
                                            {l.label}
                                        </NavLink>
                                    ))}
                            </div>

                            {!user ? (
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <Link
                                        to="/login"
                                        onClick={closeAll}
                                        className="btn btn-ghost btn-sm h-11 rounded-xl"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={closeAll}
                                        className="btn btn-outline btn-sm h-11 rounded-xl"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="mt-5 rounded-2xl border border-base-300 bg-base-100 p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="h-10 w-10 overflow-hidden rounded-full border border-base-300">
                                            <img src={avatarSrc} alt="User avatar" className="h-full w-full object-cover" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-base-content">
                                                {user?.displayName || "User"}
                                            </p>
                                            <p className="truncate text-xs text-base-content/60">
                                                {user?.email || ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid gap-2">
                                        <Link
                                            to="/dashboard/profile"
                                            onClick={closeAll}
                                            className="rounded-xl px-4 py-3 text-sm font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/dashboard"
                                            onClick={closeAll}
                                            className="rounded-xl px-4 py-3 text-sm font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content"
                                        >
                                            Dashboard Home
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="rounded-xl px-4 py-3 text-left text-sm font-medium text-error transition-colors hover:bg-error/10"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
