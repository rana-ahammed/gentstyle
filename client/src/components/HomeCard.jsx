import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const HomeCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex h-96 w-96 flex-col items-center justify-center rounded-md bg-zinc-200 p-2 shadow-sm">
            <Link to={`/productdetails/${product._id}`}>
                <img className="h-56 w-56 rounded-md" src={product.image} alt="product-image" />
            </Link>
            <p className="mt-1 text-xl">{product.name}</p>
            <p className="my-2">Price: ${product.price}</p>
            <p className="mb-2">{product.description}</p>
            <button
                className="rounded-md bg-yellow-400 px-6 py-2"
                onClick={() => dispatch(addToCart(product))}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default HomeCard;
