import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
    cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const cartProducts = state.cartProducts;
            const alreadyAdded = cartProducts.some(
                (cartProduct) => cartProduct._id === action.payload._id
            );
            if (alreadyAdded) {
                toast.success('Item already added in the cart');
            } else {
                toast.success('Item added successfully');
                const quantity = 1;
                const total = action.payload.price;
                const product = { ...action.payload, quantity, total };
                cartProducts.push(product);
            }
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            state.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        },
        removeFromCart(state, action) {
            const deletedProductIndex = state.cartProducts.findIndex(
                (product) => product._id === action.payload
            );
            state.cartProducts.splice(deletedProductIndex, 1);
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
            toast.success('This product has been removed');
        },
        increaseQuantity(state, action) {
            const selectedProductIndex = state.cartProducts.findIndex(
                (product) => product._id === action.payload
            );
            const selectedProductQuantity = state.cartProducts[selectedProductIndex].quantity;
            const increasedQuantity = selectedProductQuantity + 1;
            state.cartProducts[selectedProductIndex].quantity = increasedQuantity;

            const selectedProductPrice = state.cartProducts[selectedProductIndex].price;
            state.cartProducts[selectedProductIndex].total =
                selectedProductPrice * increasedQuantity;
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        decreaseQuantity(state, action) {
            const selectedProductIndex = state.cartProducts.findIndex(
                (product) => product._id === action.payload
            );
            const selectedProductQuantity = state.cartProducts[selectedProductIndex].quantity;
            if (selectedProductQuantity > 1) {
                const decreasedQuantity = selectedProductQuantity - 1;
                state.cartProducts[selectedProductIndex].quantity = decreasedQuantity;

                const selectedProductPrice = state.cartProducts[selectedProductIndex].price;
                state.cartProducts[selectedProductIndex].total =
                    selectedProductPrice * decreasedQuantity;
                localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
            }
        }
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
