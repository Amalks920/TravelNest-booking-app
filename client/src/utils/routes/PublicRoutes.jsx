import { lazy, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectRole, selectToken } from '../../features/authentication/services/loginSlice';
import Home from '../../pages/user/HomePage';
const Login = lazy(() => import('../../pages/Login'));
const Signup = lazy(() => import('../../pages/Signup'));
const VerifyEmailOrPhone = lazy(() => import('../../features/authentication/components/VerifyEmailOrPhone'));
const ForgotPasswordForm = lazy(() => import('../../features/authentication/components/ForgotPasswordForm'));


function PublicRoutes() {
    const token=useSelector(selectToken)
    const role=useSelector(selectRole)
    const navigate=useNavigate()

   // if(token) navigate('/home')
    return [
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/verify-email-or-phone', element: <VerifyEmailOrPhone /> },
        { path: '/forgot-password', element: <ForgotPasswordForm /> },
        { path: '/owner-login', element: <Login /> },
        {
            path: '/owner',
            children: [
                {
                    path: '/owner/signup',
                    element: <Signup />
                },
                {
                    path: '/owner/login',
                    element: <Login />
                }
            ]
        },
        {
            path: '/admin',
            children: [
                {
                    path: '/admin/login',
                    element: <Login />
                }
            ]
        },
    ]

}

export default PublicRoutes;