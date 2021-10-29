import React from 'react'
import { Link } from 'react-router-dom'

function VanillaRouteButton() {
	return (
		<section className='vanilla_button'>
			<button className='vanilla_button__item-1'>
				<Link to='/nvanilla' className='vanilla_button__item-1__sub-item'>Normal UI</Link>
			</button>

			<button className='vanilla_button__item-2'>
				<Link to='/fvanilla' className='vanilla_button__item-2__sub-item'>Fluent UI</Link>
			</button>
		</section>
	)
}

export default VanillaRouteButton
