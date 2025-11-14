import React, { useState } from "react";
import toast from "react-hot-toast";

const EditArtworkModal = ({ art, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({
        title: art.title || "",
        image: art.image || "",
        category: art.category || "",
        medium: art.medium || "",
        description: art.description || "",
        visibility: art.visibility || "Public",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        setLoading(true);

        fetch(`${import.meta.env.VITE_FRONTEND_URL}/arts/${art._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(() => {
                toast.success("Artwork updated!");
                onUpdated();  
            })
            .catch(() => toast.error("Failed to update artwork"))
            .finally(() => setLoading(false));
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-lg shadow-lg">

                <h2 className="text-xl font-bold mb-4">Edit Artwork</h2>

                <div className="space-y-3">
                    <input name="title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" />
                    <input name="image" value={formData.image} onChange={handleChange} className="input input-bordered w-full" />
                    <input name="category" value={formData.category} onChange={handleChange} className="input input-bordered w-full" />
                    <input name="medium" value={formData.medium} onChange={handleChange} className="input input-bordered w-full" />
                    <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" />
                    <select name="visibility" value={formData.visibility} onChange={handleChange} className="select select-bordered w-full">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-5">
                    <button className="btn" onClick={onClose}>Cancel</button>
                    <button className="btn bg-indigo-500 text-white" onClick={handleUpdate}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EditArtworkModal;
