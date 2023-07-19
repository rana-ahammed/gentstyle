import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        };
        await axios
            .put(
                `${process.env.REACT_APP_SERVER_URL}/${id}/reset/password/${token}`,
                { newPassword, confirmPassword },
                config
            )
            .then((response) => {
                toast.success(response.data.message);
                navigate('/login');
            })
            .catch((error) => toast.error(error.response.data.message));
    };

    return (
        <div className="flex w-full justify-center p-2">
            <div className="mt-20 flex h-2/5 w-2/5 flex-col rounded-md bg-zinc-200 p-3 shadow-md">
                <p className="mb-8 text-center text-3xl">Reset Password</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        value={newPassword}
                        className="rounded-md border-none px-4 py-2 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        required
                        value={confirmPassword}
                        className="rounded-md border-none px-4 py-2 outline-none"
                    />
                    <button
                        className="mx-auto w-1/4 rounded-md bg-blue-400 px-4 py-2 text-lg font-bold text-white"
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
