import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button'
import AuthContext from '../context/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header = () => {

  let {user, logoutUser} = useContext(AuthContext)
  let navigate = useNavigate()
    let userRole = {
      1: "obyvatel",
      2: "servisní technik",
      3: "správce města",
      4: "administrátor"
    }

    return (
      <div className='header'>
        <NavigateBeforeIcon onClick={() => navigate(-1)}>Home</NavigateBeforeIcon>
        <h2> {"Informační systém správy závad"}</h2>
        <HomeIcon onClick={() => navigate('/')}>Home</HomeIcon>
        {user && <LogoutIcon onClick={logoutUser}>Logout</LogoutIcon>}
        {!user && <LoginIcon onClick={() => navigate('/login')}/>}
        {user && <div className='header--loggedas'>Jsi aktuálně přihlášen jako "{user.username}", tvoje role je {userRole[user.role]}</div>}
        
        <InfoIcon onClick={() => navigate('/about')} className='header--button-about'/>
 

      </div>
    )
  }
export default Header