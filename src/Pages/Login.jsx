/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        login(email, password)
            .then(() => {
                toast.success("Welcome back!");
                navigate(from, { replace: true });
            })
            .catch(() => {
                toast.error("Check Email and Password");
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(from, { replace: true });
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="mt-28 flex justify-center px-4">
            <div className="w-full max-w-md bg-linear-to-br from-white/80 via-[#f9fafb]/80 to-[#eef2ff]/80 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg dark:shadow-black/40 rounded-2xl p-8 backdrop-blur-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">

                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] mb-6">Login to Creovate</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" name="email" required placeholder="Email" className="input input-bordered w-full bg-transparent border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100" />

                    <input type="password" name="password" required placeholder="Password" className="input input-bordered w-full bg-transparent border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100" />

                    <button type="submit" className="btn w-full rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white font-semibold">
                        Login
                    </button>
                </form>

                <button onClick={handleGoogleLogin} className="btn w-full mt-4 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2"
                ><FcGoogle size={24} /> Login with Google</button>

                <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                    New here?{" "}
                    <Link to="/register" className="text-[#6C63FF] font-medium hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
