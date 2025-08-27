import { useEffect, useState } from "react";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mergeCart } from "../redux/slices/cartSlice";
import { toast } from "sonner";

import register from "../assets/register.webp";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading, error } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    // Get redirect parameter and check if checkout or something else
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products?.length > 0 && guestId) {
                dispatch(
                    mergeCart({ guestId, user })
                ).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    // Handle toast messages when login status changes
    useEffect(() => {
        if (error) {
            toast.error(`Error when signing up: ${error}`, { duration: 2000 });
        } else if (user) {
            toast.success("Signing up successful", { duration: 2000 });
        }
    }, [error, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("User Registered:", { name, email, password });
        dispatch(registerUser({ name, email, password }));
    };

    return (
        <div className="flex">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">E-Shop</h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
                    <p className="text-center mb-6">
                        Enter your details to create an account
                    </p>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                        disabled={loading}
                    >
                        {loading ? "loading ..." : "Sign Up"}
                    </button>
                    <p className="mt-6 text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to={`/login?redirect=${encodeURIComponent(redirect)}`}
                            className="text-blue-500"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:block w-1/2 bg-gray-800">
                <div className="h-full flex flex-col justify-center items-center">
                    <img
                        src={register}
                        alt="Create Account"
                        className="h-[750px] w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default Register;