import React, { Component, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Alert, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom'

const SignupPage = () =>  {

    let {authTokens} = useContext(AuthContext)

    const ALERT_SUCCESS= 0;
    const ALERT_ERROR = 1;

    let [alertMessage, setAlertMessage] = useState("")
    let [alertCode, setAlertCode] = useState()
    let [formData, setFormData] = useState({
        username: "",
        password: "",
        password_again: "",
        email: "",
        city: "",
        street: "",
        house_number: "",
        zipcode: "",
        phone_number: ""
    })

    function handleChange(event) {
        const {name, value,} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function validateForms() {
        if (formData.password !== formData.password_again) {
            setAlertCode(ALERT_ERROR)
            setAlertMessage("Zadaná hesla se neshodují!")
            return false;
        
        } else if (formData.password == "" || formData.password_again == "" || formData.username == ""  || formData.email == "") {
            setAlertCode(ALERT_ERROR)
            setAlertMessage("Vyplň všechna pole s * !")
            return false;

        } else {
            return true;
        }
    }

  let signInUser = async() =>{
    let valid = validateForms();
    if (valid) {
        let response =  await fetch('/api/registrateUser', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                    user: formData.username, 
                    password: formData.password, 
                    email: formData.email,
                    city:formData.city,
                    street: formData.street,
                    house_number: formData.house_number,
                    zipcode: formData.zipcode,
                    phone_number: formData.phone_number
            })
        })

        let data = await response.json()
        console.log(data)
        if (response.status == 200) {
            setAlertCode(ALERT_SUCCESS)
            setAlertMessage("Byl jste úspěšně zaregistrován!")

        } else {
            setAlertCode(ALERT_ERROR)
            setAlertMessage(data)
        }
    }
  }

  let style = {
    width: 250,
    height: 40,
    mb: 4,
    ml: 2
  } 

  return (
    <div className='form-signup'>
       {alertCode == 0
          &&
          <Alert 
            severity="success"
            sx={{width: 470, ml: 2, mb: 2}}>
            {alertMessage}
          </Alert>
          }
          {alertCode == 1
          &&
          <Alert 
            severity="error"
            sx={{width: 470, ml: 2, mb: 2}}>
            {alertMessage}
          </Alert>
          }
      <form>
          <TextField required id="outlined-basic-1" label='Uživatelské jméno' variant="outlined" placeholder='Uživatelské jméno' sx = {style}
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
          <TextField required id="outlined-basic-2" label='Heslo' variant="outlined" type="password" placeholder='Heslo' sx = {style}
            name="password" 
            onChange={handleChange}
            value={formData.password}
          />
          <TextField required id="outlined-basic-3" label='Heslo znovu' variant="outlined" type="password" placeholder='Heslo znovu' sx = {style}
            name="password_again"   
            onChange={handleChange}
            value={formData.password_again}
          />
          <TextField required id="outlined-basic-4" label='Email' variant="outlined" type="email" placeholder="Email" sx = {style}
            name="email"
            onChange={handleChange} 
            value={formData.email}
          />
          <br/>
          <div className='signup--text-2' >Řekněte nám o sobě trochu víc ...</div>
          <br/>
          <TextField  id="outlined-basic-5" label='Město' variant="outlined" type="text" placeholder='Město' sx = {style}  
            name="city" 
            onChange={handleChange}
            value={formData.city}
          />
          <TextField  id="outlined-basic-6" label='Ulice' variant="outlined" type="text" placeholder='Ulice' sx = {style}  
            name="street" 
            onChange={handleChange}
            value={formData.street}
          />
          <TextField  id="outlined-basic-7" label='Číslo popisné' variant="outlined" type="text" placeholder='Číslo popisné' sx = {style}  
            name="house_number" 
            onChange={handleChange}
            value={formData.house_number}
          />
          <TextField  id="outlined-basic-8" label='PSČ' variant="outlined" type="text" placeholder='PSČ' sx = {style}  
            name="zipcode" 
            onChange={handleChange}
            value={formData.zipcode}
          />
          <TextField  id="outlined-basic-9" label='Telefonní číslo' variant="outlined" type="text" placeholder='Telefonní číslo' sx = {style}  
            name="phone_number" 
            onChange={handleChange}
            value={formData.phone_number}
          />
          <br></br>
          <Button 

            onClick={signInUser}
            variant="contained"
            sx = {style}
            >Potvrdit</Button>
      </form>
      
    </div>
  )
      

}

export default SignupPage