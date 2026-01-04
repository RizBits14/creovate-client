import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const TopArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);

        fetch("/topartists.json")
            .then((res) => res.json())
            .then((data) => {
                if (!active) return;
                setArtists(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                if (!active) return;
                setArtists([]);
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
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                        Top Artists of the Week
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                        Discover creators making waves this week and explore their latest uploads.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        skeletons.map((i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm"
                            >
                                <div className="p-6 text-center">
                                    <div className="mx-auto h-28 w-28 animate-pulse rounded-full bg-base-200" />
                                    <div className="mt-5 h-5 w-2/3 mx-auto animate-pulse rounded-lg bg-base-200" />
                                    <div className="mt-3 h-4 w-1/2 mx-auto animate-pulse rounded-lg bg-base-200" />
                                    <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-base-200" />
                                </div>
                            </div>
                        ))
                    ) : artists.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-base-content">No artists available</h3>
                            <p className="mt-2 text-sm text-base-content/70">
                                Please check back soon for weekly highlights.
                            </p>
                            <Link to="/explore" className="inline-block mt-5">
                                <button className="btn btn-primary btn-sm h-11 rounded-xl">
                                    Explore Artworks
                                </button>
                            </Link>
                        </div>
                    ) : (
                        artists.map((artist, index) => {
                            const name = artist?.name?.trim() || "Featured Artist";
                            const artworksCount = Number.isFinite(Number(artist?.artworks))
                                ? Number(artist.artworks)
                                : 0;

                            const img =
                                artist?.image ||
                                "https://images.unsplash.com/photo-1520975682030-32a6c62f9fba?auto=format&fit=crop&w=800&q=60";

                            const exploreHref = `/explore?search=${encodeURIComponent(name)}`;

                            return (
                                <article
                                    key={`${name}-${index}`}
                                    className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div className="p-6 text-center">
                                        <div className="relative mx-auto h-28 w-28">
                                            <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/40 via-secondary/30 to-primary/40 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            <img
                                                src={img}
                                                alt={name}
                                                loading="lazy"
                                                className="relative h-28 w-28 rounded-full object-cover border border-base-300"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "https://images.unsplash.com/photo-1520975682030-32a6c62f9fba?auto=format&fit=crop&w=800&q=60";
                                                }}
                                            />
                                        </div>

                                        <h3 className="mt-5 text-lg font-semibold text-base-content sm:text-xl line-clamp-1">
                                            {name}
                                        </h3>

                                        <p className="mt-2 text-sm text-base-content/70">
                                            {artworksCount} Artwork{artworksCount === 1 ? "" : "s"}
                                        </p>

                                        <Link to={exploreHref} className="mt-6 block">
                                            <button className="btn btn-sm h-11 w-full rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95">
                                                Explore Works
                                            </button>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default TopArtists;
