import React from "react";

const NewsletterCTA = () => {
    const subscribeHref =
        "mailto:hello@creovate.art?subject=Newsletter%20Subscription&body=Hi%20Creovate%20Team,%20Please%20subscribe%20me%20to%20the%20newsletter.";
    const feedbackHref =
        "mailto:hello@creovate.art?subject=Feedback%20for%20Creovate";

    return (
        <section className="px-4 pb-10 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
                        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
                        <div className="absolute inset-0 bg-linear-to-r from-primary/15 via-transparent to-secondary/15" />
                    </div>

                    <div className="relative p-8 text-center sm:p-10 md:p-12">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl md:text-4xl">
                                Stay in the loop
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">
                                Want feature announcements, community highlights, and new artwork drops?
                                Subscribe via email — it opens your mail app and works everywhere.
                            </p>
                        </div>

                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href={subscribeHref}
                                className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 bg-linear-to-r from-primary via-secondary to-primary"
                            >
                                Subscribe via Email
                            </a>

                            <a
                                href={feedbackHref}
                                className="inline-flex h-11 items-center justify-center rounded-xl border border-base-300 bg-base-100 px-6 text-sm font-semibold text-base-content transition hover:bg-base-200"
                            >
                                Send Feedback
                            </a>
                        </div>

                        <p className="mt-5 text-xs text-base-content/60">
                            No forms, no spam — your email app will handle the message.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCTA;
