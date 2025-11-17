import React from 'react';
import errorGif from "../assets/404-error.gif"

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <img className='w-28' src={errorGif} alt="error" />
            <h2 className='text-center font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>No Books Found!</h2>
        </div>
    );
};

export default ErrorPage;