import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const CommunityHighlights = () => {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        fetch("/community.json")
            .then((res) => res.json())
            .then((data) => {
                if (!active) return;
                setHighlights(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                if (!active) return;
                setHighlights([]);
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const skeletons = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);

    return (
        <section className="px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                            Community Highlights
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                            Explore standout creations and moments shared by the community.
                        </p>
                    </div>

                    <Link to="/explore" className="btn btn-outline btn-sm h-11 rounded-xl">
                        Explore More
                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {loading
                        ? skeletons.map((i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm"
                            >
                                <div className="aspect-16/10 w-full animate-pulse bg-base-200" />
                                <div className="p-6">
                                    <div className="h-5 w-2/3 animate-pulse rounded-lg bg-base-200" />
                                    <div className="mt-3 h-4 w-full animate-pulse rounded-lg bg-base-200" />
                                    <div className="mt-2 h-4 w-5/6 animate-pulse rounded-lg bg-base-200" />
                                </div>
                            </div>
                        ))
                        : highlights.map((item, index) => {
                            const title = item?.title?.trim() || "Community Feature";
                            const desc =
                                (item?.desc || "").trim() || "Details are not available.";
                            const img =
                                item?.image ||
                                "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60";

                            return (
                                <article
                                    key={`${title}-${index}`}
                                    className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div className="relative w-full overflow-hidden">
                                        <div className="aspect-16/10 w-full">
                                            <img
                                                src={img}
                                                alt={title}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60";
                                                }}
                                            />
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-base-100/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold leading-snug text-base-content sm:text-xl line-clamp-1">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 line-clamp-3">
                                            {desc}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                </div>

                {!loading && highlights.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm">
                        <h3 className="text-lg font-semibold text-base-content">
                            No highlights available
                        </h3>
                        <p className="mt-2 text-sm text-base-content/70">
                            Please check back soon for new community features.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CommunityHighlights;
