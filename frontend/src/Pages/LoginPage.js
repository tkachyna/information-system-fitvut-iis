import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () =>  {
  let {loginUser} = useContext(AuthContext)

  return (
    <div>
      <form onSubmit={loginUser}>
          <input type="text" name="username" placeholder='Enter Username'/>
          <br/>
          <input type="password" name="password" placeholder='Enter Password'/>
          <br/>
          <input type="submit" />
          <br/>
      </form>
      <p>Don't have an account? Sign up here.</p>
      <Link to="/signup">Sign Up</Link>
    </div>
  )
  
}

export default LoginPage