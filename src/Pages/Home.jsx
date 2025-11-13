import React from 'react';
import SliderBanner from '../Components/SliderBanner';
import FeaturedArtworks from '../Components/FeaturedArtworks';
import TopArtists from '../Components/TopArtists';
import CommunityHighlights from '../Components/CommunityHighlights';

const Home = () => {
    return (
        <div className='overflow-x-hidden w-full'>
            <SliderBanner></SliderBanner>
            <FeaturedArtworks></FeaturedArtworks>
            <TopArtists></TopArtists>
            <CommunityHighlights></CommunityHighlights>
        </div>
    );
};

export default Home;