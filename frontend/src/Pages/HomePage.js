import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const HomePage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)




  return (
    <div>
    <div>Vítejte na domovské stránce!</div>
    
    {user.role == 'citizen'
    &&
    <div>Chcete nahlásit závadu? 
    <Link to='/reportfailure'> Zde</Link>
    </div>
    }
    </div>
  )

}

export default HomePage 