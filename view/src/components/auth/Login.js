import { useHistory } from 'react-router'
import React, { useEffect } from 'react'

function Login() {
  const history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form[0].value,
      password: form[1].value
    }

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token)
      })
  }
  useEffect(() => {
    fetch('/isUserAuth', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? history.push('/dashboard') : null))
  }, [])

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      <input type="email" required />
      <input type="password" required />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Login
