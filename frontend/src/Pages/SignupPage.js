import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'

const SignupPage = () =>  {
  let [signedUp, setSignedUp] = React.useState(false)
  let {authTokens} = useContext(AuthContext)
  const [formData, setFormData] = React.useState(
    {
      username: "",
      password2: "",
      password2check: "",
      email2: "",
      city: "",
      street: "",
      housenum: "",
      zipcode: "",
      phone: ""
    }
  )

  function handleChange(event) {
    const {name, value, type} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function validateForms() {

    if (formData.password2 !== formData.password2check) {
      alert("The password is not the same!")
      return false;
    } else if (formData.username == "" || formData.password2  == "" || formData.password2check == "" || formData.email2=="" ) {
      alert("Error")
      return false;
    } else {
      return true;
    }
  }

  let getUserInfo = () =>{

    let valid
    valid = validateForms();

    if (true) {
      let response = fetch('/api/regU/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({ 
            user: formData.username, 
            password: formData.password2, 
            email: formData.email2,
            city:formData.city,
            street: formData.street,
            house_number: formData.housenum,
            zipcode: formData.zipcode,
            phone_number: formData.phone
          })
      })
    }
    setSignedUp(state => !state)  
  }

  let style = {
    width: 250,
    height: 40,
    mb: 4,
    ml: 2
  } 

  return (
    <div className='form-signup'>
      <form>
          <TextField required id="outlined-basic" label='Uživatelské jméno' variant="outlined" placeholder='Uživatelské jméno' sx = {style}
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
          <TextField required id="outlined-basic" label='Heslo' variant="outlined" type="password" placeholder='Heslo' sx = {style}
            name="password2" 
            onChange={handleChange}
            value={formData.password2}
          />
          <TextField required id="outlined-basic" label='Heslo znovu' variant="outlined" type="password" placeholder='Heslo znovu' sx = {style}
            name="password2check"   
            onChange={handleChange}
            value={formData.password2check}
          />
          <TextField required id="outlined-basic" label='Email' variant="outlined" type="email" placeholder="Email" sx = {style}
            name="email2"
            onChange={handleChange} 
            value={formData.email2}
          />
          <br/>
          <div className='signup--text-2' >Řekněte nám o sobě trochu víc ...</div>
          <br/>
          <TextField  id="outlined-basic" label='Město' variant="outlined" type="text" placeholder='Město' sx = {style}  
            name="city" 
            onChange={handleChange}
            value={formData.city}
          />
          <TextField  id="outlined-basic" label='Ulice' variant="outlined" type="text" placeholder='Ulice' sx = {style}  
            name="street" 
            onChange={handleChange}
            value={formData.street}
          />
          <TextField  id="outlined-basic" label='Číslo popisné' variant="outlined" type="text" placeholder='Číslo popisné' sx = {style}  
            name="housenum" 
            onChange={handleChange}
            value={formData.housenum}
          />
          <TextField  id="outlined-basic" label='PSČ' variant="outlined" type="text" placeholder='PSČ' sx = {style}  
            name="zipcode" 
            onChange={handleChange}
            value={formData.zipcode}
          />
          <TextField  id="outlined-basic" label='Telefonní číslo' variant="outlined" type="text" placeholder='Telefonní číslo' sx = {style}  
            name="phone" 
            onChange={handleChange}
            value={formData.phone}
          />
          <br></br>
          <Button 

            onClick={getUserInfo} 
            variant="contained"
            sx = {style}
            >Potvrdit</Button>
      </form>
      
      <div className='signup--text-2'>
        Máte již účet? Přihlaste se 
      <Link to="/login"> zde.</Link>
      </div>
      {signedUp && <div className='signup--text-2'>Byli jste úspěšně zaregistrování!</div>}

    </div>
  )
  

}

export default SignupPage