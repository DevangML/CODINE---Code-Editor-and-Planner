import React from 'react';
import HeroSection from '../Components/HeroSection'
import Main1 from '../Components/Main1'
import Main2 from '../Components/Main2'
import Dfooter from '../Components/Dfooter'

function Home() {
    return (
        <section className="home">
            <HeroSection />
            <Main1 />
            <Main2 />
            <Dfooter />
        </section>
    );
}

export default Home;

