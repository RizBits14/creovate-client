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
    const [isFavourite, setIsFavourite] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    const defaultArtistPhoto =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: `/art/${id}` } });
        }
    }, [user, id, navigate]);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        let current = null;

        fetch(`http://localhost:3000/arts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                current = data;
                setArt(data);

                if (user?.email) {
                    return fetch(
                        `http://localhost:3000/favourites/check?email=${user.email}&artId=${id}`
                    );
                }
                return { json: () => ({ exists: false }) };
            })
            .then((res) => res.json())
            .then((fav) => {
                if (fav.exists) setIsFavourite(true);

                return fetch("http://localhost:3000/arts?visibility=Public");
            })
            .then((res) => res.json())
            .then((publicArts) => {
                const sameArtist = publicArts.filter(
                    (a) => a.artist === current.artist
                );
                setArtistArts(sameArtist);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, user]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!art) {
        return (
            <p className="text-center mt-32 text-gray-600 dark:text-gray-300">
                Artwork not found.
            </p>
        );
    }

    const artistPhoto =
        art.artistPhoto ||
        (user?.email === art.email ? user?.photoURL : null) ||
        defaultArtistPhoto;

    const handleLike = () => {
        setLikeLoading(true);

        fetch(`http://localhost:3000/arts/${id}/like`, { method: "PATCH" })
            .then((res) => res.json())
            .then(() => {
                setArt((prev) => ({
                    ...prev,
                    likes: (prev.likes || 0) + 1,
                }));
                toast.success("You liked this artwork!");
            })
            .catch(() => toast.error("Failed to like"))
            .finally(() => setLikeLoading(false));
    };

    const handleAddToFavourites = () => {
        if (!user) {
            return navigate("/login", { state: { from: `/art/${id}` } });
        }

        if (isFavourite) return;

        setFavLoading(true);

        fetch("http://localhost:3000/favourites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userEmail: user.email,
                artworkId: id,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                setIsFavourite(true);
                toast.success("Added to favourites!");
            })
            .catch(() => toast.error("Failed to add"))
            .finally(() => setFavLoading(false));
    };

    return (
        <div className="mt-28 px-4 md:px-10 max-w-7xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14
                bg-clip-text text-transparent bg-linear-to-r 
                from-[#6C63FF] via-[#FF6584] to-[#6C63FF] drop-shadow-lg">
                {art.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div className="rounded-3xl p-3 shadow-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 flex justify-center items-center transition hover:scale-[1.01]">
                    <img
                        src={art.image}
                        alt={art.title}
                        className="rounded-2xl w-full h-64 sm:h-80 md:h-[420px] lg:h-[500px] object-cover shadow-xl transition-all"
                    />
                </div>

                <div className="p-8 rounded-3xl shadow-xl bg-gray-900 text-gray-200 dark:bg-gray-800 
                    border border-gray-700 hover:border-[#6C63FF] transition">

                    <p className="text-gray-300 leading-relaxed text-lg mb-6 animate-fadeIn text-justify">
                        {art.description}
                    </p>

                    <div className="space-y-2 text-sm">
                        <p><span className="font-bold text-white">Category:</span> {art.category}</p>
                        <p><span className="font-bold text-white">Medium:</span> {art.medium}</p>

                        {art.dimensions && (
                            <p><span className="font-bold text-white">Dimensions:</span> {art.dimensions}</p>
                        )}

                        {art.price && (
                            <p><span className="font-bold text-white">Price:</span> ${art.price}</p>
                        )}

                        <p><span className="font-bold text-white">Visibility:</span> {art.visibility}</p>
                    </div>

                    <p className="text-xl mt-6 flex items-center gap-2">
                        <span className="text-pink-400 text-2xl animate-pulse">❤️</span>
                        <span className="font-bold">{art.likes || 0}</span> likes
                    </p>

                    <div className="flex gap-5 mt-6">
                        <button
                            onClick={handleLike}
                            disabled={likeLoading}
                            className="px-6 py-2.5 rounded-xl text-white font-semibold 
                                bg-linear-to-r from-indigo-500 to-pink-500 
                                hover:opacity-90 shadow-lg transition hover:scale-105"
                        >
                            {likeLoading ? "Liking..." : "Like"}
                        </button>

                        <button
                            onClick={handleAddToFavourites}
                            disabled={isFavourite || favLoading}
                            className={`px-6 py-2.5 rounded-xl text-white font-semibold 
                                transition shadow-lg hover:scale-105
                                ${isFavourite
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-linear-to-r from-pink-500 to-indigo-500 hover:opacity-90"
                                }`}
                        >
                            {isFavourite ? "Added ✓" : favLoading ? "Adding..." : "Add to Favourites"}
                        </button>
                    </div>

                    <div className="mt-10 p-5 bg-gray-800/70 border border-gray-700 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Artist Info</h3>

                        <div className="flex items-center gap-4">
                            <img
                                src={artistPhoto}
                                alt="Artist"
                                className="w-14 h-14 rounded-full object-cover border border-gray-600"
                            />

                            <div>
                                <p className="font-semibold text-gray-100">{art.artist}</p>
                                <p className="text-gray-400 text-sm">
                                    Total artworks: <span className="font-bold">{artistArts.length}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ArtworkDetails;
