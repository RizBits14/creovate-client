/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
} from "recharts";
import { Link } from "react-router-dom";

const PIE_COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
    "#A855F7",
    "#EC4899",
];

const DashboardHome = () => {
    const API = import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL;
    const { user } = useContext(AuthContext);

    const [myArts, setMyArts] = useState([]);
    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        let active = true;
        setLoading(true);

        Promise.all([
            fetch(`${API}/my-arts?email=${encodeURIComponent(user.email)}`).then((r) => r.json()),
            fetch(`${API}/favourites?email=${encodeURIComponent(user.email)}`).then((r) => r.json()),
        ])
            .then(([artsData, favData]) => {
                if (!active) return;
                setMyArts(Array.isArray(artsData) ? artsData : []);
                setFavs(Array.isArray(favData) ? favData : []);
                setLoading(false);
            })
            .catch(() => {
                if (!active) return;
                setMyArts([]);
                setFavs([]);
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [API, user?.email]);

    const totalLikes = useMemo(
        () => myArts.reduce((sum, a) => sum + (Number(a?.likes) || 0), 0),
        [myArts]
    );

    const chartData = useMemo(() => {
        const map = new Map();
        myArts.forEach((a) => {
            const key = (a?.category || "Uncategorized").trim() || "Uncategorized";
            map.set(key, (map.get(key) || 0) + 1);
        });
        return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
    }, [myArts]);

    const likesTrend = useMemo(() => {
        const recent = [...myArts]
            .sort((a, b) => new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0))
            .slice(-8);

        return recent.map((a, idx) => ({
            name: a?.title
                ? a.title.length > 12
                    ? a.title.slice(0, 12) + "…"
                    : a.title
                : `Art ${idx + 1}`,
            likes: Number(a?.likes) || 0,
        }));
    }, [myArts]);

    const recentRows = useMemo(() => {
        return [...myArts]
            .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
            .slice(0, 6);
    }, [myArts]);

    const stats = useMemo(
        () => [
            { label: "My Artworks", value: myArts.length, hint: "Total uploads in your gallery" },
            { label: "Total Likes", value: totalLikes, hint: "Likes across all your artworks" },
            { label: "Favourites", value: favs.length, hint: "Saved items you’ve favourited" },
        ],
        [myArts.length, totalLikes, favs.length]
    );

    const Skeleton = () => (
        <div className="space-y-6">
            <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="h-7 w-56 animate-pulse rounded-xl bg-base-200" />
                <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded-xl bg-base-200" />
                <div className="mt-6 flex flex-wrap gap-3">
                    <div className="h-11 w-36 animate-pulse rounded-xl bg-base-200" />
                    <div className="h-11 w-36 animate-pulse rounded-xl bg-base-200" />
                </div>
            </div>
        </div>
    );

    if (loading) return <Skeleton />;

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-2xl font-extrabold">Dashboard Overview</h2>
                        <p className="mt-2 text-sm text-base-content/70">
                            Your activity summary and analytics based on real data.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to="/dashboard/add-art"
                            className="btn btn-sm h-11 rounded-xl text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                        >
                            Add Artwork
                        </Link>
                        <Link to="/explore" className="btn btn-outline btn-sm h-11 rounded-xl">
                            Explore Public
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className={`rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm`}
                    >
                        <p className="text-sm font-semibold text-base-content/70">{s.label}</p>
                        <p className="mt-2 text-3xl font-extrabold">{s.value}</p>
                        <p className="mt-3 text-xs text-base-content/60">{s.hint}</p>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold">Artworks by Category</h3>
                    <div className="mt-4 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={95}
                                >
                                    {chartData.map((_, i) => (
                                        <Cell
                                            key={i}
                                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold">Likes Trend</h3>
                    <div className="mt-4 h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={likesTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="likes" stroke="#6366F1" strokeWidth={2} dot />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Recent Uploads</h3>
                    <Link to="/dashboard/my-gallery" className="btn btn-outline btn-sm h-11 rounded-xl">
                        View All
                    </Link>
                </div>

                <div className="mt-4 overflow-x-auto rounded-2xl border border-base-300">
                    <table className="table table-sm">
                        <thead className="bg-base-200">
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th className="text-right">Likes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentRows.map((a, i) => (
                                <tr
                                    key={a?._id || i}
                                    // className={i % 2 === 0 ? "bg-indigo-50/40" : "bg-purple-50/40"}
                                >
                                    <td className="font-semibold">{a?.title || "Untitled"}</td>
                                    <td className="text-indigo-600">{a?.category || "—"}</td>
                                    <td className="text-right font-bold text-purple-600">
                                        {Number(a?.likes) || 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default DashboardHome;
