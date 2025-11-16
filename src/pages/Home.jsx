import React from 'react';
import BannerCarousel from '../components/BannerCarousel';
import LatestBooks from '../components/LatestBooks';
import BookOfTheWeek from '../components/BookOfTheWeek';
import AboutSection from '../components/AboutSection';

const Home = () => {
    return (
        <div>
            <BannerCarousel/>
            <LatestBooks/>
            <BookOfTheWeek/>
            <AboutSection/>
        </div>
    );
};

export default Home;