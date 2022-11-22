import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom"
import Button from '@mui/material/Button'
import AuthContext from '../context/AuthContext'
import ConstructionIcon from '@mui/icons-material/Construction';

const Header = () => {

  let {user, logoutUser} = useContext(AuthContext)

    let userRole = {
      1: "obyvatel",
      2: "servisní technik",
      3: "správce města",
      4: "administrátor"
    }

    return (
      <div className='header'>
        <h2> {"Informační systém správy závad"}</h2>
        <Link className='header--button' to="/" >Home</Link>
        {user && <a  className='header--button' onClick={logoutUser}>Logout</a>}
        {!user && <Link className='header--button' to="/login">Login</Link>}
        {user && <div className='header--loggedas'>Jsi aktuálně přihlášen jako "{user.username}", tvoje role je <ln style={{color: "#D48020"}}>{userRole[user.role]}</ln></div>}
        <Link className='header--button-about' >About</Link>

      </div>
    )
  }
export default Header