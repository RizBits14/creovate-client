import React, { useEffect, useState } from "react";

const Explore = () => {
    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/arts?visibility=Public")
            .then((res) => res.json())
            .then((data) => {
                setArts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading artworks:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-10 max-w-7xl mx-auto mt-24 mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF]"> Explore Artworks
            </h1>

            {arts.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No public artworks available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {arts.map((art) => (
                        <div key={art._id} className="rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition overflow-hidden  bg-wite dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <img src={art.image} alt={art.title} className="h-60 w-full object-cover"/>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {art.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                    {art.artist}
                                </p>
                                <p className="text-sm italic text-gray-500 dark:text-gray-400">
                                    {art.category}
                                </p>
                                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                                    Likes: {art.likes ?? 0}
                                </p>

                                <button className="mt-3 px-5 py-2 text-sm rounded-full  bg-linear-to-r from-[#6C63FF] to-[#FF6584]  text-white font-medium hover:opacity-90 transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;
