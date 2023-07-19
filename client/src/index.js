import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerify from './pages/EmailVerify';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import PaymentSuccess from './pages/PaymentSuccess';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route
                path="/newproduct"
                element={
                    <ProtectedRoute permission="authorised">
                        <NewProduct />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <ProtectedRoute accessby="non-authenticated">
                        <Login />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <ProtectedRoute accessby="non-authenticated">
                        <Register />
                    </ProtectedRoute>
                }
            />
            <Route path="/:id/verify/:token" element={<EmailVerify />} />
            <Route
                path="/payment-success"
                element={
                    <ProtectedRoute accessby="authenticated">
                        <PaymentSuccess />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/forgot/password"
                element={
                    <ProtectedRoute accessby="non-authenticated">
                        <ForgotPassword />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/:id/resetpassword/:token"
                element={
                    <ProtectedRoute accessby="non-authenticated">
                        <ResetPassword />
                    </ProtectedRoute>
                }
            />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
