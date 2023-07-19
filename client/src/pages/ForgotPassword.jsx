import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            withCredentials: true
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/forgot/password`, { email }, config)
            .then((response) => {
                toast.success(response.data.message);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
        setLoading(false);
        setEmail('');
    };
    return (
        <div className="mt-20 flex w-full justify-center p-2">
            <div className="h-2/6 w-full rounded-md bg-zinc-200 p-4 shadow-md md:w-2/6">
                <p className="text-xl font-bold">Find Your Account</p>
                <p className="mb-5 mt-5 text-lg font-normal">
                    Please enter your email address to search for your account.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        value={email}
                        required
                        className="w-full rounded-md border-none px-4 py-2 outline-none"
                    />
                    <div className="mt-3 flex justify-end gap-1">
                        <Link
                            to="/login"
                            className="rounded-md bg-gray-300 p-1 hover:bg-gray-400 md:p-2"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-300 p-1 hover:bg-blue-400 md:p-2"
                            disabled={loading === true}
                        >
                            {loading ? 'Loading...' : 'Search'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
