import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import classnames from 'classnames'

function Login() {
  const [name, setName] = useState(0)
  const [email, setEmail] = useState(0)
  const [password, setPassword] = useState(0)
  const [password2, setPassword2] = useState(0)
  const [errors, setErrors] = useState(0)

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  const onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser)
  }

  this.props.registerUser(newUser, this.props.history); 
  };

  return (
    <section className="container">
      <section className="row">
        <section className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <section className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </section>
          <form noValidate onSubmit={onSubmit}>
            <section className="input-field col s12">
              <input
                onChange={onChange}
                value={state.name}
                error={name}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
            </section>
            <section className="input-field col s12">
              <input
                onChange={onChange}
                value={state.email}
                error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
            </section>
            <section className="input-field col s12">
              <input
                onChange={onChange}
                value={state.password}
                error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </section>
            <section className="input-field col s12">
              <input
                onChange={onChange}
                value={state.password2}
                error={errors.password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
            </section>
            <section className="col s12" style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem'
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign up
              </button>
            </section>
          </form>
        </section>
      </section>
    </section>
  )
}

export default Login
