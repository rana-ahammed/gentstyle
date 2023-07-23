import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import { BiShow, BiHide } from 'react-icons/bi';
import { AiFillLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginredux } from '../redux/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const googleLogin = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, '_self');
    };
    const fbLogin = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/facebook`, '_self');
    };
    const githubLogin = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/github`, '_self');
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setIsLoading(true);
        const config = {
            withCredentials: true,
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' }
        };
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/login`, { email, password }, config)
            .then((res) => {
                console.log(res.data.user);
                if (!res.data.user.verified) {
                    setMessage(res.data.message);
                    return toast.success(res.data.message);
                }
                window.localStorage.setItem('user', JSON.stringify(res.data.user));
                dispatch(loginredux(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            })
            .catch((err) => toast.error(err.response.data.message));

        setIsLoading(false);
    };
    return (
        <div className="h-full w-full lg:mt-5">
            <div className="mx-auto w-full max-w-sm rounded-md bg-white p-5">
                <p className="mb-1 text-center font-playfair text-2xl font-semibold">Login</p>
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <MdEmail className="translate-x-2 translate-y-9 text-2xl" />
                    <input
                        className="w-full rounded-md border border-gray-500 p-2 pl-12 font-opensans text-lg font-light outline-none focus:border-2 focus:border-blue-500"
                        {...register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="false"
                    />
                    {errors.email && (
                        <p className="ml-4 text-sm font-semibold text-red-500">
                            {errors.email.type === 'required' && '* Email is required'}
                            {errors.email.type === 'pattern' && '* Invalid email address'}
                        </p>
                    )}
                    <AiFillLock className="translate-x-2 translate-y-9 text-2xl" />
                    <input
                        className="w-full rounded-md border border-gray-500 p-2 pl-12 font-opensans text-lg font-light outline-none focus:border-2 focus:border-blue-500"
                        {...register('password', { required: true, minLength: 6 })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="false"
                    />
                    <span
                        onClick={handleShowPassword}
                        className="float-right mr-5 -translate-y-8 cursor-pointer text-gray-900"
                    >
                        {showPassword ? <BiShow /> : <BiHide />}
                    </span>
                    {errors.password && (
                        <p className="ml-4 text-sm font-semibold text-red-500">
                            {errors.password.type === 'required' && '* Password is required'}
                            {errors.password.type === 'minLength' &&
                                '* Minimum length should be 6 chars.'}
                        </p>
                    )}
                    <Link
                        to="/forgot/password"
                        className="my-3 block text-center font-opensans text-sm font-normal text-blue-500 hover:underline"
                    >
                        Forgotten password?
                    </Link>

                    {message && (
                        <p className="bg-gray-400 p-1 text-center text-blue-500">{message}</p>
                    )}

                    <button
                        className="text-playfair my-4 w-full rounded-lg bg-blue-500 p-3 text-lg font-semibold text-white hover:bg-blue-600"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Login'}
                    </button>
                </form>
                <div className="relative mt-2 pb-6">
                    <div className="absolute left-0 top-0 w-full border border-gray-400"></div>
                    <div className="absolute -top-3 left-0 w-full text-center">
                        <span className="bg-white px-4 text-xl font-semibold text-gray-600">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="flex justify-center gap-3 text-white">
                    <button
                        className="mb-3 cursor-pointer rounded-lg bg-pink-500 px-6 py-3 hover:bg-pink-600"
                        onClick={googleLogin}
                    >
                        <BsGoogle className="text-3xl" />
                    </button>
                    <button
                        className="mb-3 cursor-pointer rounded-lg bg-blue-500 px-6 py-3 hover:bg-blue-600"
                        onClick={fbLogin}
                    >
                        <BsFacebook className="text-3xl" />
                    </button>
                    <button
                        className="mb-3 cursor-pointer rounded-lg bg-gray-600 px-6 py-3 hover:bg-gray-700"
                        onClick={githubLogin}
                    >
                        <BsGithub className="text-3xl" />
                    </button>
                </div>
                <Link
                    to="/signup"
                    className="my-3 block text-center font-opensans text-sm font-semibold text-blue-500 hover:underline"
                >
                    Don&apos;t have an account? Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
