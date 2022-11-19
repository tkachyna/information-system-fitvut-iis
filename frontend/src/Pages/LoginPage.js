import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginPage = () =>  {
  let {loginUser} = useContext(AuthContext)

  let style = {
    width: 250,
    height: 40,
    mb: 4,
    ml: 2
  } 

  return (
    <div>
      <form onSubmit={loginUser}>
          <TextField 
            id="outlined-basic" label='Uživatelské jméno' variant="outlined" sx = {style}
            type="text" name="username" placeholder='Uživatelské jméno'/>
          <br/>
          <TextField 
            id="outlined-basic" label='Heslo' variant="outlined" sx = {style}
            type="password" name="password" placeholder='Enter Password'/>
          <br/>
          <Button  type="submit" variant="contained" sx = {style}>Přihlásit se</Button>
          <br/>
      </form>
      <div className='signup--text-1'>Nemáte ještě účet? <Link to="/signup">Zaregistrujte se.</Link></div>
      
    </div>
  )
  
}

export default LoginPage