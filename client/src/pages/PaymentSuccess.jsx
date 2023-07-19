import React, { useEffect } from 'react';

const PaymentSuccess = () => {
    useEffect(() => {
        localStorage.removeItem('cartProducts');
        window.onload = function () {
            if (!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        };
    }, []);

    return (
        <div className="mt-20 h-full w-full text-center text-3xl font-bold text-black">
            Your payment is successfully completed
        </div>
    );
};

export default PaymentSuccess;
