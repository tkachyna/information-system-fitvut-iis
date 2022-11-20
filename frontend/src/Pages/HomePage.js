import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const HomePage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)


  let style = {
    width: 250,
    height: 40,
    mb: 2,
    ml: 2
  } 


  return (
    <div>
    <h2 className='signup--text-2'>Vítejte na domovské stránce!</h2>
    
    {user.role == 'citizen'
    &&
    <div>
    <Button  href='/reportfailure' type="submit" variant="outlined" sx = {style} >Nahlásit závadu</Button> 
    <br/>
    <Button  href='/listoffailures' type="submit" variant="outlined" sx = {style} >Zobrazit nahlášené závady</Button> 
    </div>
    }
    {user.role == 'tech'
    &&
    <div>
    <Button  href='/servicerequests' type="submit" variant="outlined" sx = {style} >Servisní požadavky</Button> 
    <br/>
    </div>
    }
   
    </div>

  )

}

export default HomePage 