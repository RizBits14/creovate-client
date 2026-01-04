import { useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const DEMO = useMemo(
        () => ({
            email: "demo@creovate.art",
            password: "Creovate123",
        }),
        []
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [socialSubmitting, setSocialSubmitting] = useState(false);

    const [formError, setFormError] = useState("");

    const validate = () => {
        if (!email.trim()) return "Please enter your email.";
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Please enter a valid email address.";
        if (!password) return "Please enter your password.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        return "";
    };

    const mapFirebaseError = (err) => {
        const code = err?.code || "";
        if (code.includes("auth/invalid-credential")) return "Incorrect email or password.";
        if (code.includes("auth/wrong-password")) return "Incorrect email or password.";
        if (code.includes("auth/user-not-found")) return "No account found with this email.";
        if (code.includes("auth/too-many-requests"))
            return "Too many attempts. Please try again later.";
        return err?.message || "Login failed. Please try again.";
    };

    const handleDemoFill = () => {
        setFormError("");
        setEmail(DEMO.email);
        setPassword(DEMO.password);
        toast.success("Demo credentials filled!");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormError("");

        const msg = validate();
        if (msg) {
            setFormError(msg);
            return;
        }

        try {
            setSubmitting(true);
            await login(email.trim(), password);
            toast.success("Welcome back!");
            navigate(from, { replace: true });
        } catch (err) {
            setFormError(mapFirebaseError(err));
            toast.error("Login failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setFormError("");
        try {
            setSocialSubmitting(true);
            await googleLogin();
            toast.success("Logged in with Google!");
            navigate(from, { replace: true });
        } catch (err) {
            setFormError(mapFirebaseError(err));
            toast.error("Google login failed.");
        } finally {
            setSocialSubmitting(false);
        }
    };

    return (
        <div className="mt-28 flex justify-center px-4">
            <div className="w-full max-w-md bg-base-100 border border-base-300 shadow-sm rounded-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center">
                    Login to <span className="text-primary">Creovate</span>
                </h2>
                <p className="mt-2 text-center text-sm text-base-content/70">
                    Access your gallery, favourites, and manage artworks.
                </p>

                {formError && (
                    <div className="alert alert-error mt-6 text-sm">
                        <span>{formError}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-full" type="submit" disabled={submitting || socialSubmitting}>
                        {submitting ? <span className="loading loading-spinner loading-sm" /> : "Login"}
                    </button>

                    <button
                        type="button"
                        onClick={handleDemoFill}
                        className="btn btn-outline w-full"
                        disabled={submitting || socialSubmitting}
                    >
                        Use Demo Credentials
                    </button>
                </form>

                <div className="divider my-6">or</div>

                <button
                    onClick={handleGoogleLogin}
                    className="btn w-full border border-base-300 bg-base-100 hover:bg-base-200"
                    disabled={submitting || socialSubmitting}
                >
                    {socialSubmitting ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <>
                            <FcGoogle size={22} />
                            Continue with Google
                        </>
                    )}
                </button>

                <p className="mt-6 text-center text-sm text-base-content/70">
                    New here?{" "}
                    <Link to="/register" className="link link-primary font-semibold">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
