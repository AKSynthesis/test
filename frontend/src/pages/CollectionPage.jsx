import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaFilter } from "react-icons/fa"
import FilterSideBar from "../components/product/FilterSideBar";
import SortOptions from "../components/product/SortOptions";
import ProductGrid from "../components/product/ProductGrid";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

function CollectionPage() {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSideBar = () => {
        setIsSidebarOpen(prev => !prev);
    }

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        // Add Event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);
        // Clean Event listener for clicks
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [])

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Filter Button */}
            <button
                onClick={toggleSideBar}
                className="lg:hidden border p-2 flex justify-center items-center"
            >
                <FaFilter className="mr-2" />
            </button>

            {/* Filter Sidebar */}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 x-50 left-0 w-64 
                bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSideBar />
            </div>

            <div className="flex-grow">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>

                {/* Sort Options */}
                <SortOptions />

                {/* Product Grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    );
}

export default CollectionPage;