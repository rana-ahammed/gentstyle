import React, { useState } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutredux } from '../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { cartProducts } = useSelector((state) => state.cart);
    const [showMenu, setShowMenu] = useState(false);
    const handleShowMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = async () => {
        dispatch(
            logoutredux({
                user: {}
            })
        );
        localStorage.removeItem('user');
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        };
        await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/logout`, config)
            .then((response) => {
                toast.success(response.data.message);
                navigate('/');
            })
            .catch((error) => toast.error(error.response.data.message));
    };
    return (
        <nav className="fixed z-50 h-16 w-full bg-pink-500 px-2 shadow-md md:px-4">
            {/* DeskTop */}
            <div className="z-10 flex h-full items-center justify-between">
                <Link
                    to={'/'}
                    className="box-border rounded-lg border p-2 font-bold hover:border-black"
                >
                    RanaShop
                </Link>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden text-base md:flex md:gap-6 md:text-lg">
                        <Link to={'/'} className="hover:underline">
                            Home
                        </Link>
                    </div>
                    <Link to="/cart" className="relative text-2xl text-slate-600">
                        <BsFillCartFill />
                        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-center text-sm text-white">
                            {cartProducts[0] ? cartProducts.length : <p>0</p>}
                        </div>
                    </Link>
                    <div className="" onClick={handleShowMenu}>
                        <div className="cursor-pointer text-3xl text-slate-600">
                            {user.name && user.name ? (
                                <button className="rounded-lg bg-gray-100 p-2 text-sm hover:bg-gray-300">
                                    Hello, {user.name.split(' ')[0]}
                                </button>
                            ) : (
                                <button
                                    className="rounded-lg bg-gray-200 p-1 hover:bg-gray-400"
                                    aria-label="user-button"
                                >
                                    <HiOutlineUserCircle />
                                </button>
                            )}
                        </div>
                        {showMenu && (
                            <div className="absolute right-2 flex cursor-pointer flex-col rounded-md bg-white p-2 shadow drop-shadow-md">
                                <div className="flex flex-col rounded-md p-1 hover:bg-gray-300 md:hidden">
                                    <Link to={'/'}>Home</Link>
                                </div>
                                {user.email && user.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <Link
                                        to="/newproduct"
                                        className="whitespace-nowrap rounded-md p-1 hover:bg-gray-300"
                                    >
                                        New Product
                                    </Link>
                                )}
                                {user.name && user.name ? (
                                    <button
                                        className="rounded-md p-1 text-left text-red-500 hover:bg-gray-300"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="rounded-md p-2 text-left text-blue-500 hover:bg-gray-300"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
