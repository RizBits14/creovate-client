import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";

const ArtworkDetails = () => {
    const API = import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL;

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [art, setArt] = useState(null);
    const [publicArts, setPublicArts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [likeLoading, setLikeLoading] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);

    const [isFavourite, setIsFavourite] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    const [activeIdx, setActiveIdx] = useState(0);

    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
    const [reviewSaving, setReviewSaving] = useState(false);
    const [reviewErrors, setReviewErrors] = useState({});

    const defaultArtistPhoto = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const likeKey = useMemo(() => {
        const who = user?.email ? `u:${user.email}` : "anon";
        return `creovate_like:${who}:${id || ""}`;
    }, [user?.email, id]);

    const safeJson = async (res) => {
        try {
            return await res.json();
        } catch {
            return null;
        }
    };

    useEffect(() => {
        if (!id) return;
        try {
            setHasLiked(localStorage.getItem(likeKey) === "1");
        } catch {
            setHasLiked(false);
        }
    }, [id, likeKey]);

    useEffect(() => {
        if (!id) return;

        let alive = true;
        const controller = new AbortController();

        const load = async () => {
            try {
                setLoading(true);
                setActiveIdx(0);

                const artRes = await fetch(`${API}/arts/${id}`, { signal: controller.signal });
                const artData = await safeJson(artRes);
                if (!alive) return;

                if (!artData?._id) {
                    setArt(null);
                    setPublicArts([]);
                    setIsFavourite(false);
                    setLoading(false);
                    return;
                }

                setArt(artData);

                if (user?.email) {
                    const favRes = await fetch(
                        `${API}/favourites/check?email=${encodeURIComponent(user.email)}&artId=${id}`,
                        { signal: controller.signal }
                    );
                    const favData = await safeJson(favRes);
                    if (!alive) return;
                    setIsFavourite(!!favData?.exists);
                } else {
                    setIsFavourite(false);
                }

                const pubRes = await fetch(`${API}/arts?visibility=Public`, { signal: controller.signal });
                const pubData = await safeJson(pubRes);
                if (!alive) return;

                setPublicArts(Array.isArray(pubData) ? pubData : []);
                setLoading(false);
            } catch {
                if (!alive) return;
                setLoading(false);
            }
        };

        load();

        return () => {
            alive = false;
            controller.abort();
        };
    }, [API, id, user?.email]);

    const images = useMemo(() => {
        if (!art) return [];
        if (Array.isArray(art.images) && art.images.length) return art.images.filter(Boolean);
        if (art.image) return [art.image];
        return [];
    }, [art]);

    useEffect(() => {
        if (!images.length) return;
        if (activeIdx < 0 || activeIdx > images.length - 1) setActiveIdx(0);
    }, [images, activeIdx]);

    const related = useMemo(() => {
        if (!art) return [];
        return publicArts
            .filter((a) => a?._id && a._id !== art._id)
            .filter((a) => a.category === art.category || a.artist === art.artist)
            .slice(0, 4);
    }, [publicArts, art]);

    const artistPhoto =
        art?.artistPhoto ||
        (user?.email === art?.email ? user?.photoURL : null) ||
        defaultArtistPhoto;

    const isOwner = !!user?.email && user.email === art?.email;
    const isPrivateBlocked = art?.visibility === "Private" && !isOwner;

    const loadReviews = async (signal) => {
        if (!id) return;
        setReviewsLoading(true);
        try {
            const r = await fetch(`${API}/reviews?artworkId=${id}`, { signal });
            const data = await safeJson(r);
            setReviews(Array.isArray(data) ? data : []);
        } catch {
            setReviews([]);
        } finally {
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        loadReviews(controller.signal);
        return () => controller.abort();
    }, [API, id]);

    const avgRating = useMemo(() => {
        if (!reviews.length) return 0;
        const sum = reviews.reduce((s, r) => s + (Number(r?.rating) || 0), 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    }, [reviews]);

    const handleLike = async () => {
        if (hasLiked) return;

        try {
            setLikeLoading(true);

            const already = (() => {
                try {
                    return localStorage.getItem(likeKey) === "1";
                } catch {
                    return false;
                }
            })();

            if (already) {
                setHasLiked(true);
                toast("You already liked this artwork.");
                return;
            }

            const res = await fetch(`${API}/arts/${id}/like`, { method: "PATCH" });
            const data = await safeJson(res);

            if (!res.ok || data?.success === false) {
                throw new Error(data?.message || "Failed to like");
            }

            try {
                localStorage.setItem(likeKey, "1");
            } catch { }

            setHasLiked(true);
            setArt((prev) => ({ ...prev, likes: (prev?.likes || 0) + 1 }));
            toast.success("You liked this artwork!");
        } catch (e) {
            toast.error(e?.message || "Failed to like");
        } finally {
            setLikeLoading(false);
        }
    };

    const handleAddToFavourites = async () => {
        if (!user) {
            toast.error("Please login to add favourites.");
            return navigate("/login", { state: { from: `/art/${id}` } });
        }
        if (isFavourite) return;

        try {
            setFavLoading(true);
            const res = await fetch(`${API}/favourites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userEmail: user.email, artworkId: id }),
            });
            const data = await safeJson(res);

            if (data?.already) {
                toast("Already in favourites");
                return;
            }

            if (!res.ok || data?.success === false) {
                throw new Error(data?.message || "Failed to add");
            }

            setIsFavourite(true);
            toast.success("Added to favourites!");
        } catch (e) {
            toast.error(e?.message || "Failed to add");
        } finally {
            setFavLoading(false);
        }
    };

    const validateReview = () => {
        const e = {};
        const ratingNum = Number(reviewForm.rating);

        if (Number.isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) e.rating = "Rating must be between 1 and 5.";
        const c = reviewForm.comment.trim();
        if (!c || c.length < 10) e.comment = "Comment must be at least 10 characters.";
        return e;
    };

    const submitReview = async (ev) => {
        ev.preventDefault();

        if (!user?.email) {
            toast.error("Please login to submit a review.");
            return navigate("/login", { state: { from: `/art/${id}` } });
        }

        const e = validateReview();
        setReviewErrors(e);
        if (Object.keys(e).length) return;

        try {
            setReviewSaving(true);

            const res = await fetch(`${API}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    artworkId: id,
                    userEmail: user.email,
                    userName: user.displayName || "User",
                    rating: Number(reviewForm.rating),
                    comment: reviewForm.comment.trim(),
                }),
            });

            const data = await safeJson(res);

            if (data?.already) {
                toast.error("You already reviewed this artwork.");
                return;
            }

            if (!res.ok || data?.success === false) {
                toast.error(data?.message || "Failed to submit review.");
                return;
            }

            toast.success("Review submitted!");
            setReviewForm({ rating: 5, comment: "" });
            setReviewErrors({});
            await loadReviews();
        } catch {
            toast.error("Failed to submit review");
        } finally {
            setReviewSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary" />
            </div>
        );
    }

    if (!art) {
        return <p className="mt-32 text-center text-base-content/70">Artwork not found.</p>;
    }

    if (isPrivateBlocked) {
        return (
            <div className="mt-28 px-4 md:px-10">
                <div className="mx-auto max-w-3xl">
                    <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
                        </div>

                        <div className="relative">
                            <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
                                Private Artwork
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                This artwork is private and only visible to the owner.
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <Link to="/explore" className="btn btn-outline btn-sm h-11 rounded-xl">
                                    Back to Explore
                                </Link>
                                {!user && (
                                    <Link
                                        to="/login"
                                        className="btn btn-sm h-11 rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const mainSrc = images.length ? images[activeIdx] || images[0] : null;

    return (
        <section className="mt-28 px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
                        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-secondary/10" />
                    </div>

                    <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div className="min-w-0">
                            <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                                {art.title}
                            </h1>
                            <p className="mt-2 text-sm text-base-content/70 sm:text-base">
                                by <span className="font-semibold text-base-content">{art.artist}</span>
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="badge badge-outline">{art.category || "Uncategorized"}</span>
                                <span className="badge badge-outline">{art.medium || "Mixed"}</span>
                                {reviews.length > 0 && (
                                    <span className="badge border-base-300 bg-base-100">
                                        ⭐ {avgRating}/5 ({reviews.length})
                                    </span>
                                )}
                                <span className="badge border-base-300 bg-base-100">❤️ {art.likes || 0}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleLike}
                                disabled={likeLoading || hasLiked}
                                className={`btn btn-sm h-11 rounded-xl border-0 text-white ${hasLiked
                                        ? "bg-linear-to-r from-success/70 via-success/90 to-success/70"
                                        : "bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                    }`}
                            >
                                {hasLiked ? "Liked ✓" : likeLoading ? "Liking..." : `Like (${art.likes || 0})`}
                            </button>

                            <button
                                onClick={handleAddToFavourites}
                                disabled={isFavourite || favLoading}
                                className={`btn btn-sm h-11 rounded-xl ${isFavourite
                                        ? "btn-disabled"
                                        : "border-0 text-white bg-linear-to-r from-secondary via-primary to-secondary hover:opacity-95"
                                    }`}
                            >
                                {isFavourite ? "Added ✓" : favLoading ? "Adding..." : "Add to Favourites"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                        <div className="relative">
                            {mainSrc ? (
                                <img src={mainSrc} alt={art.title} className="h-80 w-full object-cover md:h-[440px]" />
                            ) : (
                                <div className="flex h-80 w-full items-center justify-center bg-base-200 md:h-[440px]">
                                    <p className="text-sm text-base-content/70">No image available</p>
                                </div>
                            )}

                            {images.length > 1 && (
                                <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 px-3">
                                    <button
                                        type="button"
                                        className="btn btn-sm h-10 rounded-xl border border-base-300 bg-base-100/80 backdrop-blur hover:bg-base-100"
                                        onClick={() => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1))}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm h-10 rounded-xl border border-base-300 bg-base-100/80 backdrop-blur hover:bg-base-100"
                                        onClick={() => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1))}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="p-4">
                                <div className="grid grid-cols-4 gap-3">
                                    {images.slice(0, 8).map((src, idx) => {
                                        const isActive = idx === activeIdx;
                                        return (
                                            <button
                                                type="button"
                                                key={`${src}-${idx}`}
                                                onClick={() => setActiveIdx(idx)}
                                                className={`overflow-hidden rounded-2xl border transition-all ${isActive ? "border-primary ring-2 ring-primary/25" : "border-base-300"
                                                    }`}
                                                aria-label={`Select image ${idx + 1}`}
                                            >
                                                <img src={src} alt={`thumb-${idx}`} className="h-20 w-full object-cover" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
                            <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                        </div>

                        <div className="relative">
                            <h2 className="text-xl font-bold text-base-content">Key Information</h2>

                            <div className="mt-4 grid gap-3 text-sm">
                                <div className="flex justify-between gap-4 rounded-2xl border border-base-300 bg-base-200/25 px-4 py-3">
                                    <span className="text-base-content/70">Category</span>
                                    <span className="font-semibold text-base-content">{art.category || "—"}</span>
                                </div>
                                <div className="flex justify-between gap-4 rounded-2xl border border-base-300 bg-base-200/25 px-4 py-3">
                                    <span className="text-base-content/70">Medium</span>
                                    <span className="font-semibold text-base-content">{art.medium || "—"}</span>
                                </div>
                                <div className="flex justify-between gap-4 rounded-2xl border border-base-300 bg-base-200/25 px-4 py-3">
                                    <span className="text-base-content/70">Dimensions</span>
                                    <span className="font-semibold text-base-content">{art.dimensions || "—"}</span>
                                </div>
                                <div className="flex justify-between gap-4 rounded-2xl border border-base-300 bg-base-200/25 px-4 py-3">
                                    <span className="text-base-content/70">Price</span>
                                    <span className="font-semibold text-base-content">{art.price ? `$${art.price}` : "—"}</span>
                                </div>
                                <div className="flex justify-between gap-4 rounded-2xl border border-base-300 bg-base-200/25 px-4 py-3">
                                    <span className="text-base-content/70">Visibility</span>
                                    <span className="font-semibold text-base-content">{art.visibility || "—"}</span>
                                </div>
                            </div>

                            <div className="mt-6 rounded-3xl border border-base-300 bg-base-100 p-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative h-14 w-14">
                                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/35 via-secondary/25 to-primary/35 blur-xl opacity-70" />
                                        <img
                                            src={artistPhoto}
                                            alt="Artist"
                                            className="relative h-14 w-14 rounded-full border border-base-300 object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = defaultArtistPhoto;
                                            }}
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-base-content">{art.artist}</p>
                                        <p className="mt-1 text-sm text-base-content/70 line-clamp-2">
                                            {art.artistBio || "Artist profile is not available."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {reviews.length > 0 ? (
                                    <span className="badge border-base-300 bg-base-100">⭐ {avgRating}/5</span>
                                ) : (
                                    <span className="badge border-base-300 bg-base-100">No rating yet</span>
                                )}
                                <span className="badge border-base-300 bg-base-100">
                                    {hasLiked ? "You liked this" : "Like once per user"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
                    </div>

                    <div className="relative">
                        <h2 className="text-xl font-bold text-base-content">Overview</h2>
                        <p className="mt-3 leading-relaxed text-base-content/80">{art.description || "No description available."}</p>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-base-content">Reviews</h2>
                            <p className="mt-1 text-sm text-base-content/70">
                                {reviews.length ? `${reviews.length} review(s) · Average ${avgRating}/5` : "No reviews yet."}
                            </p>
                        </div>
                    </div>

                    {reviewsLoading ? (
                        <div className="mt-6">
                            <div className="skeleton h-16 w-full" />
                            <div className="skeleton mt-3 h-16 w-full" />
                        </div>
                    ) : (
                        <div className="mt-6 space-y-3">
                            {reviews.slice(0, 6).map((r, idx) => (
                                <div
                                    key={r?._id || `${r?.userEmail || "u"}-${idx}`}
                                    className="rounded-2xl border border-base-300 bg-base-100 p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-semibold text-base-content">{r?.userName || "User"}</p>
                                        <p className="text-sm text-base-content/70">⭐ {r?.rating || 0}/5</p>
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-base-content/80">{r?.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 overflow-hidden rounded-3xl border border-base-300 bg-base-100">
                        <div className="p-5 sm:p-6">
                            <h3 className="text-lg font-bold text-base-content">Leave a Review</h3>
                            <p className="mt-1 text-sm text-base-content/70">
                                Logged-in users can rate and comment once per artwork.
                            </p>

                            <form onSubmit={submitReview} className="mt-4 grid max-w-2xl gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Rating</span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full rounded-xl ${reviewErrors.rating ? "select-error" : ""}`}
                                        value={reviewForm.rating}
                                        onChange={(e) => setReviewForm((p) => ({ ...p, rating: Number(e.target.value) }))}
                                    >
                                        {[5, 4, 3, 2, 1].map((n) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                    {reviewErrors.rating && <p className="mt-2 text-xs text-error">{reviewErrors.rating}</p>}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Comment</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered w-full min-h-[120px] rounded-xl ${reviewErrors.comment ? "textarea-error" : ""
                                            }`}
                                        value={reviewForm.comment}
                                        onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                                        placeholder="Share your thoughts..."
                                    />
                                    {reviewErrors.comment && <p className="mt-2 text-xs text-error">{reviewErrors.comment}</p>}
                                </div>

                                <button
                                    className="btn btn-sm h-11 w-fit rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                    disabled={reviewSaving}
                                >
                                    {reviewSaving ? <span className="loading loading-spinner loading-sm" /> : "Submit Review"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-end justify-between gap-3">
                        <h2 className="text-xl font-bold text-base-content">Related Artworks</h2>
                        <Link to="/explore" className="text-sm font-semibold text-primary hover:opacity-90">
                            Browse more →
                        </Link>
                    </div>

                    {related.length === 0 ? (
                        <p className="mt-4 text-sm text-base-content/70">No related artworks found.</p>
                    ) : (
                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((a) => (
                                <Link
                                    key={a._id}
                                    to={`/art/${a._id}`}
                                    className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={a.image}
                                            alt={a.title}
                                            className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="line-clamp-1 font-bold text-base-content">{a.title}</p>
                                        <p className="line-clamp-1 text-sm text-base-content/70">{a.artist}</p>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                            View Details <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ArtworkDetails;
