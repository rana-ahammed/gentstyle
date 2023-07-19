import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const { id, token } = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/${id}/verify/${token}`, config)
                .then((response) => {
                    toast.success(response.data.message);
                    setValidUrl(true);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        };
        verifyEmailUrl();
    }, []);
    return (
        <>
            {validUrl ? (
                <div className="h-100% w-100% mt-8 flex flex-col items-center justify-center">
                    <p className="text-3xl">Email verified successfully</p>
                    <Link to="/login" className="mt-4 rounded-sm bg-blue-500 px-8 py-2">
                        <button>Login</button>
                    </Link>
                </div>
            ) : (
                <p className="mt-10 text-center text-3xl text-red-500">404 Not Found</p>
            )}
        </>
    );
};

export default EmailVerify;
