import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

import Hero from "../components/layout/Hero";
import FeaturedCollection from "../components/product/FeaturedCollection";
import FeaturesSection from "../components/product/FeaturesSection";
import GenderCollectionSection from "../components/product/GenderCollectionSection";
import NewArrivals from "../components/product/NewArrivals";
import ProductDetails from "../components/product/ProductDetails";
import ProductGrid from "../components/product/ProductGrid";

function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);
    axios

    useEffect(() => {
        // Fetch product for a specific collection
        dispatch(
            fetchProductsByFilters({
                gender: "Women",
                category: "Bottom Wear",
                limit: 8,
            })
        );
        //Fetch best seller product
        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBestSeller();
    }, [dispatch])

    return (
        <div className="">
            <div>
                <Hero />
                <GenderCollectionSection />
                <NewArrivals />

                {/* Best Seller */}
                <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
                {bestSellerProduct
                    ? <ProductDetails productId={bestSellerProduct._id} />
                    : <p className="text-center">Loading best seller product</p>
                }

                <div className="container mx-auto">
                    <h2 className="text-3xl text-center font-bold mb-4">
                        Top Wears for Women
                    </h2>

                    <ProductGrid products={products} loading={loading} error={error} />
                </div>

                <FeaturedCollection />

                <FeaturesSection />
            </div>
        </div>
    );
}

export default Home;