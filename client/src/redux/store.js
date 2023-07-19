import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productSlice from './productSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        products: productSlice,
        cart: cartSlice
    }
});
