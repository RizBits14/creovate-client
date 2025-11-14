import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";

const ArtworkDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [art, setArt] = useState(null);
    const [artistArts, setArtistArts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: `/art/${id}` } });
        }
    }, [user, id, navigate]);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        let currentArt = null;

        fetch(`http://localhost:3000/arts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                currentArt = data;
                setArt(data);

                return fetch("http://localhost:3000/arts?visibility=Public");
            })
            .then((res) => res.json())
            .then((allPublicArts) => {
                if (!currentArt) return;

                const sameArtist = allPublicArts.filter(
                    (a) => a.artist && a.artist === currentArt.artist
                );

                setArtistArts(sameArtist);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching artwork/details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!art) {
        return (
            <p className="text-center mt-32 text-gray-600">
                Artwork not found.
            </p>
        );
    }

    const handleLike = () => {
        setLikeLoading(true);

        fetch(`http://localhost:3000/arts/${id}/like`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then(() => {
                setArt({ ...art, likes: (art.likes || 0) + 1 });
                toast.success("You liked this artwork!");
            })
            .catch(() => {
                toast.error("Failed to like.");
            })
            .finally(() => setLikeLoading(false));
    };

    const handleAddToFavourites = () => {
        if (!user) {
            return navigate("/login", { state: { from: `/art/${id}` } });
        }

        fetch("http://localhost:3000/favourites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userEmail: user.email,
                artworkId: id,
            }),
        })
            .then((res) => res.json())
            .then(() => toast.success("Added to Favourites!"))
            .catch(() => toast.error("Failed to add to Favourites"));
    };

    return (
        <div className="mt-28 px-4 md:px-10 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 
                bg-clip-text text-transparent bg-linear-to-r  
                from-[#6C63FF] via-[#FF6584] to-[#6C63FF]">
                {art.title}
            </h2>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2 rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-[420px] object-cover"
                    />
                </div>

                <div className="lg:w-1/2 space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                        {art.description}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-bold">Category:</span> {art.category}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-bold">Medium:</span> {art.medium}
                    </p>

                    {art.dimensions && (
                        <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-bold">Dimensions:</span> {art.dimensions}
                        </p>
                    )}

                    {art.price && (
                        <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-bold">Price:</span> ${art.price}
                        </p>
                    )}

                    <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-bold">Visibility:</span> {art.visibility}
                    </p>

                    <p className="text-xl mt-4">
                        ❤️ <span className="font-semibold">{art.likes || 0}</span> likes
                    </p>

                    <div className="flex gap-4 mt-5">
                        <button
                            onClick={handleLike}
                            disabled={likeLoading}
                            className="px-5 py-2 rounded-xl text-white font-medium
                                bg-linear-to-r from-[#6C63FF] to-[#FF6584]
                                hover:opacity-90 transition cursor-pointer"
                        >
                            {likeLoading ? "Liking..." : "Like"}
                        </button>

                        <button
                            onClick={handleAddToFavourites}
                            className="px-5 py-2 rounded-xl text-white font-medium
                                bg-linear-to-r from-[#6C63FF] to-[#FF6584]
                                hover:opacity-90 transition cursor-pointer"
                        >
                            Add to Favourites
                        </button>
                    </div>

                    <div className="mt-8 p-5 rounded-2xl shadow bg-white dark:bg-gray-800">
                        <h3 className="text-xl font-bold mb-3">Artist Info</h3>

                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {art.artist}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300">
                            Total artworks:{" "}
                            <span className="font-bold">
                                {artistArts.length}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetails;
