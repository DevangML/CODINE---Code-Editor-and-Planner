import { useHistory, Link } from 'react-router'
import React, { useEffect, useState } from 'react'

function Navbar() {
  const history = useHistory()
  const [username, setUsername] = useState(null)

  const handleLogin = async (e) => {
    localStorage.removeItem('token')
    await history.push('login')
  }

  useEffect(() => {
    fetch('/isUserAuth', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggenIn ? setUsername(data.username) : null))
  }, [])

  return (
    
  )
}

export default Login
