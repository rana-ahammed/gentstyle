import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, accessby, permission }) => {
    const { user } = useSelector((state) => state.user);

    if (permission === 'authorised') {
        if (user.email && user.email === process.env.REACT_APP_ADMIN_EMAIL) return children;
    }

    if (accessby === 'non-authenticated') {
        if (!user.name) return children;
    }

    if (accessby === 'authenticated') {
        if (user.name) return children;
    }
    return <Navigate to="/" />;
};

export default ProtectedRoute;
