import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Main1 from '../components/home/Main1'
import Main2 from '../components/home/Main2'
import Dfooter from '../components/general/Dfooter'
import '../styles/pageStyles/home.css'
import '../styles/componentStyles/homeComponentStyles/heroStyles.css'
import '../styles/componentStyles/homeComponentStyles/mainOneStyles.css'
import '../styles/componentStyles/homeComponentStyles/mainTwoStyles.css'

function Home() {
  return (
    <section className="home">
      <HeroSection />
      <main className="home__main">
        <Main1 />
        <Main2 />
      </main>
      <Dfooter />
    </section>
  )
}

export default Home
