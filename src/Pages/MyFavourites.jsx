import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyFavourites = () => {
    const { user } = useContext(AuthContext);

    const [favItems, setFavItems] = useState([]); // { favId, artworkId, art }
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    const loadFavourites = useCallback(() => {
        if (!user) return;

        setLoading(true);

        fetch(`${import.meta.env.VITE_FRONTEND_URL}/favourites?email=${user.email}`)
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
                            const res = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/arts/${fav.artworkId}`);
                            const art = await res.json();
                            return {
                                favId: fav._id,
                                artworkId: fav.artworkId,
                                art,
                            };
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
    }, [user]);

    useEffect(() => {
        loadFavourites();
    }, [loadFavourites]);

    const handleUnfavourite = (item) => {
        setRemovingId(item.artworkId);

        fetch(`${import.meta.env.VITE_FRONTEND_URL}/favourites/${item.artworkId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("Removed from favourites");
                loadFavourites();
            })
            .catch(() => {
                toast.error("Failed to remove");
            })
            .finally(() => setRemovingId(null));
    };

    if (loading) {
        return (
            <div className="mt-28 flex justify-center py-16">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="mt-28 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10
                bg-clip-text text-transparent bg-linear-to-r 
                from-[#6C63FF] via-[#FF6584] to-[#6C63FF]">
                My Favourites
            </h2>

            {favItems.length === 0 && (
                <p className="text-center text-gray-500">
                    You haven&apos;t added any favourites yet.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {favItems.map((item) => {
                    const art = item.art;

                    return (
                        <div
                            key={item.favId}
                            className="rounded-2xl shadow-md bg-white dark:bg-gray-800 overflow-hidden"
                        >
                            <img
                                src={art.image}
                                alt={art.title}
                                className="h-64 w-full object-cover"
                            />

                            <div className="p-5 flex flex-col h-full">
                                <h3 className="text-xl font-semibold text-white">Title: {art.title}</h3>

                                <p className="text-gray-600 dark:text-gray-300">
                                    {art.artist}
                                </p>

                                <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-1">Category: {art.category}
                                </p>

                                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                                    ❤️ <span className="font-semibold">{art.likes || 0}</span> likes
                                </p>

                                <div className="mt-5 flex justify-between gap-3">
                                    <Link to={`/art/${art._id}`} className="flex-1">
                                        <button className="w-full btn btn-sm rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white">
                                            View Details
                                        </button>
                                    </Link>

                                    <button
                                        className="btn btn-sm rounded-full bg-red-500 text-white flex-1"
                                        onClick={() => handleUnfavourite(item)}
                                        disabled={removingId === item.artworkId}
                                    >
                                        {removingId === item.artworkId ? "Removing..." : "Unfavourite"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyFavourites;
