import React, { useState,  Component, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

const LoginPage = () =>  {
  let {loginUser} = useContext(AuthContext)
  let [alertMessage, setAlertMessage] = useState("")
  let [alertCode, setAlertCode] = useState(0)

  let style = {
    width: 250,
    height: 40,
    m: 2
  } 

  let logUser = async(event) => {
    let response = await loginUser(event)
    if (response == 1) {
        setAlertCode(response)
        setAlertMessage("Špatně zadané uživatelské jméno nebo heslo!")
    }
  }

  return (
    <div>
      {alertCode == 1
      &&
      <Alert 
          severity="error"
          sx={{width: 470, m: 2}}>
          {alertMessage}
      </Alert>
      }
      <form onSubmit={logUser}>
          <TextField required
            id="outlined-basic" label='Uživatelské jméno' variant="outlined" sx = {style}
            type="text" name="username" placeholder='Uživatelské jméno'/>
          <br/>
          <TextField required
            id="outlined-basic2" label='Heslo' variant="outlined" sx = {style}
            type="password" name="password" placeholder='Enter Password'/>
          <br/>
          <Button  type="submit" variant="contained" sx = {style}>Přihlásit se</Button>
          <br/>
      </form>
      <div className='signup--text-2'>Nemáte ještě účet? <Link to="/signup">Zaregistrujte se.</Link></div>
      
    </div>
  )
  
}

export default LoginPage