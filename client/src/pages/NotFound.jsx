import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="mx-auto w-full">
            <div className="mx-auto mt-12 flex h-1/4 w-full max-w-md flex-col items-center justify-center">
                <p className="text-2xl font-bold">Oops! You seem to be lost.</p>
                <p>Here are home page link:</p>
                <Link to="/" className="mt-3 rounded-md bg-gray-500 p-2 text-white">
                    Home Page
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
