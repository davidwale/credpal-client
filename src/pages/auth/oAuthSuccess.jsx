import React, { useEffect, useState } from 'react';

const SuccessPage = () => {

    useEffect(() => {
        const getTokenFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('token');
        };

        const tokenFromUrl = getTokenFromUrl();

        if (tokenFromUrl) {
            window.localStorage.setItem('token', tokenFromUrl);
            window.location.href = '/dashboard';
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4 text-green-600">Sign-In Successful!</h1>
            </div>
        </div>
    );
};

export default SuccessPage;

