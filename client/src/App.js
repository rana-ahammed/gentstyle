import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginredux } from './redux/userSlice';
import Footer from './components/Footer';
import { getProducts } from './redux/productSlice';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        setLoggedIn(Boolean(loggedUser));
    }, []);
    const getUser = async () => {
        const config = {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        };
        if (loggedIn === null) {
            return await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/auth/login/success`, config)
                .then(async (response) => {
                    window.localStorage.setItem('user', JSON.stringify(response.data.user));
                    dispatch(loginredux(response.data.user));
                    if (loggedIn) return navigate('/');
                })
                .catch((error) => console.log(error.response.data.message));
        }
    };

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Toaster />
            <div>
                <Navbar />
                <main className="h-full min-h-[calc(82vh)] bg-purple-300 pt-16">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
