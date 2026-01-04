import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
    const API = useMemo(() => import.meta.env.VITE_API_URL || import.meta.env.VITE_FRONTEND_URL, []);

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    const supportEmail = useMemo(() => "hello@creovate.art", []);

    const validate = () => {
        const e = {};
        const n = values.name.trim();
        const em = values.email.trim();
        const m = values.message.trim();

        if (!n || n.length < 2) e.name = "Please enter your name (min 2 characters).";
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
        if (!emailOk) e.email = "Please enter a valid email address.";
        if (!m || m.length < 10) e.message = "Please write a message (min 10 characters).";
        return e;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;

        try {
            setLoading(true);
            setSent(false);

            const res = await fetch(`${API}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: values.name.trim(),
                    email: values.email.trim(),
                    message: values.message.trim(),
                }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to send message");

            setValues({ name: "", email: "", message: "" });
            setErrors({});
            setSent(true);
            toast.success("Message sent successfully!");
        } catch (err) {
            toast.error(err?.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-28 px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8 md:p-10">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                            <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
                            <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-secondary/10" />
                        </div>

                        <div className="relative">
                            <span className="badge border-base-300 bg-base-100">Support</span>
                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
                                Contact
                            </h1>
                            <p className="mt-3 text-sm leading-relaxed text-base-content/75 sm:text-base">
                                Reach out for feedback, collaborations, or support. We’ll get back as soon as possible.
                            </p>

                            <div className="mt-6 grid gap-3 text-sm">
                                <div className="rounded-2xl border border-base-300 bg-base-200/25 px-4 py-3">
                                    <p className="text-base-content/70">Email</p>
                                    <p className="mt-1 font-semibold text-base-content">{supportEmail}</p>
                                </div>
                                <div className="rounded-2xl border border-base-300 bg-base-200/25 px-4 py-3">
                                    <p className="text-base-content/70">Typical response</p>
                                    <p className="mt-1 font-semibold text-base-content">within 24–48 hours</p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                <a
                                    href={`mailto:${supportEmail}?subject=Creovate%20Support`}
                                    className="btn btn-outline btn-sm h-11 rounded-xl"
                                >
                                    Email Support
                                </a>
                                <a
                                    href={`mailto:${supportEmail}?subject=Creovate%20Collaboration`}
                                    className="btn btn-sm h-11 rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                >
                                    Collaboration
                                </a>
                            </div>

                            {sent && (
                                <div className="mt-8 overflow-hidden rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-base-content">
                                    Your message was delivered successfully.
                                </div>
                            )}

                            <div className="mt-8 rounded-3xl border border-base-300 bg-base-100 p-5">
                                <p className="text-sm font-semibold text-base-content">What to include</p>
                                <ul className="mt-2 space-y-1 text-sm text-base-content/70">
                                    <li>• Project or artwork link (if relevant)</li>
                                    <li>• Short summary of your request</li>
                                    <li>• Any deadline or priority details</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8 md:p-10"
                    >
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
                            <div className="absolute -left-28 -bottom-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                            <div className="absolute inset-0 bg-linear-to-r from-secondary/10 via-transparent to-primary/10" />
                        </div>

                        <div className="relative">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-base-content">Send a message</h2>
                                <p className="mt-1 text-sm text-base-content/70">
                                    Fill the form and we’ll store it in the backend for review.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">Name</span>
                                        </label>
                                        <input
                                            className={`input input-bordered h-11 w-full rounded-xl ${errors.name ? "input-error" : ""
                                                }`}
                                            value={values.name}
                                            onChange={(e) => setValues((p) => ({ ...p, name: e.target.value }))}
                                            placeholder="Your name"
                                        />
                                        {errors.name && <p className="mt-2 text-xs text-error">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">Email</span>
                                        </label>
                                        <input
                                            className={`input input-bordered h-11 w-full rounded-xl ${errors.email ? "input-error" : ""
                                                }`}
                                            value={values.email}
                                            onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
                                            type="email"
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && <p className="mt-2 text-xs text-error">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Message</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered w-full min-h-[150px] rounded-xl ${errors.message ? "textarea-error" : ""
                                            }`}
                                        value={values.message}
                                        onChange={(e) => setValues((p) => ({ ...p, message: e.target.value }))}
                                        placeholder="Write your message..."
                                    />
                                    {errors.message && <p className="mt-2 text-xs text-error">{errors.message}</p>}
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        className="btn btn-sm h-11 rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                        disabled={loading}
                                        type="submit"
                                    >
                                        {loading ? <span className="loading loading-spinner loading-sm" /> : "Send Message"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline btn-sm h-11 rounded-xl"
                                        disabled={loading}
                                        onClick={() => {
                                            setValues({ name: "", email: "", message: "" });
                                            setErrors({});
                                            setSent(false);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>

                                <div className="mt-2 rounded-2xl border border-base-300 bg-base-200/20 px-4 py-3">
                                    <p className="text-xs text-base-content/60">
                                        Your message will be stored in the backend for review (portfolio-ready behavior).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
