import React from "react";
import { Link } from "react-router-dom";

const CategoriesShowcase = () => {
    const categories = [
        {
            name: "Digital Art",
            blurb: "Modern visuals, 3D, generative, and mixed media.",
        },
        {
            name: "Illustration",
            blurb: "Characters, storytelling, and stylized concepts.",
        },
        {
            name: "Photography",
            blurb: "Moments, portraits, landscapes, and street shots.",
        },
        {
            name: "Abstract",
            blurb: "Shapes, emotions, and expressive compositions.",
        },
        {
            name: "Traditional",
            blurb: "Ink, watercolor, acrylic, and classic techniques.",
        },
        {
            name: "Concept Art",
            blurb: "World-building, environments, and design studies.",
        },
    ];

    return (
        <section className="px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                            Browse by Category
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                            Filter quickly by style to find what matches your taste.
                        </p>
                    </div>

                    <Link to="/explore" className="btn btn-outline btn-sm h-11 rounded-xl">
                        Open Explore
                    </Link>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat) => {
                        const href = `/explore?category=${encodeURIComponent(cat.name)}`;
                        return (
                            <Link
                                key={cat.name}
                                to={href}
                                className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                aria-label={`Explore ${cat.name}`}
                            >
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />
                                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-2xl" />
                                </div>

                                <div className="relative flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-semibold text-base-content">
                                                {cat.name}
                                            </span>
                                            <span className="badge badge-outline text-xs text-base-content/70">
                                                Category
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 line-clamp-2">
                                            {cat.blurb}
                                        </p>
                                    </div>

                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-300 bg-base-100/70 text-base-content/70 transition-all duration-300 group-hover:border-base-300 group-hover:bg-base-200 group-hover:text-base-content">
                                        <span className="text-lg">→</span>
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoriesShowcase;
