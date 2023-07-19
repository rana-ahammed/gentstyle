import React from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';

const CartCard = ({ product }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex h-36 w-full gap-5 rounded-md bg-yellow-100 p-2 md:w-3/4 md:p-4">
            <div>
                <img src={product.image} alt="product-image" className="h-28 w-full rounded-md" />
            </div>
            <div className="flex h-full w-full items-center justify-around">
                <div className="w-1/3">
                    <p className="text-sm font-bold md:text-xl">{product.name}</p>
                    <p className="text-sm font-light">$ {product.price}</p>
                    <button className="mt-3 rounded-full p-1 text-sm hover:bg-gray-300 md:text-xl">
                        <AiFillDelete onClick={() => dispatch(removeFromCart(product._id))} />
                    </button>
                </div>
                <div className="flex w-1/3 gap-1 text-sm md:gap-3 md:text-xl">
                    <button className="border border-black hover:bg-gray-200 md:p-1">
                        <AiOutlineMinus onClick={() => dispatch(decreaseQuantity(product._id))} />
                    </button>
                    <p>{product.quantity}</p>
                    <button className="gap-1 border border-black hover:bg-gray-200 md:p-1">
                        <AiOutlinePlus onClick={() => dispatch(increaseQuantity(product._id))} />
                    </button>
                </div>

                <div className="ml-4 w-1/3 flex-col justify-end md:flex md:gap-2 md:pr-4">
                    <p className="text-sm md:text-xl">Total:</p>
                    <p className="text-sm font-bold md:text-xl">${product.total}</p>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
