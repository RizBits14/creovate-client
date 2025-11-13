import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";

const AddArtwork = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddArtwork = (e) => {
        e.preventDefault();
        if (!user) {
            return toast.error("You must be logged in to add artwork.");
        }

        const form = e.target;
        const newArt = {
            image: form.image.value,
            title: form.title.value,
            category: form.category.value,
            medium: form.medium.value,
            description: form.description.value,
            dimensions: form.dimensions.value || null,
            price: form.price.value || null,
            visibility: form.visibility.value,
            artist: user.displayName || "Unknown Artist",
            email: user.email,
            likes: 0,
            createdAt: new Date().toISOString(),
        };

        setLoading(true);

        fetch("http://localhost:3000/arts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newArt),
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("Artwork added successfully!");
                form.reset();
            })
            .catch(() => {
                toast.error("Failed to add artwork. Try again.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="mt-28 px-4 md:px-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8
        bg-clip-text text-transparent bg-linear-to-r 
        from-[#6C63FF] via-[#FF6584] to-[#6C63FF]">
                Add New Artwork
            </h2>

            <form
                onSubmit={handleAddArtwork}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 md:p-8 space-y-4"
            >
                {/* Image URL */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Image URL *
                    </label>
                    <input
                        type="url"
                        name="image"
                        required
                        placeholder="https://example.com/art.jpg"
                        className="input input-bordered w-full rounded-xl"
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Artwork title"
                        className="input input-bordered w-full rounded-xl"
                    />
                </div>

                {/* Category & Medium */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                            Category *
                        </label>
                        <select
                            name="category"
                            required
                            className="select select-bordered w-full rounded-xl"
                        >
                            <option value="">Select Category</option>
                            <option>Digital Art</option>
                            <option>Illustration</option>
                            <option>Photography</option>
                            <option>Abstract</option>
                            <option>Traditional</option>
                            <option>Concept Art</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                            Medium / Tools *
                        </label>
                        <input
                            type="text"
                            name="medium"
                            required
                            placeholder="e.g., Procreate, Oil on Canvas, DSLR"
                            className="input input-bordered w-full rounded-xl"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        required
                        rows="4"
                        placeholder="Describe your artwork, inspiration, and style..."
                        className="textarea textarea-bordered w-full rounded-xl"
                    ></textarea>
                </div>

                {/* Dimensions & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                            Dimensions (optional)
                        </label>
                        <input
                            type="text"
                            name="dimensions"
                            placeholder="e.g., 1920x1080 px or 24x36 in"
                            className="input input-bordered w-full rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                            Price (optional)
                        </label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            placeholder="e.g., 120"
                            className="input input-bordered w-full rounded-xl"
                        />
                    </div>
                </div>

                {/* Visibility */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                        Visibility *
                    </label>
                    <select
                        name="visibility"
                        required
                        className="select select-bordered w-full rounded-xl"
                    >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

                {/* User Info (Read-only) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                            Artist Name
                        </label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered w-full rounded-xl bg-gray-100 dark:bg-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                            Artist Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full rounded-xl bg-gray-100 dark:bg-gray-800"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full btn rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white font-semibold border-none"
                >
                    {loading ? "Adding Artwork..." : "Add Artwork"}
                </button>
            </form>
        </div>
    );
};

export default AddArtwork;
