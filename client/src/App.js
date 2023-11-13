import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
