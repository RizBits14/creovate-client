import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const AddArtwork = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();

    const API = useMemo(
        () => import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL,
        []
    );

    const isValidUrl = (value) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    };

    const parseExtraImages = (value) => {
        if (!value?.trim()) return [];
        // Allow comma OR newline separated URLs
        return value
            .split(/[\n,]+/)
            .map((s) => s.trim())
            .filter(Boolean)
            .filter((u) => isValidUrl(u));
    };

    const handleAddArtwork = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!user) {
            toast.error("You must be logged in to add artwork.");
            return;
        }

        const form = e.target;

        const image = form.image.value.trim();
        const title = form.title.value.trim();
        const category = form.category.value;
        const medium = form.medium.value.trim();
        const description = form.description.value.trim();
        const extraImagesRaw = form.extraImages.value;

        if (!isValidUrl(image)) {
            setFormError("Please provide a valid Image URL.");
            return;
        }
        if (title.length < 2) {
            setFormError("Title must be at least 2 characters.");
            return;
        }
        if (medium.length < 2) {
            setFormError("Medium/Tools must be at least 2 characters.");
            return;
        }
        if (description.length < 20) {
            setFormError("Description must be at least 20 characters.");
            return;
        }

        const extraImages = parseExtraImages(extraImagesRaw);
        const images = [image, ...extraImages].slice(0, 6); // keep it reasonable (max 6)

        const priceValue = form.price.value;
        const price = priceValue ? Number(priceValue) : null;

        const newArt = {
            image,          // backward compatibility
            images,         // ✅ supports multi-media requirement
            title,
            category,
            medium,
            description,
            dimensions: form.dimensions.value.trim() || null,
            price: Number.isFinite(price) ? price : null,
            visibility: form.visibility.value,
            artist: user.displayName || "Unknown Artist",
            email: user.email,
            likes: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            setLoading(true);
            const res = await fetch(`${API}/arts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newArt),
            });

            if (!res.ok) throw new Error("Failed");

            toast.success("Artwork added successfully!");
            navigate("/dashboard/my-gallery");
        } catch {
            toast.error("Failed to add artwork. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold">Add New Artwork</h2>
                    <p className="text-sm text-base-content/70 mt-2">
                        Add artwork details carefully. Multi-image support improves the Details page.
                    </p>
                </div>

                <Link to="/dashboard/my-gallery" className="btn btn-outline btn-sm w-fit">
                    Back to My Gallery
                </Link>
            </div>

            {formError && (
                <div className="alert alert-error mt-6 text-sm">
                    <span>{formError}</span>
                </div>
            )}

            <form onSubmit={handleAddArtwork} className="mt-6 grid gap-4">
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Main Image URL *</span>
                    </label>
                    <input
                        type="url"
                        name="image"
                        required
                        placeholder="https://example.com/art.jpg"
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Extra Image URLs (optional)</span>
                    </label>
                    <textarea
                        name="extraImages"
                        className="textarea textarea-bordered w-full min-h-[110px]"
                        placeholder="Add comma or new line separated image URLs (max 5 extra)"
                    />
                    <p className="text-xs text-base-content/60 mt-2">
                        Tip: These will appear as additional media on the Details page.
                    </p>
                </div>

                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Title *</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Artwork title"
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Category *</span>
                        </label>
                        <select name="category" required className="select select-bordered w-full">
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
                        <label className="label">
                            <span className="label-text font-semibold">Medium / Tools *</span>
                        </label>
                        <input
                            type="text"
                            name="medium"
                            required
                            placeholder="e.g., Procreate, Oil on Canvas, DSLR"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Description *</span>
                    </label>
                    <textarea
                        name="description"
                        required
                        className="textarea textarea-bordered w-full min-h-[140px]"
                        placeholder="Describe your artwork, inspiration, and style..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Dimensions (optional)</span>
                        </label>
                        <input
                            type="text"
                            name="dimensions"
                            placeholder="e.g., 1920x1080 px or 24x36 in"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Price (optional)</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            placeholder="e.g., 120"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Visibility *</span>
                    </label>
                    <select name="visibility" required className="select select-bordered w-full">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Artist Name</span>
                        </label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered w-full bg-base-200"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Artist Email</span>
                        </label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full bg-base-200"
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2">
                    {loading ? <span className="loading loading-spinner loading-sm" /> : "Add Artwork"}
                </button>
            </form>
        </div>
    );
};

export default AddArtwork;
