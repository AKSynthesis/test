import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchAdminProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/admin/products`,
                {
                    headers: {
                        Authorization: USER_TOKEN,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to create products
export const createProduct = createAsyncThunk("adminProducts/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/admin/products`,
                productData,
                {
                    headers: {
                        Authorization: USER_TOKEN,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update products
export const updateProduct = createAsyncThunk("adminProducts/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/admin/products/${id}`,
                productData,
                {
                    headers: {
                        Authorization: USER_TOKEN,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete products
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${API_URL}/api/products/${id}`,
                {
                    headers: {
                        Authorization: USER_TOKEN,
                    },
                }
            );
            return id
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Create products
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            // Update products
            .addCase(updateProduct.fulfilled, (state, action) => {
                const productIndex = state.products.findIndex(
                    product => product._id === action.payload._id
                );
                if (productIndex !== -1) {
                    state.products[productIndex] = action.payload;
                }
            })

            // Delete user
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    product => product._id !== action.payload
                );
            })
    },
});

export default adminProductSlice.reducer;