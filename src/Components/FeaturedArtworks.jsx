import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";

const FeaturedArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    const API = useMemo(
        () => import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL,
        []
    );

    useEffect(() => {
        let active = true;
        setLoading(true);

        fetch(`${API}/featured`)
            .then((res) => res.json())
            .then((data) => {
                if (!active) return;
                setArtworks(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                if (!active) return;
                setArtworks([]);
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [API]);

    return (
        <section className="px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <Fade triggerOnce>
                            <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                                Featured Artworks
                            </h2>
                        </Fade>
                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                            Discover standout picks curated from recent public uploads.
                        </p>
                    </div>

                    <Link to="/explore" className="btn btn-outline btn-sm h-11 rounded-xl">
                        View All
                    </Link>
                </div>

                {loading ? (
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm"
                            >
                                <div className="aspect-16/10 w-full animate-pulse bg-base-200" />
                                <div className="p-6 space-y-3">
                                    <div className="h-5 w-2/3 animate-pulse rounded-lg bg-base-200" />
                                    <div className="h-4 w-1/2 animate-pulse rounded-lg bg-base-200" />
                                    <div className="h-11 w-full animate-pulse rounded-xl bg-base-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : artworks.length === 0 ? (
                    <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm">
                        <h3 className="text-lg font-semibold text-base-content">No featured artworks yet</h3>
                        <p className="mt-2 text-sm text-base-content/70">
                            Check back soon, or explore all public artworks.
                        </p>
                        <Link to="/explore" className="inline-block mt-4">
                            <button className="btn btn-primary btn-sm h-11 rounded-xl">
                                Explore Now
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {artworks.map((art) => {
                            const id = art?._id;
                            const title = art?.title?.trim() || "Untitled Artwork";
                            const artist = art?.artist?.trim() || "Unknown Artist";
                            const category = art?.category?.trim() || "Uncategorized";
                            const imageSrc =
                                art?.image ||
                                "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60";

                            return (
                                <Zoom triggerOnce key={id || `${title}-${artist}`}>
                                    <article className="group h-full overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                        <div className="relative overflow-hidden">
                                            <div className="aspect-16/10 w-full">
                                                <img
                                                    src={imageSrc}
                                                    alt={title}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60";
                                                    }}
                                                />
                                            </div>
                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-base-100/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>

                                        <div className="flex min-h-[220px] flex-col p-6">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold leading-snug text-base-content line-clamp-1 sm:text-xl">
                                                    {title}
                                                </h3>
                                                <p className="mt-1 text-sm text-base-content/70 line-clamp-1">
                                                    {artist}
                                                </p>
                                                <p className="mt-1 text-sm italic text-base-content/60 line-clamp-1">
                                                    {category}
                                                </p>
                                            </div>

                                            <Link to={id ? `/art/${id}` : "/explore"} className="mt-5 block w-full">
                                                <button className="btn btn-sm h-11 w-full rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </article>
                                </Zoom>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedArtworks;
