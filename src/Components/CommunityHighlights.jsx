import React, { useEffect, useState } from "react";

const CommunityHighlights = () => {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/community.json")
            .then((res) => res.json())
            .then((data) => {
                setHighlights(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching community highlights:", err);
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
                Community Highlights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {highlights.map((item, index) => (
                    <div
                        key={index}
                        className="
                            bg-white dark:bg-gray-800 
                            rounded-3xl shadow-md hover:shadow-xl 
                            transition-all duration-300 
                            overflow-hidden hover:-translate-y-1
                        "
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="
                                w-full h-64 object-cover 
                                transition-transform duration-700 
                                hover:scale-105
                            "
                        />

                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityHighlights;
