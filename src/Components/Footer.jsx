import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const year = new Date().getFullYear();

    const socials = {
        x: "https://x.com/",
        instagram: "https://www.instagram.com/",
        facebook: "https://www.facebook.com/",
        github: "https://github.com/",
    };

    return (
        <footer className="mt-16 border-t border-base-300 bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-10">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <span className="text-2xl font-extrabold tracking-tight text-base-content">
                                Creovate
                            </span>
                        </Link>

                        <p className="mt-3 max-w-md text-sm leading-relaxed text-base-content/70 sm:text-base">
                            A creative hub for artists and art lovers to share, explore, and celebrate
                            digital and traditional artworks in one place.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <span className="badge badge-outline">Gallery</span>
                            <span className="badge badge-outline">Community</span>
                            <span className="badge badge-outline">Discover</span>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content">
                            Quick Links
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="text-base-content/70 transition-colors hover:text-primary"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/explore"
                                    className="text-base-content/70 transition-colors hover:text-primary"
                                >
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-base-content/70 transition-colors hover:text-primary"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-base-content/70 transition-colors hover:text-primary"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="text-base-content/70 transition-colors hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content">
                            Stay Connected
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-base-content/70 sm:text-base">
                            Have feedback, collaboration ideas, or a portfolio to share? Reach out anytime.
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/70">
                                <FaEnvelope />
                            </span>
                            <a
                                href="mailto:hello@creovate.art"
                                className="text-sm text-base-content/70 transition-colors hover:text-primary"
                            >
                                hello@creovate.art
                            </a>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <a
                                href={socials.x}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/70 transition-all hover:-translate-y-0.5 hover:border-base-300 hover:bg-base-200 hover:text-base-content"
                            >
                                <FaXTwitter className="text-lg" />
                            </a>
                            <a
                                href={socials.instagram}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/70 transition-all hover:-translate-y-0.5 hover:border-base-300 hover:bg-base-200 hover:text-base-content"
                            >
                                <FaInstagram className="text-lg" />
                            </a>
                            <a
                                href={socials.facebook}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/70 transition-all hover:-translate-y-0.5 hover:border-base-300 hover:bg-base-200 hover:text-base-content"
                            >
                                <FaFacebookF className="text-lg" />
                            </a>
                            <a
                                href={socials.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/70 transition-all hover:-translate-y-0.5 hover:border-base-300 hover:bg-base-200 hover:text-base-content"
                            >
                                <FaGithub className="text-lg" />
                            </a>
                        </div>

                        <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-4">
                            <p className="text-xs leading-relaxed text-base-content/60">
                                Replace social URLs with your real profiles for portfolio grading.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-2 border-t border-base-300 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p className="text-xs text-base-content/60">
                        © {year} Creovate · Crafted for art lovers & creators.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-base-content/60 sm:justify-end">
                        <Link to="/privacy" className="transition-colors hover:text-primary">
                            Privacy
                        </Link>
                        <span className="opacity-40">•</span>
                        <Link to="/terms" className="transition-colors hover:text-primary">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
