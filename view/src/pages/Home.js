import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Main1 from '../components/home/Main1'
import Main2 from '../components/home/Main2'
import Dfooter from '../components/general/Dfooter'

function Home() {
	return (
		<section className='home'>
			<HeroSection />
			<Main1 />
			<Main2 />
			<Dfooter />
		</section>
	)
}

export default Home
