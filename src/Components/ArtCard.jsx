import React from "react";
import { Link } from "react-router";

const ArtCard = ({ art }) => {
    const id = art?._id;
    const title = art?.title?.trim() || "Untitled Artwork";
    const artist = art?.artist?.trim() || "Unknown Artist";
    const category = art?.category?.trim() || "Uncategorized";
    const medium = art?.medium?.trim() || "Mixed";
    const likes = Number.isFinite(Number(art?.likes)) ? Number(art.likes) : 0;

    const rawDesc = (art?.description || "").trim();
    const desc =
        rawDesc.length > 120
            ? `${rawDesc.slice(0, 120)}...`
            : rawDesc || "Artwork description is not available.";

    const imageSrc =
        art?.image ||
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60";

    return (
        <article className="group h-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative w-full overflow-hidden">
                <div className="aspect-16/10 w-full">
                    <img
                        src={imageSrc}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60";
                        }}
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-base-100/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="badge badge-outline backdrop-blur-sm">{medium}</span>
                </div>
            </div>

            <div className="flex h-full flex-col p-5 sm:p-6">
                <div className="min-h-[148px] flex-1">
                    <h3 className="text-base font-semibold leading-tight text-base-content line-clamp-1 sm:text-lg">
                        {title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="text-base-content/70 line-clamp-1">{artist}</span>
                        <span className="hidden h-1 w-1 rounded-full bg-base-content/30 sm:inline-block" />
                        <span className="text-base-content/60 italic line-clamp-1">
                            {category}
                        </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-base-content/70 line-clamp-3">
                        {desc}
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <span aria-hidden="true">❤️</span>
                        <span>{likes}</span>
                    </div>

                    <span className="badge badge-ghost text-base-content/70">
                        {category}
                    </span>
                </div>

                <div className="mt-5">
                    <Link
                        to={id ? `/art/${id}` : "/art"}
                        className="block w-full"
                        aria-label={`View details for ${title}`}
                    >
                        <button className="btn btn-primary btn-sm h-11 w-full rounded-xl">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ArtCard;
