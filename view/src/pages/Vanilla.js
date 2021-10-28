import React from 'react'
import VanillaRouteButton from '../components/vanilla/VanillaRouteButton'
import VanillaNormal from '../components/vanilla/VanillaNormal'
import VanillaFluent from '../components/vanilla/VanillaFluent'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function Vanilla() {
	return (
		<section className='vanilla'>
			<Router>
				<header className='vanilla__header'>
					<h1 className='vanilla__header__item'>
						Vanilla Web Live Compiler
					</h1>
				</header>
				<VanillaRouteButton />
				<Switch>
					<Route path='/nvanilla'>
						<VanillaNormal />
					</Route>
					<Route path='/fvanilla'>
						<VanillaFluent />
					</Route>
				</Switch>
			</Router>
		</section>
	)
}

export default Vanilla
