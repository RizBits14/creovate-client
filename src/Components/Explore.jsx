import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Explore = () => {
    const [artworks, setArtworks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetch("http://localhost:3000/arts?visibility=Public")
            .then((res) => res.json())
            .then((data) => {
                setArtworks(data);
                setFiltered(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching artworks:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let updated = artworks;

        if (search.trim() !== "") {
            updated = updated.filter((a) =>
                a.title.toLowerCase().includes(search.toLowerCase()) ||
                a.artist.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== "All") {
            updated = updated.filter((a) => a.category === category);
        }

        setFiltered(updated);
    }, [search, category, artworks]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const categories = ["All", ...new Set(artworks.map((a) => a.category))];

    return (
        <div className="mt-28 px-4 md:px-10 max-w-7xl mx-auto">

            <h2 className="
                text-3xl md:text-4xl font-extrabold text-center mb-10
                bg-clip-text text-transparent bg-linear-to-r
                from-[#6C63FF] via-[#FF6584] to-[#6C63FF]
            ">
                Explore Artworks
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">

                <input type="text" placeholder="Search by title or artist..." className="input input-bordered w-full md:w-1/2 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered rounded-xl w-full md:w-1/4"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg col-span-3">
                        No artworks found.
                    </p>
                ) : (
                    filtered.map((art) => (
                        <div
                            key={art._id}
                            className=" group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <img
                                src={art.image}
                                alt={art.title}
                                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"/>

                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    {art.title}
                                </h3>

                                <p className="mt-1 text-gray-600 dark:text-gray-300">
                                    {art.artist}
                                </p>

                                <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-1">
                                    {art.category}
                                </p>

                                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                                    ❤️ <span className="font-semibold">{art.likes || 0}</span> likes
                                </p>

                                <Link to={`/art/${art._id}`}>
                                    <button
                                        className="mt-5 w-full px-4 py-2 rounded-xl bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white text-sm font-medium hover:opacity-90 transition">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Explore;
