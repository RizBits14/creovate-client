import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import EditArtworkModal from "../Modals/EditArtworkModal";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";

const MyGallery = () => {
    const { user } = useContext(AuthContext);

    const [myArts, setMyArts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedArt, setSelectedArt] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const loadMyArts = useCallback(() => {
        if (!user) return;

        fetch(`${import.meta.env.VITE_FRONTEND_URL}/my-arts?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyArts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading gallery:", err);
                toast.error("Failed to load your artworks.");
                setLoading(false);
            });
    }, [user]);

    useEffect(() => {
        loadMyArts();
    }, [loadMyArts]);

    const openEditModal = (art) => {
        setSelectedArt(art);
        setShowEditModal(true);
    };

    const openDeleteModal = (art) => {
        setSelectedArt(art);
        setShowDeleteModal(true);
    };

    return (
        <div className="mt-28 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-linear-to-r  from-[#6C63FF] via-[#FF6584] to-[#6C63FF]">
                My Gallery
            </h2>

            {loading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}

            {!loading && myArts.length === 0 && (
                <p className="text-center text-gray-500">
                    You have not added any artworks yet.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {myArts.map((art) => (
                    <div key={art._id} className="rounded-2xl shadow-md bg-white dark:bg-gray-800 overflow-hidden">
                        <img src={art.image} alt={art.title} className="h-64 w-full object-cover"/>

                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-white">Title: {art.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Category: {art.category}</p>

                            <div className="mt-5 flex justify-between">
                                <button className="btn btn-sm rounded-full bg-indigo-500 text-white" onClick={() => openEditModal(art)}>
                                    Edit
                                </button>

                                <button className="btn btn-sm rounded-full bg-red-500 text-white" onClick={() => openDeleteModal(art)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showEditModal && selectedArt && (
                <EditArtworkModal
                    art={selectedArt}
                    onClose={() => setShowEditModal(false)}
                    onUpdated={() => {
                        setShowEditModal(false);
                        loadMyArts();
                    }}
                />
            )}

            {showDeleteModal && selectedArt && (
                <DeleteConfirmModal
                    art={selectedArt}
                    onClose={() => setShowDeleteModal(false)}
                    onDeleted={() => {
                        setShowDeleteModal(false);
                        loadMyArts();
                    }}
                />
            )}
        </div>
    );
};

export default MyGallery;
