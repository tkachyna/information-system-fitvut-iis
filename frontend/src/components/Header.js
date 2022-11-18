import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom"
import Button from '@mui/material/Button'
import AuthContext from '../context/AuthContext'

const Header = () => {

  let {user, logoutUser} = useContext(AuthContext)

    return (
      <div className='header'>
        <h2>Smart City!</h2>
        <div>
        <Link to="/" >Home</Link>
        <span>  |  </span>
        {user ? (
          <p className='onclicke' onClick={logoutUser}>Logout</p>
        ):(
          <Link to="/login">Login</Link>
        )}
        </div>
        {user && <p>Hello Ave</p>}
      </div>
    )
  }

export default Header