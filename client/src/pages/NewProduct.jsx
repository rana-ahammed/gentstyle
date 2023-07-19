import React, { useState } from 'react';
import { FcUpload } from 'react-icons/fc';
import ImagetoBase64 from '../utils/imageToBase64';
import axios from 'axios';
import toast from 'react-hot-toast';

const NewProduct = () => {
    const [data, setData] = useState({
        name: '',
        category: '',
        image: '',
        price: '',
        description: ''
    });
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };
    const handleImageChange = async (e) => {
        const data = await ImagetoBase64(e.target.files[0]);
        setData((prev) => {
            return {
                ...prev,
                image: data
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        };

        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/uploadProduct`, data, config)
            .then((response) => toast.success(response.data.message))
            .catch((error) => toast.error(error.response.data.message));

        setData(() => {
            return {
                name: '',
                category: '',
                image: '',
                price: '',
                description: ''
            };
        });
    };

    return (
        <div className="p-4">
            <form
                action=""
                className="m-auto flex h-auto w-full max-w-lg flex-col rounded-lg bg-gray-100 p-2"
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Product Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off"
                    className="bg-gray-300 p-1"
                    onChange={handleOnChange}
                    value={data.name}
                />
                <label htmlFor="category" className="mt-3">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    autoComplete="off"
                    className="h-9 bg-gray-300 p-1"
                    onChange={handleOnChange}
                    value={data.category}
                >
                    <option>Select Category</option>
                    <option value="shrits">Shirts</option>
                    <option value="trousers">Trousers</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessories">Accessories</option>
                    <option value="tupi">Tupi</option>
                </select>
                <label htmlFor="image" className="mt-3">
                    Image
                    <div className="flex h-44 w-full cursor-pointer items-center justify-center bg-gray-300">
                        {data.image ? (
                            <img src={data.image} alt="" className="h-full" />
                        ) : (
                            <FcUpload className="text-5xl" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            autoComplete="off"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </label>
                <label htmlFor="price" className="mt-3">
                    Price
                </label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    autoComplete="off"
                    onChange={handleOnChange}
                    className="bg-gray-300 p-1"
                    value={data.price}
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    autoComplete="off"
                    onChange={handleOnChange}
                    value={data.description}
                    cols="30"
                    rows="5"
                    className="resize-none bg-gray-300 p-1"
                ></textarea>
                <button
                    type="submit"
                    className="w-50% mx-auto mt-5 rounded-lg bg-orange-400 px-8 py-1 text-lg text-white"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default NewProduct;
