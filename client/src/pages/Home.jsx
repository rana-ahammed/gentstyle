import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import { useDispatch, useSelector } from 'react-redux';
import HomeCard from '../components/HomeCard';
import { getProducts } from '../redux/productSlice';
import statusCode from '../utils/StatusCode';
import Loader from '../components/Loader';

const Home = () => {
    const dispatch = useDispatch();
    const { productsList, status } = useSelector((state) => state.products);
    console.log(productsList);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    if (status === statusCode.LOADING) {
        return <Loader />;
    }

    if (status === statusCode.ERROR) {
        return <p>Something went wrong! Please try again later</p>;
    }
    return (
        <>
            <Slider />
            <p className="my-10 text-center text-2xl underline">Our Popular Products</p>
            <div className="flex flex-wrap items-center justify-center gap-6 p-2 md:p-4">
                {productsList[0] &&
                    productsList.map((product) => <HomeCard product={product} key={product._id} />)}
            </div>
        </>
    );
};

export default Home;
