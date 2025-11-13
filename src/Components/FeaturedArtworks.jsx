import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/featured")
            .then((res) => res.json())
            .then((data) => {
                setArtworks(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching featured artworks:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="mt-16 px-4 md:px-10 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 
                bg-clip-text text-transparent 
                bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF]">
                Featured Artworks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {artworks.map((art) => (
                    <div key={art._id} className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1  transition-all duration-300  bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <div className="overflow-hidden">
                            <img src={art.image} alt={art.title} className="h-64 w-full object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-500" />
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-[#6C63FF] transition-colors duration-300">
                                {art.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">{art.artist}</p>
                            <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-1">{art.category}</p>

                            <Link to={`/art/${art._id}`}>
                                <button className="mt-5 w-full px-5 py-2.5 text-sm rounded-xl   bg-linear-to-r from-[#6C63FF] to-[#FF6584]  text-white font-medium shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300 cursor-pointer">
                                    View Details
                                </button>
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedArtworks;
