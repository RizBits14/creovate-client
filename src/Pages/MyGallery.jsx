import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import EditArtworkModal from "../Modals/EditArtworkModal";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import { Link } from "react-router-dom";

const MyGallery = () => {
    const { user } = useContext(AuthContext);

    const [myArts, setMyArts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedArt, setSelectedArt] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const API = useMemo(
        () => import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL,
        []
    );

    const loadMyArts = useCallback(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`${API}/my-arts?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setMyArts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading gallery:", err);
                toast.error("Failed to load your artworks.");
                setLoading(false);
            });
    }, [API, user?.email]);

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
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold">My Gallery</h2>
                    <p className="text-sm text-base-content/70 mt-2">
                        Manage your artworks: edit details or delete items.
                    </p>
                </div>

                <Link to="/dashboard/add-art" className="btn btn-primary btn-sm w-fit">
                    Add Artwork
                </Link>
            </div>

            {/* Loading skeleton */}
            {loading && (
                <div className="mt-8 space-y-3">
                    <div className="skeleton h-10 w-full" />
                    <div className="skeleton h-10 w-full" />
                    <div className="skeleton h-10 w-full" />
                    <div className="skeleton h-10 w-full" />
                </div>
            )}

            {!loading && myArts.length === 0 && (
                <div className="mt-8 alert">
                    <span className="text-sm">
                        You have not added any artworks yet. Click <span className="font-semibold">Add Artwork</span> to begin.
                    </span>
                </div>
            )}

            {!loading && myArts.length > 0 && (
                <div className="mt-8 overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Artwork</th>
                                <th>Category</th>
                                <th>Visibility</th>
                                <th className="text-right">Likes</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myArts.map((art) => (
                                <tr key={art._id}>
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
                                                    {art.medium || "—"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{art.category || "—"}</td>
                                    <td>
                                        <span className={`badge ${art.visibility === "Public" ? "badge-success" : "badge-ghost"}`}>
                                            {art.visibility || "—"}
                                        </span>
                                    </td>
                                    <td className="text-right">{art.likes || 0}</td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="btn btn-sm btn-outline" onClick={() => openEditModal(art)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-error" onClick={() => openDeleteModal(art)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

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
