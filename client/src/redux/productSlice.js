import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import statusCode from '../utils/StatusCode';

const initialState = {
    productsList: JSON.parse(localStorage.getItem('productsList')) || [],
    status: statusCode.IDLE
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.status = statusCode.LOADING;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = statusCode.IDLE;
            console.log(action.payload);
            const products = localStorage.setItem('productsList', JSON.stringify(action.payload));
            state.productsList.push(products);
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.status = statusCode.ERROR;
        });
    }
});

export default productSlice.reducer;

export const getProducts = createAsyncThunk('/products/get', async () => {
    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getProducts`);
    return result.data;
});
