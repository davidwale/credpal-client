import React, { useEffect, useState } from 'react';

const ErrorPage = () => {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getMessageFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('message');
        };

        const messageFromUrl = getMessageFromUrl();

        if (messageFromUrl) {
            setErrorMessage(messageFromUrl);
        } 

            // window.location.href = '/dashboard/create';
    }, []);

    return (
        <div className="min-h-screen flex items-center flex-col justify-center bg-red-100">
            <div className="p-8 rounded-lg shadow-md text-center mb-10">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Error!</h1>
                {errorMessage ? (
                    <p className="text-lg text-red-700">{errorMessage}</p>
                ) : (
                    <p className="text-lg text-gray-700"></p>
                )}
            </div>
            <p><a href='/dashboard/create'>Back To Dashboard</a></p>

        </div>
    );
};

export default ErrorPage;
