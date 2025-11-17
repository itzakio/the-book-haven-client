import React from 'react';
import errorGif from "../assets/404-error.gif"
import { Link } from 'react-router';

const ErrorRoutePage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <img className='w-28' src={errorGif} alt="error" />
            <h2 className='text-center font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Opps No Page Found!</h2>
            <Link to="/" className="btn rounded-none mt-8 font-medium bg-primary text-white">Back to Home</Link>
        </div>
    );
};

export default ErrorRoutePage;