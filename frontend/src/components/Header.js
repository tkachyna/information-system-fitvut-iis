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
        < h2>Informační systém správy závad</h2>
        
        <Link to="/" >Home</Link>
        {user && <p className='onclicke' onClick={logoutUser}>Logout</p>}
        {!user && <Link to="/login">Login</Link>}
   
        

      </div>
    )
  }
export default Header