import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Explore = () => {
    const API = import.meta.env.VITE_FRONTEND_URL;

    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("newest");

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let active = true;
        setLoading(true);

        fetch(`${API}/arts?visibility=Public`)
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

    useEffect(() => {
        const qpSearch = searchParams.get("search") || "";
        const qpCategory = searchParams.get("category") || "All";
        const qpSort = searchParams.get("sort") || "newest";

        setSearch(qpSearch);
        setCategory(qpCategory);
        setSort(qpSort);
    }, [searchParams]);

    const categories = useMemo(() => {
        const set = new Set((artworks || []).map((a) => a?.category).filter(Boolean));
        return ["All", ...Array.from(set)];
    }, [artworks]);

    const filtered = useMemo(() => {
        let updated = Array.isArray(artworks) ? [...artworks] : [];

        const s = search.trim().toLowerCase();
        if (s) {
            updated = updated.filter((a) => {
                const t = (a?.title || "").toLowerCase();
                const ar = (a?.artist || "").toLowerCase();
                return t.includes(s) || ar.includes(s);
            });
        }

        if (category !== "All") updated = updated.filter((a) => a?.category === category);

        if (sort === "az") {
            updated.sort((a, b) => (a?.title || "").localeCompare(b?.title || ""));
        } else if (sort === "mostLiked") {
            updated.sort((a, b) => (Number(b?.likes) || 0) - (Number(a?.likes) || 0));
        } else {
            updated.sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0));
        }

        return updated;
    }, [artworks, search, category, sort]);

    const applyParams = (next) => {
        const params = new URLSearchParams(searchParams);

        if (next.search !== undefined) {
            const v = next.search.trim();
            if (v) params.set("search", v);
            else params.delete("search");
        }

        if (next.category !== undefined) {
            if (next.category && next.category !== "All") params.set("category", next.category);
            else params.delete("category");
        }

        if (next.sort !== undefined) {
            if (next.sort && next.sort !== "newest") params.set("sort", next.sort);
            else params.delete("sort");
        }

        setSearchParams(params, { replace: true });
    };

    const handleClear = () => {
        setSearch("");
        setCategory("All");
        setSort("newest");
        setSearchParams(new URLSearchParams(), { replace: true });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <section className="px-4 pt-28 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                            Explore Artworks
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                            Search, filter, and sort public artworks with a smooth browsing experience.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="btn btn-outline btn-sm h-11 rounded-xl"
                    >
                        Clear Filters
                    </button>
                </div>

                <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5">
                    <div className="grid gap-4 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <label className="label py-0">
                                <span className="label-text font-semibold">Search</span>
                            </label>
                            <div className="join w-full">
                                <input
                                    type="text"
                                    placeholder="Search by title or artist"
                                    className="input input-bordered join-item w-full h-11 rounded-xl"
                                    value={search}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setSearch(v);
                                        applyParams({ search: v });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn join-item h-11 rounded-xl"
                                    onClick={() => applyParams({ search })}
                                    disabled={!search.trim()}
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <label className="label py-0">
                                <span className="label-text font-semibold">Category</span>
                            </label>
                            <select
                                className="select select-bordered w-full h-11 rounded-xl"
                                value={category}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    setCategory(v);
                                    applyParams({ category: v });
                                }}
                            >
                                {categories.map((cat, i) => (
                                    <option key={`${cat}-${i}`} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="label py-0">
                                <span className="label-text font-semibold">Sort</span>
                            </label>
                            <select
                                className="select select-bordered w-full h-11 rounded-xl"
                                value={sort}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    setSort(v);
                                    applyParams({ sort: v });
                                }}
                            >
                                <option value="newest">Newest</option>
                                <option value="mostLiked">Most Liked</option>
                                <option value="az">Title (A → Z)</option>
                            </select>
                        </div>

                        <div className="md:col-span-12 flex flex-wrap items-center justify-between gap-3 pt-1">
                            <div className="text-sm text-base-content/70">
                                Showing{" "}
                                <span className="font-semibold text-base-content">{filtered.length}</span>{" "}
                                result{filtered.length === 1 ? "" : "s"}
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {search.trim() && (
                                    <span className="badge badge-outline">Search: {search.trim()}</span>
                                )}
                                {category !== "All" && (
                                    <span className="badge badge-outline">Category: {category}</span>
                                )}
                                {sort !== "newest" && (
                                    <span className="badge badge-outline">
                                        Sort: {sort === "mostLiked" ? "Most Liked" : "A → Z"}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-base-content">No artworks found</h3>
                            <p className="mt-2 text-sm text-base-content/70">
                                Try a different search term or switch the category.
                            </p>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="btn btn-primary btn-sm h-11 rounded-xl mt-5"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        filtered.map((art) => {
                            const title = art?.title?.trim() || "Untitled Artwork";
                            const artist = art?.artist?.trim() || "Unknown Artist";
                            const cat = art?.category?.trim() || "Uncategorized";
                            const likes = Number.isFinite(Number(art?.likes)) ? Number(art.likes) : 0;
                            const imageSrc =
                                art?.image ||
                                "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60";

                            return (
                                <article
                                    key={art?._id || `${title}-${artist}`}
                                    className="group h-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div className="relative w-full overflow-hidden">
                                        <div className="aspect-16/10 w-full">
                                            <img
                                                src={imageSrc}
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

                                    <div className="flex min-h-[200px] flex-col p-5">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold leading-snug text-base-content line-clamp-1">
                                                {title}
                                            </h3>
                                            <p className="mt-1 text-sm text-base-content/70 line-clamp-1">{artist}</p>
                                            <p className="mt-1 text-sm italic text-base-content/60 line-clamp-1">
                                                {cat}
                                            </p>
                                            <p className="mt-2 text-sm text-base-content/70">
                                                ❤️ <span className="font-semibold text-base-content">{likes}</span> likes
                                            </p>
                                        </div>

                                        <Link
                                            to={art?._id ? `/art/${art._id}` : "/explore"}
                                            className="mt-4 block w-full"
                                            aria-label={`View details for ${title}`}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-sm h-11 w-full rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                            >
                                                View Details
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

export default Explore;
