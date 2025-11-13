/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
    const { register, googleLogin } = useContext(AuthContext);
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
            return setError("Password must be at least 6 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            return setError("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            return setError("Password must contain at least one lowercase letter.");
        }

        register(email, password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Account Created!",
                    text: "You can now login.",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/login");
            })
            .catch((err) => {
                setError(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: err.message,
                });
            });
    };

    const handleGoogleSignup = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Signed up with Google!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/");
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Google Signup Failed",
                    text: err.message,
                });
            });
    };

    return (
        <div className="mt-28 flex justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" name="name" placeholder="Name" required className="input input-bordered w-full" />

                    <input type="email" name="email" placeholder="Email" required className="input input-bordered w-full" />

                    <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered w-full" />

                    <input type="password" name="password" placeholder="Password" required className="input input-bordered w-full" />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="btn w-full rounded-full bg-linear-to-r from-[#6C63FF] to-[#FF6584] text-white">
                        Register
                    </button>
                </form>

                <button onClick={handleGoogleSignup} className="btn w-full mt-4 rounded-full border border-gray-300">
                    Sign Up with Google
                </button>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#6C63FF] font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
