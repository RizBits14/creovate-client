import { Link } from "react-router";

const HowItWorks = () => {
    const steps = [
        {
            title: "Create an account",
            desc: "Register with email/password or sign in instantly with Google.",
            icon: "①",
        },
        {
            title: "Add your artworks",
            desc: "Upload details, choose category, and set Public or Private visibility.",
            icon: "②",
        },
        {
            title: "Grow your audience",
            desc: "Collect likes, appear in Featured, and build your favourites list.",
            icon: "③",
        },
    ];

    return (
        <section className="px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                            How Creovate Works
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                            A simple flow designed for a clean, portfolio-ready experience.
                        </p>
                    </div>

                    <Link to="/dashboard" className="btn btn-primary btn-sm h-11 rounded-xl">
                        Open Dashboard
                    </Link>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <article
                            key={s.title}
                            className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />
                                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-2xl" />
                            </div>

                            <div className="relative flex items-start gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-base-content/70">
                                    <span className="text-lg font-semibold">{s.icon}</span>
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-base-content/60">
                                        Step {i + 1}
                                    </div>
                                    <h3 className="mt-2 text-lg font-bold leading-snug text-base-content">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
