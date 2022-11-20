import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom"
import Button from '@mui/material/Button'
import AuthContext from '../context/AuthContext'

const Header = () => {

  let {user, logoutUser} = useContext(AuthContext)

    function redirectHome() {
      <Link to="/" >Home</Link>
    }

    return (
      <div className='header'>
        < h2>{" >> Informační systém správy závad"}</h2>
      
        <Link className='header--button' to="/" >Home</Link>
        {user && <div className='header--button' onClick={logoutUser}>Logout</div>}
        {!user && <Link className='header--button' to="/login">Login</Link>}
        {user && <div className='header--loggedas'>Jsi aktuálně přihlášen jako "{user.username}", tvoje role je "{user.role}"</div>}
        <Link className='header--button-about' >About</Link>

      </div>
    )
  }
export default Header