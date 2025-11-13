import React from 'react';
import SliderBanner from '../Components/SliderBanner';
import FeaturedArtworks from '../Components/FeaturedArtworks';

const Home = () => {
    return (
        <div className='overflow-x-hidden w-full'>
            <SliderBanner></SliderBanner>
            <FeaturedArtworks></FeaturedArtworks>
        </div>
    );
};

export default Home;