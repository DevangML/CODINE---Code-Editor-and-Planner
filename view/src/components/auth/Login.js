import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState(0)
  const [password, setPassword] = useState(0)
  const [errors, setErrors] = useState(0)

  const onChange = (e) => {
    setEmail({ [e.target.id]: e.target.value })
    setPassword({ [e.target.id]: e.target.value })
    setErrors({ [e.target.id]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: state.email,
      password: state.password
    }
    console.log(userData)
  }

  return (
    <section className="container">
      <section style={{ marginTop: '4rem' }} className="row">
        <section className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <section className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </section>
          <form noValidate onSubmit={onSubmit}>
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
                Login
              </button>
            </section>
          </form>
        </section>
      </section>
    </section>
  )
}

export default Login
