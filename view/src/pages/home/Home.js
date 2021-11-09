import React from 'react'
import HeroSection from '../home/components/HeroSection'
import Main1 from '../home/components/Main1'
import Main2 from '../home/components/Main2'
import Dfooter from '../generalComponents/Dfooter'

function Home() {
	return (
		<section className='home'>
			<HeroSection />
			<main className='home__main'>
				<Main1 />
				<Main2 />
			</main>
			<Dfooter />
		</section>
	)
}

export default Home
