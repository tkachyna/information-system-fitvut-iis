import PropTypes from 'prop-types'
import React, { Component, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'

const EditAccountPage = () =>  {
  let {authTokens, user} = useContext(AuthContext)
  let [sent, setSent] = React.useState(false)

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

  useEffect(() => {
    setSent(false)
    sendUserID()
  }, [])

  function handleChange(event) {
    const {name, value, type} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  console.log(user.user_id)
  let sendUserID = async() => {
        let response = await fetch("api/getUserID/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({'id': user.user_id })
        })

        

        let answer = await response.json();
        setFormData(prevFormData => {
          return {
            username: answer.username,
            password2: answer.password,
            password2check: answer.password,
            email2: answer.email,
            city: answer.city,
            street: answer.street,
            housenum: answer.house_number,
            zipcode: answer.zipcode,  
            phone: answer.phone_number
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

  

  let getUserInfo = async() =>{

    let valid
    valid = validateForms();

    if (true) {
      let response = await fetch('api/changeUserInfo/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({ 
            user: formData.username, 
            email: formData.email2,
            city:formData.city,
            street: formData.street,
            house_number: formData.housenum,
            zipcode: formData.zipcode,
            phone_number: formData.phone
          })
      })

      if (response.status == 200) {
        setSent(true)
      } else {
        alert("Něco se nepodařilo.")
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
      <form>
          <TextField id="outlined-basic" label='Uživatelské jméno' variant="outlined" placeholder='Uživatelské jméno' sx = {style}
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
          <TextField id="outlined-basic" label='Email' variant="outlined" type="email" placeholder="Email" sx = {style}
            name="email2"
            onChange={handleChange} 
            value={formData.email2}
          />
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
          <br/>
          {sent && <h3 style={{color: "#008000", padding: "0px 0px 0px 20px"}} >Údaje byly úspěšně změněny!</h3>}
      </form>

    </div>
  )
  

}

export default EditAccountPage