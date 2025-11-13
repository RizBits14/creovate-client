import React, { useEffect, useState } from "react";

const TopArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/topartists.json")
            .then((res) => res.json())
            .then((data) => {
                setArtists(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching artists:", err);
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
        <div className="mt-20 px-4 md:px-10 max-w-7xl mx-auto">
            <h2
                className="
                    text-3xl md:text-4xl font-extrabold text-center mb-12 
                    bg-clip-text text-transparent 
                    bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF]
                "
            >
                Top Artists of the Week
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {artists.map((artist, index) => (
                    <div
                        key={index}
                        className="
                            bg-white dark:bg-gray-800 
                            rounded-3xl shadow-md hover:shadow-xl 
                            transition-all duration-300 
                            p-6 text-center hover:-translate-y-1
                        "
                    >
                        <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-purple-300 mb-4"
                        />

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {artist.name}
                        </h3>

                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {artist.artworks} Artworks
                        </p>

                        <button
                            className="
                                mt-5 px-5 py-2 rounded-xl text-sm font-medium
                                text-white bg-linear-to-r from-[#6C63FF] to-[#FF6584]
                                hover:opacity-90 transition-all duration-300
                            "
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopArtists;
