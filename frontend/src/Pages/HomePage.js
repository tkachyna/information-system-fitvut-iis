import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const HomePage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)

  let style = {
    width: 400,
    height: 40,
    mb: 2,
    ml: 2
  } 


  return (
    <div>
    <h2 className='signup--text-2'>Vítejte na domovské stránce!</h2>
    
    {user.role == 1
    &&
    <div>
    <Button  href='/reportfailure' type="submit" variant="outlined" sx = {style} >Nahlásit závadu</Button> 
    <br/>
    <Button  href='/listoffailures' type="submit" variant="outlined" sx = {style} >Zobrazit nahlášené závady</Button> 
    <br/>
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    </div>
    }
    {user.role == 2
    &&
    <div>
    <Button  href='/servicerequests' type="submit" variant="outlined" sx = {style} >Servisní požadavky</Button> 
    <br/>
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    </div>
    }
    {user.role == 4
    && 
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    }
    {user.role == 3
    &&
    <div>
    <Button  href='/addtechnician' type="submit" variant="outlined" sx = {style} >Přidat technického pracovníka</Button> 
    <br/>
    <Button  href='/servicerequests' type="submit" variant="outlined" sx = {style} >Spravovat nahlášené závady</Button>
    <br/>
    <Button  href='/servicerequests' type="submit" variant="outlined" sx = {style} >Vytvoření servisního požadavku  </Button> 
    <br/>
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    </div>
    }
    </div>

  )

}

export default HomePage 