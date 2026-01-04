import React from "react";

const ValueProps = () => {
    const items = [
        {
            title: "Publish Public or Private",
            desc: "Control visibility per artwork — share widely or keep it personal.",
            icon: "✨",
        },
        {
            title: "Like & Save Favourites",
            desc: "Support creators with likes and build your personal favourites list.",
            icon: "❤️",
        },
        {
            title: "Artist-first Dashboard",
            desc: "Add, edit, and manage your gallery from a dedicated dashboard.",
            icon: "🗂️",
        },
    ];

    return (
        <section className="px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                        A modern home for{" "}
                        <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            artists
                        </span>{" "}
                        and collectors
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">
                        Creovate focuses on clean discovery, fast publishing, and a professional portfolio feel.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {items.map((it) => (
                        <article
                            key={it.title}
                            className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                                <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
                            </div>

                            <div className="relative flex items-start gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-base-content/70">
                                    <span className="text-lg">{it.icon}</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold leading-snug text-base-content">
                                        {it.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                        {it.desc}
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

export default ValueProps;
