import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { productsList } = useSelector((state) => state.products);
    const { id } = useParams();
    const selectedProduct = productsList.filter((product) => product._id === id);

    return (
        <div className="mt-20 flex w-full justify-center p-2">
            <div className="flex h-1/2 w-full gap-4 rounded-md bg-zinc-200 p-2 md:w-1/2">
                <div className="flex h-full w-1/2 items-center justify-center">
                    <img
                        src={selectedProduct[0].image}
                        alt="product-image"
                        className="h-3/4 w-3/4 rounded-md"
                    />
                </div>
                <div className="flex w-1/2 flex-col justify-center p-2">
                    <p className="text-xl font-bold">{selectedProduct[0].name}</p>
                    <p className="text-md mb-3 md:mb-5">Price: ${selectedProduct[0].price}</p>
                    <p className="text-md">
                        <span className="font-bold">Description:</span>
                        {selectedProduct[0].description}
                    </p>
                    <button
                        className="mt-2 rounded-md bg-yellow-400 p-1 font-bold md:mt-8 md:w-3/4 md:p-2"
                        onClick={() => dispatch(addToCart(selectedProduct[0]))}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
