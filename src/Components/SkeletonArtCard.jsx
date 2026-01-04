import React from "react";

const SkeletonArtCard = () => {
    return (
        <div className="h-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div className="relative w-full overflow-hidden">
                <div className="aspect-16/10 w-full animate-pulse bg-base-200" />
            </div>

            <div className="flex h-full flex-col p-5">
                <div className="flex-1 space-y-3">
                    <div className="h-5 w-4/5 animate-pulse rounded-lg bg-base-200" />
                    <div className="h-4 w-1/2 animate-pulse rounded-lg bg-base-200" />
                    <div className="h-4 w-2/3 animate-pulse rounded-lg bg-base-200" />
                    <div className="h-4 w-full animate-pulse rounded-lg bg-base-200" />
                    <div className="h-4 w-5/6 animate-pulse rounded-lg bg-base-200" />
                </div>

                <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="h-4 w-20 animate-pulse rounded-lg bg-base-200" />
                        <div className="h-5 w-24 animate-pulse rounded-xl bg-base-200" />
                    </div>
                    <div className="h-11 w-full animate-pulse rounded-xl bg-base-200" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonArtCard;
