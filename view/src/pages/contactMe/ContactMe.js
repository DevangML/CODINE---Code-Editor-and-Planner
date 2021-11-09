import axios from 'axios'
import React, { Component } from 'react'

export class ContactMe extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			phone: '',
			message: ''
		}

		this.handleInputs = (e) => {
			this.setState({ [e.target.name]: e.target.value })
		}

		this.handleSubmit = (e) => {
			e.preventDefault()
			console.log(this.state)
			axios
				.post(url, this.state)
				.then((response) => {
					console.log(response)
				})
				.catch((error) => {
					console.log(error)
				})
		}

		const url = 'http://localhost:5000/form/post'
	}

	render() {
		return (
			<section className='contact'>
				<section className='contact__container'>
					<section className='contact__section__item-1'></section>
					<section className='contact__section__item-2'>Contact Me</section>
					<form
						className='contact__section__sub-section'
						autoComplete='off'
						onSubmit={this.handleSubmit.bind(this)}
					>
						<section className='contact__section__sub-section__item-1'>
							<svg fill='#999' viewBox='0 0 1024 1024'>
								<path
									className='contact__section__sub-section__item-1_mod-1'
									d='M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z'
								></path>
							</svg>
							<input
								type='text'
								className='contact__section__sub-section__item-1_mod-2'
								placeholder='Name'
								onChange={this.handleInputs.bind(this)}
							/>
						</section>
						<section className='contact__section__sub-section__item-2'>
							<svg fill='#999' viewBox='0 0 1024 1024'>
								<path
									className='contact__section__sub-section__item-1_mod-1'
									d='M742.4 409.6h-25.6v-76.8c0-127.043-103.357-230.4-230.4-230.4s-230.4 103.357-230.4 230.4v76.8h-25.6c-42.347 0-76.8 34.453-76.8 76.8v409.6c0 42.347 34.453 76.8 76.8 76.8h512c42.347 0 76.8-34.453 76.8-76.8v-409.6c0-42.347-34.453-76.8-76.8-76.8zM307.2 332.8c0-98.811 80.389-179.2 179.2-179.2s179.2 80.389 179.2 179.2v76.8h-358.4v-76.8zM768 896c0 14.115-11.485 25.6-25.6 25.6h-512c-14.115 0-25.6-11.485-25.6-25.6v-409.6c0-14.115 11.485-25.6 25.6-25.6h512c14.115 0 25.6 11.485 25.6 25.6v409.6z'
								></path>
							</svg>
							<input
								onChange={this.handleInputs.bind(this)}
								type='email'
								className='contact__section__sub-section__item-1_mod-2'
								placeholder='Email'
							/>
						</section>
						<section className='contact__section__sub-section__item-3'>
							<svg fill='#999' viewBox='0 0 1024 1024'>
								<path
									className='contact__section__sub-section__item-1_mod-1'
									d='M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z'
								></path>
							</svg>
							<input
								type='tel'
								onChange={this.handleInputs.bind(this)}
								className='contact__section__sub-section__item-1_mod-2'
								placeholder='Phone Number'
							/>
						</section>
						<section className='contact__section__sub-section__item-4'>
							<svg fill='#999' viewBox='0 0 1024 1024'>
								<path
									className='contact__section__sub-section__item-1_mod-1'
									d='M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z'
								></path>
							</svg>
							<input
								type='text'
								onChange={this.handleInputs.bind(this)}
								className='contact__section__sub-section__item-1_mod-2'
								placeholder='Message'
							/>
						</section>
						<input type='submit' value='send' className='contact__item' />
					</form>
				</section>
			</section>
		)
	}
}

export default ContactMe
