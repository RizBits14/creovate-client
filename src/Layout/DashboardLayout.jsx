/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import { motion as Motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const active =
        "bg-primary/10 text-primary font-semibold border border-primary/20";
    const normal =
        "text-base-content/80 hover:text-base-content hover:bg-base-200 transition-colors border border-transparent";

    const linkClass = ({ isActive }) =>
        `flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm ${isActive ? active : normal}`;

    const closeAll = () => {
        setSidebarOpen(false);
        setProfileOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            closeAll();
            navigate("/login");
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

    const avatarSrc =
        user?.photoURL || "https://cdn-icons-png.flaticon.com/128/17561/17561717.png";

    const sidebarMotion = {
        hidden: { x: -18, opacity: 0 },
        show: { x: 0, opacity: 1, transition: { duration: 0.18 } },
        exit: { x: -18, opacity: 0, transition: { duration: 0.14 } },
    };

    const dropdownMotion = {
        hidden: { y: -8, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.16 } },
        exit: { y: -8, opacity: 0, transition: { duration: 0.12 } },
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur supports-backdrop-filter:bg-base-100/70">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-10">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="btn btn-ghost btn-sm h-11 w-11 rounded-xl lg:hidden"
                            aria-label="Open dashboard menu"
                        >
                            <FiMenu size={20} />
                        </button>

                        <NavLink
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                            <span className="text-lg font-extrabold tracking-tight text-base-content sm:text-xl">
                                <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                                    Creovate
                                </span>
                                <span className="ml-2 hidden font-bold text-base-content sm:inline">
                                    Dashboard
                                </span>
                            </span>
                        </NavLink>
                    </div>

                    <div className="relative" ref={profileRef}>
                        <button
                            type="button"
                            onClick={() => setProfileOpen((v) => !v)}
                            className="flex items-center gap-2 rounded-2xl border border-base-300 bg-base-100 px-2 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-base-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                            aria-label="Open profile menu"
                            aria-expanded={profileOpen}
                        >
                            <span className="h-9 w-9 overflow-hidden rounded-full border border-base-300">
                                <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
                            </span>
                            <span className="hidden max-w-160px truncate text-sm font-semibold text-base-content sm:inline">
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
                                    variants={dropdownMotion}
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
                                        <NavLink
                                            to="/dashboard"
                                            end
                                            onClick={closeAll}
                                            className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content"
                                        >
                                            Dashboard Home <span className="text-base-content/50">→</span>
                                        </NavLink>
                                        <NavLink
                                            to="/dashboard/profile"
                                            onClick={closeAll}
                                            className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content"
                                        >
                                            Profile <span className="text-base-content/50">→</span>
                                        </NavLink>
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
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-10 lg:grid-cols-12">
                <aside className="hidden lg:col-span-3 lg:block">
                    <div className="sticky top-[92px] rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/70">
                                Menu
                            </h3>
                            <span className="badge badge-outline">Private</span>
                        </div>

                        <nav className="mt-4 grid gap-2">
                            <NavLink to="/dashboard" end className={linkClass}>
                                <span>Overview</span>
                                <span className="text-base-content/40">→</span>
                            </NavLink>
                            <NavLink to="/dashboard/add-art" className={linkClass}>
                                <span>Add Artwork</span>
                                <span className="text-base-content/40">→</span>
                            </NavLink>
                            <NavLink to="/dashboard/my-gallery" className={linkClass}>
                                <span>My Gallery</span>
                                <span className="text-base-content/40">→</span>
                            </NavLink>
                            <NavLink to="/dashboard/favourites" className={linkClass}>
                                <span>My Favourites</span>
                                <span className="text-base-content/40">→</span>
                            </NavLink>
                            <NavLink to="/dashboard/profile" className={linkClass}>
                                <span>Profile</span>
                                <span className="text-base-content/40">→</span>
                            </NavLink>
                        </nav>

                        <div className="mt-6 border-t border-base-300 pt-4">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="btn btn-outline btn-sm h-11 w-full rounded-xl text-error border-error"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="lg:col-span-9">
                    <div className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <Motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
                            onClick={closeAll}
                        />

                        <Motion.aside
                            variants={sidebarMotion}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="fixed left-0 top-0 z-50 h-full w-[86%] max-w-sm border-r border-base-300 bg-base-100 p-5 shadow-xl lg:hidden"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-extrabold tracking-tight text-base-content">
                                        <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                                            Creovate
                                        </span>
                                    </span>
                                    <span className="badge badge-outline">Dashboard</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeAll}
                                    className="btn btn-ghost btn-sm h-11 w-11 rounded-xl"
                                    aria-label="Close dashboard menu"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <div className="mt-5 rounded-2xl border border-base-300 bg-base-100 p-4">
                                <div className="flex items-center gap-3">
                                    <span className="h-10 w-10 overflow-hidden rounded-full border border-base-300">
                                        <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-base-content">
                                            {user?.displayName || "User"}
                                        </p>
                                        <p className="truncate text-xs text-base-content/60">{user?.email || ""}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="mt-5 grid gap-2">
                                <NavLink to="/dashboard" end onClick={closeAll} className={linkClass}>
                                    <span>Overview</span>
                                    <span className="text-base-content/40">→</span>
                                </NavLink>
                                <NavLink to="/dashboard/add-art" onClick={closeAll} className={linkClass}>
                                    <span>Add Artwork</span>
                                    <span className="text-base-content/40">→</span>
                                </NavLink>
                                <NavLink to="/dashboard/my-gallery" onClick={closeAll} className={linkClass}>
                                    <span>My Gallery</span>
                                    <span className="text-base-content/40">→</span>
                                </NavLink>
                                <NavLink to="/dashboard/favourites" onClick={closeAll} className={linkClass}>
                                    <span>My Favourites</span>
                                    <span className="text-base-content/40">→</span>
                                </NavLink>
                                <NavLink to="/dashboard/profile" onClick={closeAll} className={linkClass}>
                                    <span>Profile</span>
                                    <span className="text-base-content/40">→</span>
                                </NavLink>
                            </nav>

                            <div className="mt-6 border-t border-base-300 pt-4">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="btn btn-outline btn-sm h-11 w-full rounded-xl text-error border-error"
                                >
                                    Logout
                                </button>
                            </div>
                        </Motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardLayout;
