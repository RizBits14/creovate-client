import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

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
                Swal.fire({
                    icon: "success",
                    title: "Welcome Back!",
                    text: "Login successful",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: err.message,
                });
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logged in with Google!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate(from, { replace: true });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Google Login Failed",
                    text: err.message,
                });
            });
    };

    return (
        <div className="mt-28 flex justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] mb-6">
                    Login to Creovate
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" name="email" required placeholder="Email" className="input input-bordered w-full"/>

                    <input type="password" name="password" required placeholder="Password" className="input input-bordered w-full"/>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="btn w-full rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white">Login
                    </button>
                </form>

                <button onClick={handleGoogleLogin} className="btn w-full mt-4 rounded-full border border-gray-300">
                    Login with Google
                </button>

                <p className="mt-4 text-center">
                    New here?{" "}
                    <Link to="/register" className="text-[#6C63FF] font-medium">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
