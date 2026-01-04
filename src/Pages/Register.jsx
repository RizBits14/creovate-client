import { useContext, useMemo, useState } from "react";
import { updateProfile } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthContext";

const Register = () => {
    const { register, googleLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const DEFAULT_AVATAR = useMemo(
        () => "https://cdn-icons-png.flaticon.com/128/149/149071.png",
        []
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [socialSubmitting, setSocialSubmitting] = useState(false);

    const [formError, setFormError] = useState("");

    const passwordChecks = useMemo(() => {
        return {
            min: password.length >= 6,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
        };
    }, [password]);

    const validate = () => {
        if (!name.trim() || name.trim().length < 2) return "Please enter your name (min 2 characters).";
        if (!email.trim()) return "Please enter your email.";
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Please enter a valid email address.";
        if (!password) return "Please create a password.";
        if (!passwordChecks.min) return "Password must be at least 6 characters.";
        if (!passwordChecks.upper) return "Password must include at least 1 uppercase letter.";
        if (!passwordChecks.lower) return "Password must include at least 1 lowercase letter.";
        if (!passwordChecks.number) return "Password must include at least 1 number.";
        if (confirm !== password) return "Passwords do not match.";
        return "";
    };

    const mapFirebaseError = (err) => {
        const code = err?.code || "";
        if (code.includes("auth/email-already-in-use")) return "This email is already registered. Please login.";
        if (code.includes("auth/invalid-email")) return "Invalid email address.";
        if (code.includes("auth/weak-password")) return "Password is too weak.";
        return err?.message || "Registration failed. Please try again.";
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormError("");

        const msg = validate();
        if (msg) {
            setFormError(msg);
            return;
        }

        try {
            setSubmitting(true);
            const result = await register(email.trim(), password);

            await updateProfile(result.user, {
                displayName: name.trim(),
                photoURL: photoURL.trim() || DEFAULT_AVATAR,
            });

            toast.success("Account created successfully!");
            navigate(from, { replace: true });
        } catch (err) {
            setFormError(mapFirebaseError(err));
            toast.error("Registration failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleSignup = async () => {
        setFormError("");
        try {
            setSocialSubmitting(true);
            await googleLogin();
            toast.success("Signed up with Google!");
            navigate(from, { replace: true });
        } catch (err) {
            setFormError(mapFirebaseError(err));
            toast.error("Google signup failed.");
        } finally {
            setSocialSubmitting(false);
        }
    };

    const Badge = ({ ok, text }) => (
        <div className={`badge ${ok ? "badge-success" : "badge-ghost"} badge-sm`}>
            {text}
        </div>
    );

    return (
        <div className="mt-28 flex justify-center px-4">
            <div className="w-full max-w-md bg-base-100 border border-base-300 shadow-sm rounded-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center">
                    Create <span className="text-primary">Account</span>
                </h2>
                <p className="mt-2 text-center text-sm text-base-content/70">
                    Join Creovate and start sharing your artworks.
                </p>

                {formError && (
                    <div className="alert alert-error mt-6 text-sm">
                        <span>{formError}</span>
                    </div>
                )}

                <form onSubmit={handleRegister} className="mt-6 space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Photo URL (optional)</span>
                        </label>
                        <input
                            type="url"
                            className="input input-bordered w-full"
                            placeholder="https://..."
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />

                        <div className="mt-3 flex flex-wrap gap-2">
                            <Badge ok={passwordChecks.min} text="6+ chars" />
                            <Badge ok={passwordChecks.upper} text="Uppercase" />
                            <Badge ok={passwordChecks.lower} text="Lowercase" />
                            <Badge ok={passwordChecks.number} text="Number" />
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Re-type password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-full" type="submit" disabled={submitting || socialSubmitting}>
                        {submitting ? <span className="loading loading-spinner loading-sm" /> : "Register"}
                    </button>
                </form>

                <div className="divider my-6">or</div>

                <button
                    onClick={handleGoogleSignup}
                    className="btn w-full border border-base-300 bg-base-100 hover:bg-base-200"
                    disabled={submitting || socialSubmitting}
                >
                    {socialSubmitting ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <>
                            <FcGoogle size={22} />
                            Sign up with Google
                        </>
                    )}
                </button>

                <p className="mt-6 text-center text-sm text-base-content/70">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
