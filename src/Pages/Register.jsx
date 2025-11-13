/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { register, googleLogin, logout } = useContext(AuthContext);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            return toast.error("Password must contain at least one lowercase letter.");
        }

        register(email, password)
            .then((result) => {
                const loggedUser = result.user;

                return updateProfile(loggedUser, {
                    displayName: name,
                    photoURL: photoURL || "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                });
            })
            .then(() => {
                logout();
                toast.success("Account created! Please login.");
                navigate("/login");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleGoogleSignup = () => {
        googleLogin()
            .then(() => {
                toast.success("Signed up with Google!");
                navigate("/");
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="mt-28 flex justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 rounded-2xl p-8 transition-colors duration-300">
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-pink-500 to-indigo-500 mb-6">Create an Account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" name="name" placeholder="Name" required className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700" />

                    <input type="email" name="email" placeholder="Email" required className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700" />

                    <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700" />

                    <input type="password" name="password" placeholder="Password" required className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700"
                    />

                    <button type="submit" className="btn w-full rounded-full bg-linear-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 transition">
                        Register
                    </button>
                </form>

                <button onClick={handleGoogleSignup} className="btn w-full mt-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-indigo-500 dark:hover:border-pink-400 transition">
                    <FcGoogle size={24} /> Sign Up with Google
                </button>

                <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-500 dark:text-pink-400 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
