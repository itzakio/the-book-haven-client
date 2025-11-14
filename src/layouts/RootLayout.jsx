import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                <Navbar/>
            </header>
            <main className='flex-1'>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
             <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default RootLayout;