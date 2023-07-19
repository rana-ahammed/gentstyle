import React from 'react';
import CartCard from '../components/CartCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
    const navigate = useNavigate();
    const { cartProducts } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const totalQuantity = cartProducts.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);

    const totalPrice = cartProducts.reduce((acc, curr) => acc + parseInt(curr.total), 0);

    const handlePayment = async () => {
        const data = {
            user: user,
            cartProducts: cartProducts,
            totalPrice: totalPrice
        };

        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        };
        if (user.email) {
            await axios
                .post(
                    `${process.env.REACT_APP_SERVER_URL}/create-checkout-session`,
                    { data },
                    config
                )
                .then((response) => {
                    if (response.data.url) {
                        window.location.href = response.data.url;
                    }
                })
                .catch((error) => console.log(error.response.data));
        } else {
            toast('Please login to place order');
            navigate('/login');
        }
    };

    return (
        <div className="flex w-full flex-col items-center gap-1 bg-violet-300 p-8">
            {cartProducts[0] ? (
                cartProducts.map((product) => <CartCard product={product} key={product._id} />)
            ) : (
                <p className="text-center text-4xl">Your Cart is Empty</p>
            )}
            {cartProducts[0] && (
                <>
                    <div className="mb-4 flex gap-4 rounded-md bg-gray-500 px-5 py-2 text-white">
                        <p className="text-md font-bold md:text-2xl">
                            Total Quantity:{' '}
                            <span className="border border-black px-2">{totalQuantity}</span>
                        </p>
                        <span className="text-md md:text-2xl">|</span>
                        <p className="text-md font-bold md:text-2xl">
                            Total Price:{' '}
                            <span className="border border-black px-2">${totalPrice}</span>
                        </p>
                    </div>
                    <button
                        className="mb-5 rounded-md bg-yellow-400 p-2 text-xl md:text-2xl"
                        onClick={handlePayment}
                    >
                        Place Order &#x2192;
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
