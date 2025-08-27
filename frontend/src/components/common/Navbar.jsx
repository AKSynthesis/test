import { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const cartItemCount =
        cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
        0;

    const toggleCartDrawer = () => {
        setDrawerOpen(prev => !prev);
    }

    const toggleNavDrawer = () => {
        setNavDrawerOpen(prev => !prev);
    }

    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Left - logo */}
                <div>
                    <Link to="/" className="text-2xl font-medium">Imposter</Link>
                </div>

                {/* Center- Navgation */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/collections/all?gender=Men" className="text-gray-700 hover:text-black text-sm font-medium uppercase">MEN</Link>
                    <Link to="/collections/all?gender=Women" className="text-gray-700 hover:text-black text-sm font-medium uppercase">WOMEN</Link>
                    <Link to="/collections/all?category=Top Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">TOP WEAR</Link>
                    <Link to="/collections/all?category=Bottom Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">BOTTOM WEAR</Link>
                </div>

                {/* Right- Icons */}
                <div className="flex items-center space-x-4">
                    {user && user.role === "admin" && (
                        <Link to="/admin" className="block bg-black text-white text-sm rounded px-2 hover:bg-gray-800 transition">
                            Admin
                        </Link>
                    )}
                    <Link to="/profile" className="hover:text-black">
                        <HiOutlineUser className="h-6 w-6 text-gray-700" />
                    </Link>
                    <button className="relative hover:text-black" onClick={toggleCartDrawer}>
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 bg-custom text-white text-xs rounded-full px-2 py-0.5 ">{cartItemCount}</span>
                        )}
                    </button>

                    {/* Search Icon */}
                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>

                    {/* Hamburger button - mobile navigation */}
                    <button
                        onClick={toggleNavDrawer}
                        className="md:hidden"
                    >
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer
                toggleCartDrawer={toggleCartDrawer}
                drawerOpen={drawerOpen}
            />

            {/* Mobile Navigation */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white 
            shadow-lg transform transition-transform duration-300 l z-50
            ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Close button */}
                <div className="flex justify-end p-4">
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl  font-semibold mb-4">Menu</h2>
                    <nav className="space-y-4">
                        <Link
                            to="/collections/all?gender=Men"
                            onClick={toggleNavDrawer}
                            className="block text-gray-600 hover:text-black"
                        >
                            MEN
                        </Link>
                        <Link
                            to="/collections/all?gender=Women"
                            onClick={toggleNavDrawer}
                            className="block text-gray-600 hover:text-black"
                        >
                            WOMEN
                        </Link>
                        <Link
                            to="/collections/all?category=Top Wear"
                            onClick={toggleNavDrawer}
                            className="block text-gray-600 hover:text-black"
                        >
                            TOP WEAR
                        </Link>
                        <Link
                            to="/collections/all?category=Bottom Wear"
                            onClick={toggleNavDrawer}
                            className="block text-gray-600 hover:text-black"
                        >
                            BOTTOM WEAR
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Navbar;