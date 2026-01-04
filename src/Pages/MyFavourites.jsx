import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyFavourites = () => {
    const { user } = useContext(AuthContext);

    const [favItems, setFavItems] = useState([]); // { favId, artworkId, art }
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    const API = useMemo(
        () => import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL,
        []
    );

    const loadFavourites = useCallback(() => {
        if (!user?.email) return;

        setLoading(true);

        fetch(`${API}/favourites?email=${user.email}`)
            .then((res) => res.json())
            .then(async (favs) => {
                if (!Array.isArray(favs) || favs.length === 0) {
                    setFavItems([]);
                    setLoading(false);
                    return;
                }

                const detailed = await Promise.all(
                    favs.map(async (fav) => {
                        try {
                            const res = await fetch(`${API}/arts/${fav.artworkId}`);
                            const art = await res.json();
                            return { favId: fav._id, artworkId: fav.artworkId, art };
                        } catch {
                            return null;
                        }
                    })
                );

                setFavItems(detailed.filter((item) => item && item.art && item.art._id));
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading favourites:", err);
                toast.error("Failed to load favourites.");
                setLoading(false);
            });
    }, [API, user?.email]);

    useEffect(() => {
        loadFavourites();
    }, [loadFavourites]);

    const handleUnfavourite = async (item) => {
        if (!user?.email) return;

        setRemovingId(item.artworkId);

        try {
            // ✅ backend should delete with BOTH artworkId + email
            const res = await fetch(
                `${API}/favourites/${item.artworkId}?email=${encodeURIComponent(user.email)}`,
                { method: "DELETE" }
            );

            if (!res.ok) throw new Error("Failed");

            toast.success("Removed from favourites");
            loadFavourites();
        } catch {
            toast.error("Failed to remove");
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold">My Favourites</h2>
                    <p className="text-sm text-base-content/70 mt-2">
                        Quick access to artworks you saved.
                    </p>
                </div>

                <Link to="/explore" className="btn btn-outline btn-sm w-fit">
                    Explore More
                </Link>
            </div>

            {loading && (
                <div className="mt-8 space-y-3">
                    <div className="skeleton h-10 w-full" />
                    <div className="skeleton h-10 w-full" />
                    <div className="skeleton h-10 w-full" />
                    <div className="skeleton h-10 w-full" />
                </div>
            )}

            {!loading && favItems.length === 0 && (
                <div className="mt-8 alert">
                    <span className="text-sm">You haven’t added any favourites yet.</span>
                </div>
            )}

            {!loading && favItems.length > 0 && (
                <div className="mt-8 overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Artwork</th>
                                <th>Category</th>
                                <th className="text-right">Likes</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {favItems.map((item) => {
                                const art = item.art;
                                return (
                                    <tr key={item.favId}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded-xl border border-base-300 overflow-hidden">
                                                        <img src={art.image} alt={art.title} className="object-cover" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{art.title}</div>
                                                    <div className="text-sm text-base-content/70 line-clamp-1">
                                                        {art.artist || "—"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{art.category || "—"}</td>
                                        <td className="text-right">{art.likes || 0}</td>

                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link to={`/art/${art._id}`} className="btn btn-sm btn-outline">
                                                    View
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-error"
                                                    onClick={() => handleUnfavourite(item)}
                                                    disabled={removingId === item.artworkId}
                                                >
                                                    {removingId === item.artworkId ? (
                                                        <span className="loading loading-spinner loading-xs" />
                                                    ) : (
                                                        "Remove"
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFavourites;
