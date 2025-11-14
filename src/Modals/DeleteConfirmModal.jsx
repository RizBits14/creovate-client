import React, { useState } from "react";
import toast from "react-hot-toast";

const DeleteConfirmModal = ({ art, onClose, onDeleted }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/arts/${art._id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                toast.error("Failed to delete artwork");
                return;
            }

            toast.success("Artwork deleted successfully!");
            onDeleted();
            onClose();   

        } catch (err) {
            console.log(err)
            toast.error("Server error while deleting");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-sm shadow-lg">

                <h2 className="text-xl font-bold text-center mb-4">Delete Artwork?</h2>

                <p className="text-center text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete <b>{art.title}</b>?
                </p>

                <div className="flex justify-center gap-4 mt-6">
                    <button className="btn" onClick={onClose} disabled={loading}>
                        No
                    </button>

                    <button className="btn bg-red-500 text-white" onClick={handleDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DeleteConfirmModal;
