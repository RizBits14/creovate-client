import { useContext, useMemo, useState } from "react";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext";
import { auth } from "../../Firebase/firebase.config";

const Profile = () => {
    const { user } = useContext(AuthContext);

    const initialName = user?.displayName || "";
    const initialPhoto = user?.photoURL || "";

    const [name, setName] = useState(initialName);
    const [photo, setPhoto] = useState(initialPhoto);
    const [saving, setSaving] = useState(false);

    const dirty = useMemo(
        () => name !== initialName || photo !== initialPhoto,
        [name, photo, initialName, initialPhoto]
    );

    const isValidUrl = (value) => {
        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    };

    const safePhoto =
        (photo || "").trim() ||
        "https://cdn-icons-png.flaticon.com/128/149/149071.png";

    const handleSave = async (e) => {
        e.preventDefault();

        const cleanName = (name || "").trim();
        const cleanPhoto = (photo || "").trim();

        if (!cleanName) return toast.error("Display name cannot be empty.");
        if (!isValidUrl(cleanPhoto)) return toast.error("Please enter a valid photo URL.");

        try {
            setSaving(true);
            await updateProfile(auth.currentUser, {
                displayName: cleanName,
                photoURL: cleanPhoto || initialPhoto,
            });
            toast.success("Profile updated!");
        } catch {
            toast.error("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setName(initialName);
        setPhoto(initialPhoto);
    };

    return (
        <section className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
                        Profile
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
                        Manage your account details and public avatar.
                    </p>
                </div>

                {dirty && (
                    <span className="badge badge-outline self-start md:self-auto">
                        Changes not saved
                    </span>
                )}
            </div>

            <div className="relative mt-8 grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16">
                                <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/35 via-secondary/25 to-primary/35 blur-xl opacity-70" />
                                <img
                                    src={safePhoto}
                                    alt="profile"
                                    className="relative h-16 w-16 rounded-full border border-base-300 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://cdn-icons-png.flaticon.com/128/149/149071.png";
                                    }}
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-base-content">
                                    {(name || "").trim() || "User"}
                                </p>
                                <p className="truncate text-sm text-base-content/70">
                                    {user?.email || ""}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-2 text-sm">
                            <div className="flex items-center justify-between gap-3 rounded-2xl border border-base-300 bg-base-200/30 px-3 py-2">
                                <span className="text-base-content/70">UID</span>
                                <span className="max-w-[180px] truncate font-semibold text-base-content">
                                    {user?.uid || "—"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-3 rounded-2xl border border-base-300 bg-base-200/30 px-3 py-2">
                                <span className="text-base-content/70">Provider</span>
                                <span className="max-w-[180px] truncate font-semibold text-base-content">
                                    {user?.providerData?.[0]?.providerId || "—"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-base-300 bg-base-100 p-4">
                            <p className="text-xs leading-relaxed text-base-content/60">
                                Tip: Use a square image (at least 256×256) for a crisp avatar across the app.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <form onSubmit={handleSave} className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="md:col-span-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Display Name</span>
                                </label>
                                <input
                                    className="input input-bordered h-11 w-full rounded-xl"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    className="input input-bordered h-11 w-full rounded-xl"
                                    value={user?.email || ""}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input
                                className="input input-bordered h-11 w-full rounded-xl"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                placeholder="https://..."
                            />
                            {!isValidUrl((photo || "").trim()) && (
                                <p className="mt-2 text-xs text-error">Please enter a valid URL.</p>
                            )}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-3">
                            <button
                                className="btn btn-sm h-11 rounded-xl border-0 text-white bg-linear-to-r from-primary via-secondary to-primary hover:opacity-95"
                                disabled={saving || !dirty}
                            >
                                {saving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline btn-sm h-11 rounded-xl"
                                onClick={handleReset}
                                disabled={saving || !dirty}
                            >
                                Reset
                            </button>
                        </div>

                        {!dirty && (
                            <p className="text-xs text-base-content/60">
                                You’re up to date — make a change to enable saving.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Profile;
