import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { MdEmail } from 'react-icons/md';
import { BsFillFilePersonFill, BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import { BiShow, BiHide } from 'react-icons/bi';
import { AiFillLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState('');
    const recaptchaRef = useRef(null);
    // const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const reCaptchaOnChange = (value) => {
        setRecaptchaValue(value);
        // setRecaptchaVerified(true);
    };

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
        await axios
            .post(
                `${process.env.REACT_APP_SERVER_URL}/signup`,
                {
                    name,
                    email,
                    password,
                    recaptchaValue
                },
                { 'Content-Type': 'multipart/form-data' }
            )
            .then((res) => {
                toast.success(res.data.message);
                setMessage(res.data.message);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });

        setName('');
        setEmail('');
        setPassword('');
        recaptchaRef.current.reset();
        setIsLoading(false);
    };

    return (
        <div className="h-full w-full p-3 lg:mt-5">
            <div className="mx-auto w-full max-w-sm rounded-md bg-white p-5">
                <p className="mb-1 text-center font-playfair text-2xl font-semibold">Sign Up</p>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <BsFillFilePersonFill className="translate-x-2 translate-y-9 text-2xl" />
                    <input
                        className="w-full rounded-md border border-gray-500 p-2 pl-12 font-opensans text-lg font-light outline-none focus:border-2 focus:border-blue-500"
                        {...register('name', { required: true, maxLength: 100 })}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="true"
                    />
                    {errors.name && (
                        <p className="ml-4 text-sm font-semibold text-red-500">
                            {errors.name.type === 'required' && '* Your name is required'}
                            {errors.name.type === 'maxLength' && '* Maximum Length is 100 char.'}
                        </p>
                    )}

                    <MdEmail className="translate-x-2 translate-y-9 text-2xl" />
                    <input
                        className="w-full rounded-md border border-gray-500 p-2 pl-12 font-opensans text-lg font-light outline-none focus:border-2 focus:border-blue-500"
                        {...register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="true"
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
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                    <div className="mt-4 text-center">
                        <ReCAPTCHA
                            className="inline-block"
                            ref={recaptchaRef}
                            sitekey={process.env.REACT_APP_SITE_KEY}
                            onChange={reCaptchaOnChange}
                        />
                    </div>

                    {message && (
                        <div className="w-80% h-auto bg-green-500 p-4 text-center text-white">
                            {message}
                        </div>
                    )}
                    <button
                        className="text-playfair my-4 w-full rounded-lg bg-blue-500 p-3 text-lg font-semibold text-white hover:bg-blue-600"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Sign Up'}
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
                    to="/login"
                    className="my-3 block text-center font-opensans text-sm font-semibold text-blue-500 hover:underline"
                >
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}

export default Register;
