import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Button, Alert, Divider, TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditAccountPage = () =>  {

  let {authTokens, user, logoutUser} = useContext(AuthContext)

  let navigate = useNavigate()

  let [alertMessage, setAlertMessage] = useState("")
  let [alertCode, setAlertCode] = useState()
  let [open, setOpen] = useState(false)
  let [toDelete, setToDelete] = useState(false)

  const ALERT_ERROR_40x_50x = 400
  const ALERT_SUCCESS = 200
  const ALERT_WARNING = 2
  const ALERT_ERROR = 3
  const ALERT_SUCCESS_2 = 4
  const ALERT_ERROR_2 = 5

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseYes = () => {
    setOpen(false)
    setToDelete(true)
    logoutUser()
    navigate("/login")
  };

  const handleCloseNo = () => {
    setOpen(false);
  };

  const [formData, setFormData] = React.useState({ 
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      password: "",
      password_again: "",
      email: "",
      city: "",
      street: "",
      house_number: "",
      zipcode: "",
      phone_number: ""
    }
  )

  useEffect(() => {
      getUser()
  }, [])

  function handleChange(event) {
      const {name, value} = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }

  function validation() {

      let regexHouseNumber = new RegExp(/^\d+$/)
      let regexZipCode = new RegExp(/^\d{3} \d{2}$/) 
      let regexPhoneNumber = new RegExp(/^\d{9}$/)

      let regexHouseNumberResult = regexHouseNumber.test(formData.house_number)
      let regexZipCodeResult = regexZipCode.test(formData.zipcode)
      let regexPhoneNumberResult = regexPhoneNumber.test(formData.phone_number)

      if (formData.username == "") {
        setAlertCode(ALERT_ERROR)
        setAlertMessage("Pole Uživatelské jméno nesmí být prázdné!")
        return false

      } else if (formData.email == "") {
        setAlertCode(ALERT_ERROR)
        setAlertMessage("Pole Email nesmí být prázdné!")
        return false

      } else if (formData.house_number != "" && !regexHouseNumberResult) {
        setAlertCode(ALERT_ERROR)
        setAlertMessage("Regulární výraz pro Číslo popisné selhal! (musí obsahovat pouze čísla)")
        return false

      } else if (formData.zipcode != "" && !regexZipCodeResult) {
        setAlertCode(ALERT_ERROR)
        setAlertMessage("Regulární výraz pro PSČ selhal! (správný tvar: XXX XX)")
        return false
        
      } else if (formData.phone_number != "" && !regexPhoneNumberResult) {
        setAlertCode(ALERT_ERROR)
        setAlertMessage("Regulární výraz pro Telefonní číslo selhal!")
        return false
        
      } else { 
        return true
      }
  }


  function validationPassword() {
    if (formData.password != formData.password_again) {
        setAlertCode(ALERT_ERROR_2)
        setAlertMessage("Nová hesla nejsou totožná!")
        return false;
  
      } else {
        return true;

      }
  }


  let getUser = async() => {
        let response = await fetch("api/getUserID/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({'id': user.user_id })
      })

      let answer = await response.json();

      if (response.status == 200) {
          setFormData(prevFormData => {
            return {
              username: answer.username,
              first_name: answer.first_name,
              last_name: answer.last_name,
              email: answer.email,
              city: answer.city,
              street: answer.street,
              house_number: answer.house_number,
              zipcode: answer.zipcode,  
              phone_number: answer.phone_number
            }
          })

      } else {
        setAlertCode(ALERT_ERROR_40x_50x)
        setAlertMessage("Oops. Něco se pokazilo!")

      }
  }


  let deleteAccount = async() => { 
      handleClickOpen()
      if (toDelete) {
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
            password: formData.password
          })
      })

      if (response.status == 200) {
        setAlertCode(ALERT_SUCCESS_2)
        setAlertMessage("Heslo úspěšně změněno!")
      } else {
        setAlertCode(ALERT_ERROR_2)
        setAlertMessage("Oops. Něco se nepodařilo")
      }
    }
  }
  

  let changeUserInfo = async() =>{
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
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                city:formData.city,
                street: formData.street,
                house_number: formData.house_number,
                zipcode: formData.zipcode,
                phone_number: formData.phone_number
              })
          })

          if (response.status == 200) {
              setAlertCode(ALERT_SUCCESS)
              setAlertMessage("Uživatelské údaje úspěšně změněny!")

          } else {
              setAlertCode(ALERT_ERROR_40x_50x)
              setAlertMessage("Oops. Něco se nepodařilo")
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
      {alertCode == ALERT_SUCCESS
      &&
      <Alert
          severity="success"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == ALERT_ERROR_40x_50x
      &&
      <Alert 
          severity="error"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == ALERT_WARNING
      &&
      <Alert 
          severity="warning"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == ALERT_ERROR
      &&
      <Alert 
          severity="error"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      
      <h3 style={{marginLeft: 16}}>Změna uživatelských údajů</h3>
      <form>
          <TextField required id="textfiled-username" label='Uživatelské jméno' variant="outlined" placeholder='Uživatelské jméno' sx = {style}
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
          <TextField required id="textfiled-email" label='Email' variant="outlined" type="email" placeholder="Email" sx = {style}
            name="email"
            onChange={handleChange} 
            value={formData.email}
          />
          <br/>
          <Divider sx={{m: 2}}/>
          <br/>
          <TextField id="textfiled-first_name" label='Jméno' variant="outlined" placeholder='Jméno' sx = {style}
            onChange={handleChange}
            name="first_name"
            value={formData.first_name}
          />
          <TextField id="textfiled-last_name" label='Příjmení' variant="outlined" placeholder="Příjmení" sx = {style}
            name="last_name"
            onChange={handleChange} 
            value={formData.last_name}
          />
          <br/>
          <TextField  id="textfiled-city" label='Město' variant="outlined" type="text" placeholder='Město' sx = {style}  
            name="city" 
            onChange={handleChange}
            value={formData.city}
          />
          <TextField  id="textfiled-street" label='Ulice' variant="outlined" type="text" placeholder='Ulice' sx = {style}  
            name="street" 
            onChange={handleChange}
            value={formData.street}
          />
          <TextField  id="textfiled-house_number" label='Číslo popisné' variant="outlined" type="text" placeholder='Číslo popisné' sx = {style}  
            name="house_number" 
            onChange={handleChange}
            value={formData.house_number}
          />
          <TextField  id="textfiled-zipcode" label='PSČ' variant="outlined" type="text" placeholder='PSČ' sx = {style}  
            name="zipcode" 
            onChange={handleChange}
            value={formData.zipcode}
          />
          <TextField  id="textfiled-phone_number" label='Telefonní číslo' variant="outlined" type="text" placeholder='Telefonní číslo' sx = {style}  
            name="phone_number" 
            onChange={handleChange}
            value={formData.phone_number}
          />
          <br></br>
          <Button 

            onClick={changeUserInfo} 
            variant="contained"
            sx = {style}
            >Potvrdit</Button>
          <br/>
        
      </form>
      <br/>
      {alertCode == ALERT_SUCCESS_2
      &&
      <Alert 
          severity="success"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      {alertCode == ALERT_ERROR_2
      &&
      <Alert 
          severity="error"
          sx={{width: 470, ml: 2}}>
          {alertMessage}
      </Alert>
      }
      <h3 style={{marginLeft: 16}}>Změna hesla</h3>
          <TextField required id="textfiled-password" type="password" label='Nové heslo' variant="outlined" placeholder="Nové heslo" sx = {style}
            name="password"
            onChange={handleChange} 
            value={formData.password}
          />
       
          <TextField required id="textfiled-password_check" type="password" label='Nové heslo znovu' variant="outlined" placeholder='Nové heslo znovu' sx = {style}  
            name="password_again" 
            onChange={handleChange}
            value={formData.password_again}
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
        onClose={handleCloseNo}
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
          <Button onClick={handleCloseNo}>Ne</Button>
          <Button onClick={handleCloseYes} autoFocus>
            Ano
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  

}

export default EditAccountPage