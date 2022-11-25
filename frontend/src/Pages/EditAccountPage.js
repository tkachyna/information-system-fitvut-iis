import PropTypes from 'prop-types'
import React, { Component, useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import { Alert, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const EditAccountPage = () =>  {

  let {authTokens, user} = useContext(AuthContext)

  let navigate = useNavigate()

  let [sent, setSent] = React.useState(false)
  let [alertMessage, setAlertMessage] = useState("")
  let [alertCode, setAlertCode] = useState()
  let [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login")
  };

  const [formData, setFormData] = React.useState(
    {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      oldpassword: "",
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
  // formDataValues = Object.values(formData)

  //     if (formDataValues.some((e) => (e == ""))) {
  //         console.log("test")
  //     }

  function validation() {

      console.log(formData.zipcode)
      let regexHouseNumber = "\d+"
      let regexZipCode = "\d{3} \d{2}" 
      let regexPhoneNumber = "\d{9}"
      let regexHouseNumberResult = regexHouseNumber.test(formData.housenum)
      let regexZipCodeResult = regexZipCode.test(formData.zipcode)
      let regexPhoneNumberResult = regexPhoneNumber.test(formData.phone)

      if (formData.username == "") {
        setAlertCode(3)
        setAlertMessage("Pole Uživatelské jméno nesmí být prázdné!")
        return false

      } else if (formData.email2 == "") {
        setAlertCode(3)
        setAlertMessage("Pole Email nesmí být prázdné!")
        return false

      // } else if (!regexHouseNumberResult) {
      //   setAlertCode(3)
      //   setAlertMessage("Regulární výraz pro Číslo popisné selhal! (musí obsahovat pouze čísla)")
      //   return false

      } else if (!regexZipCodeResult) {
        setAlertCode(3)
        setAlertMessage("Regulární výraz pro PSČ selhal! (správný tvar: XXX XX)")
        return false
        
      } else if (!regexPhoneNumberResult) {
        setAlertCode(3)
        setAlertMessage("Regulární výraz pro Telefonní číslo selhal!")
        return false
        
      }
  }


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
          firstname: answer.first_name,
          lastname: answer.last_name,
          password: answer.password,
          email2: answer.email,
          city: answer.city,
          street: answer.street,
          housenum: answer.house_number,
          zipcode: answer.zipcode,  
          phone: answer.phone_number
        }
      })
      
      
  }


  function validationPassword() {

  if (formData.password2 !== formData.password2check) {
      setAlertCode(5)
      setAlertMessage("Nová hesla nejsou totožná!")
      return false;

    } else {
      return true;
    }
  }

  let deleteAccount = async() => { 
    handleClickOpen()
    let response = await fetch(`api/deleteAccount`, {
      method:'POST',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        id: user.user_id
      })
    })


  }

  let changePassword = async() => {

    let valid = validationPassword() 
    if (valid) {
      let response = await fetch('api/changePassword', {
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({ 
            id: user.user_id,
            password: formData.password2
          })
      })

      if (response.status == 200) {
        setAlertCode(4)
        setAlertMessage("Heslo úspěšně změněno!")
      } else {
        setAlertCode(5)
        setAlertMessage("Oops. Něco se nepodařilo")
      }
    }
  }
  

  let getUserInfo = async() =>{

    let valid = validation()

      if (valid) {
      let response = await fetch('api/changeUserInfo/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({ 
            user: formData.username, 
            first_name: formData.firstname,
            last_name: formData.lastname,
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
      {alertCode == 200 
      &&
      <Alert
          severity="success"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == 3
      &&
      <Alert 
          severity="error"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == 2
      &&
      <Alert 
          severity="warning"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == 1
      &&
      <Alert 
          severity="error"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      
      <h3 style={{marginLeft: 16}}>Změna uživatelských údajů</h3>
      <form>
          <TextField required id="outlined-basic" label='Uživatelské jméno' variant="outlined" placeholder='Uživatelské jméno' sx = {style}
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
          <TextField required id="outlined-basic" label='Email' variant="outlined" type="email" placeholder="Email" sx = {style}
            name="email2"
            onChange={handleChange} 
            value={formData.email2}
          />
          <br/>
          <Divider sx={{m: 2}}/>
          <br/>
          <TextField id="outlined-basic" label='Jméno' variant="outlined" placeholder='Jméno' sx = {style}
            onChange={handleChange}
            name="firstname"
            value={formData.firstname}
          />
          <TextField id="outlined-basic" label='Příjmení' variant="outlined" placeholder="Příjmení" sx = {style}
            name="lastname"
            onChange={handleChange} 
            value={formData.lastname}
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
      <br/>
      {alertCode == 4
      &&
      <Alert 
          severity="success"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == 5
      &&
      <Alert 
          severity="error"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      <h3 style={{marginLeft: 16}}>Změna hesla</h3>
          <TextField required id="outlined-basic" type="password" label='Nové heslo' variant="outlined" placeholder="Nové heslo" sx = {style}
            name="password2"
            onChange={handleChange} 
            value={formData.password2}
          />
       
          <TextField required id="outlined-basic" type="password" label='Nové heslo znovu' variant="outlined" placeholder='Nové heslo znovu' sx = {style}  
            name="password2check" 
            onChange={handleChange}
            value={formData.password2check}
          />
          <br></br>
          <Button 

            onClick={changePassword} 
            variant="contained"
            sx = {style}
            >Potvrdit</Button>
      <br></br>
      <h3 style={{marginLeft: 16}}>Smazání účtu</h3>
          <Button 
            onClick={deleteAccount}
            variant="outlined"
            sx = {{width: 250,
              height: 40,
              mb: 4,
              ml: 2,
              color: "red",
            borderColor: "red"}}
            >Smazat účet</Button>
          <br/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Smazání účtu"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Jste si jisti, že chcete smazat tento účet?
            POZOR: Smazaný účet již nelze navrátit!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ne</Button>
          <Button onClick={handleClose} autoFocus>
            Ano
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  

}

export default EditAccountPage