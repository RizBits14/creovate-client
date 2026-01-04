import { Link } from "react-router-dom";

const About = () => {
    return (
        <section className="mt-28 px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
                        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-secondary/10" />
                    </div>

                    <div className="relative p-6 sm:p-8 md:p-10">
                        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
                                    About Creovate
                                </h1>
                                <p className="mt-4 text-sm leading-relaxed text-base-content/75 sm:text-base">
                                    Creovate is a creative hub where artists share artworks and art lovers discover new styles.
                                    Browse public artworks, explore categories, and build your personal favourites collection —
                                    all with a clean, portfolio-ready experience.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Link to="/explore" className="btn btn-outline btn-sm h-11 rounded-xl">
                                    Explore Artworks
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="btn btn-sm h-11 rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                >
                                    Open Dashboard
                                </Link>
                            </div>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            <article className="group rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-base-content/70">
                                        <span className="text-lg">🔎</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-base-content">Discover</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                            Explore the newest public artworks with search, filters, and sorting for faster discovery.
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <article className="group rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-base-content/70">
                                        <span className="text-lg">📌</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-base-content">Collect</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                            Save artworks to favourites and keep a personal collection you can revisit anytime.
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <article className="group rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-base-content/70">
                                        <span className="text-lg">🎨</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-base-content">Create</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                            Upload your own artworks, control visibility, and manage everything from your dashboard.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div className="mt-10 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-base-content">Built for artists and collectors</p>
                                    <p className="mt-1 text-sm text-base-content/70">
                                        Clean UI, responsive layout, and fast discovery with real features — no filler.
                                    </p>
                                </div>
                                <Link to="/explore" className="btn btn-primary btn-sm h-11 rounded-xl">
                                    Start Exploring
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
