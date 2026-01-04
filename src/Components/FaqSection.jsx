import React, { useMemo, useState } from "react";

const FaqSection = () => {
    const faqs = useMemo(
        () => [
            {
                q: "Can I keep an artwork private?",
                a: "Yes. Choose Private visibility when adding or editing an artwork.",
            },
            {
                q: "How do Featured artworks appear?",
                a: "Featured shows recent public uploads (latest items first).",
            },
            {
                q: "Where do I manage my artworks?",
                a: "Inside the Dashboard → My Gallery. You can edit or delete anytime.",
            },
            {
                q: "How do favourites work?",
                a: "Open an artwork → Add to Favourites. Manage in Dashboard → My Favourites.",
            },
        ],
        []
    );

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                        Quick answers to common questions about uploading, visibility, and managing your gallery.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-3xl space-y-3">
                    {faqs.map((f, i) => {
                        const isOpen = i === openIndex;
                        return (
                            <div
                                key={f.q}
                                className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:shadow-md"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-base font-semibold text-base-content">
                                        {f.q}
                                    </span>
                                    <span
                                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                        aria-hidden="true"
                                    >
                                        <span className="text-lg">⌄</span>
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden px-5 pb-5">
                                        <p className="text-sm leading-relaxed text-base-content/70 sm:text-base">
                                            {f.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
