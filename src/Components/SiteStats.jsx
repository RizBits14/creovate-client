import { useEffect, useMemo, useState } from "react";

const SiteStats = () => {
    const API = useMemo(
        () => import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL,
        []
    );

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ artworks: 0, artists: 0, likes: 0 });

    useEffect(() => {
        let active = true;
        setLoading(true);

        fetch(`${API}/arts?visibility=Public`)
            .then((r) => r.json())
            .then((data) => {
                if (!active) return;
                const list = Array.isArray(data) ? data : [];
                const artworks = list.length;
                const artists = new Set(list.map((a) => (a?.artist || "").trim()).filter(Boolean)).size;
                const likes = list.reduce((sum, a) => sum + (Number(a?.likes) || 0), 0);
                setStats({ artworks, artists, likes });
                setLoading(false);
            })
            .catch(() => {
                if (!active) return;
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [API]);

    return (
        <section className="px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
                    </div>

                    <div className="relative p-6 sm:p-8 md:p-10">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div className="max-w-2xl">
                                <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
                                    Live Community Stats
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                    These numbers are calculated from your backend using public artworks.
                                </p>
                            </div>

                            {!loading && (
                                <div className="text-sm text-base-content/60">
                                    Updated from live data
                                </div>
                            )}
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {loading ? (
                                <>
                                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
                                        <div className="h-4 w-28 animate-pulse rounded-lg bg-base-200" />
                                        <div className="mt-3 h-9 w-24 animate-pulse rounded-xl bg-base-200" />
                                        <div className="mt-4 h-3 w-32 animate-pulse rounded-lg bg-base-200" />
                                    </div>
                                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
                                        <div className="h-4 w-28 animate-pulse rounded-lg bg-base-200" />
                                        <div className="mt-3 h-9 w-24 animate-pulse rounded-xl bg-base-200" />
                                        <div className="mt-4 h-3 w-32 animate-pulse rounded-lg bg-base-200" />
                                    </div>
                                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
                                        <div className="h-4 w-28 animate-pulse rounded-lg bg-base-200" />
                                        <div className="mt-3 h-9 w-24 animate-pulse rounded-xl bg-base-200" />
                                        <div className="mt-4 h-3 w-32 animate-pulse rounded-lg bg-base-200" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                                        <p className="text-sm font-semibold text-base-content/70">Public Artworks</p>
                                        <p className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">
                                            {stats.artworks}
                                        </p>
                                        <p className="mt-3 text-xs text-base-content/60">
                                            Total public uploads available to explore
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                                        <p className="text-sm font-semibold text-base-content/70">Active Artists</p>
                                        <p className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">
                                            {stats.artists}
                                        </p>
                                        <p className="mt-3 text-xs text-base-content/60">
                                            Unique artist names found in public uploads
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                                        <p className="text-sm font-semibold text-base-content/70">Total Likes</p>
                                        <p className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">
                                            {stats.likes}
                                        </p>
                                        <p className="mt-3 text-xs text-base-content/60">
                                            Sum of likes across all public artworks
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SiteStats;
