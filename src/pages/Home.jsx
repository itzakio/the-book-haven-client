import React from 'react';
import BannerCarousel from '../components/BannerCarousel';
import LatestBooks from '../components/LatestBooks';

const Home = () => {
    return (
        <div>
            <BannerCarousel/>
            <LatestBooks/>
        </div>
    );
};

export default Home;