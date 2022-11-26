import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import {Alert }from '@mui/material';
import { Button, MenuItem, TextField }from '@mui/material';

const UserAdmin = (props) => {

    const ALERT_ERROR = 3

    let [alertMessage, setAlertMessage] = useState("")
    let [alertCode, setAlertCode] = useState()
    let {authTokens} = useContext(AuthContext)
    let [formData, setFormData] = React.useState({ 
        id: props.item.id,
        username: props.item.username,
        password: props.item.password,
        first_name: props.item.first_name,
        last_name: props.item.last_name,
        email: props.item.email,
        city: props.item.city,
        street: props.item.street,
        house_number: props.item.house_number,
        zipcode: props.item.zipcode,
        phone_number: props.item.phone_number,
        role: props.item.role,
        }
    )
    

    function validation() {
        let regexHouseNumber = new RegExp(/^\d+$/)
        let regexZipCode = new RegExp(/^\d{3} \d{2}$/) 
        let regexPhoneNumber = new RegExp(/^\d{9}$/)
        let regexHouseNumberResult = regexHouseNumber.test(formData.house_number)
        let regexZipCodeResult = regexZipCode.test(formData.zipcode)
        let regexPhoneNumberResult = regexPhoneNumber.test(formData.phone_number)

        if (formData.username == "") {
          setAlertCode(ALERT_ERROR)
          setAlertMessage(`ID: ${props.item.id} >> Pole uživatelské jméno nesmí být prázdné!`)
          return false
  
        } else if (formData.email == "") {
          setAlertCode(ALERT_ERROR)
          setAlertMessage(`ID: ${props.item.id} >> Pole email nesmí být prázdné!`)
          return false
  
        } else if (formData.house_number != "" && !regexHouseNumberResult) {
          setAlertCode(ALERT_ERROR)
          setAlertMessage(`ID: ${props.item.id} >> "Regulární výraz pro číslo popisné selhal! (musí obsahovat pouze čísla)`)
          return false
  
        } else if (formData.zipcode != "" && !regexZipCodeResult) {
          setAlertCode(ALERT_ERROR)
          setAlertMessage(`ID: ${props.item.id} >> Regulární výraz pro PSČ selhal! (správný tvar: XXX XX)`)
          return false
          
        } else if (formData.phone_number != "" && !regexPhoneNumberResult) {
          setAlertCode(ALERT_ERROR)
          setAlertMessage(`ID: ${props.item.id} >> Regulární výraz pro telefonní číslo selhal!`)
          return false

        } else if (formData.role != "" && [1,2,3,4].indexOf(parseInt(formData.role)) == -1) {
            setAlertCode(ALERT_ERROR)
            setAlertMessage(`ID: ${props.item.id} >> Přidání role selhalo. Můžete vybrat z rosahu 1 až 4! (1 = obyvatel, 2 = servisní pracovník, 3 = správce, 4 = administrátor)`)
            return false
          
        } else { 
          return true
        }
    }


    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }


    let deleteAccount = async() => { 
        let response = await fetch(`api/deleteAccount`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                id: props.item.id,
            })
        })

        if (response.status == 200) {
            window.location.reload();
        }
        
    }

    let updateUser = async() => {
        let valid = validation()
        if (valid) {
            let response = await fetch('api/editUser', {
                 method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({ 
                    id: props.item.id,
                    username: props.item.username,
                    user: formData.username,
                    password: formData.password,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    city:formData.city,
                    street: formData.street,
                    house_number: formData.house_number,
                    zipcode: formData.zipcode,
                    phone_number: formData.phone_number,
                    role: formData.role,
                })
            })
            if (response.status == 200) {
                window.location.reload();
            }
        }
      }

    return (
        <div>
            {alertCode == ALERT_ERROR
            &&
            <Alert 
                severity="error"
                sx={{width: 470, m: 2}}>
                {alertMessage}
            </Alert>
            }
        <table className='usera--table'>
            <tbody>
            <tr style={{height: 40, fontSize: 12}}>
                
                <th className='user--cell' style={{width: 100, height: 40}}> 
                 {formData.id}</th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="username" value={formData.username}/></th>

                <th className='user--cell' style={{width: 250}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="email" value={formData.email}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="first_name" value={formData.first_name}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="last_name" value={formData.last_name}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="city" value={formData.city}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="street" value={formData.street}/></th>

                <th className='user--cell' style={{width: 120}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="house_number" value={formData.house_number}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="zipcode" value={formData.zipcode}/></th>

                <th className='user--cell' style={{width: 200}}>
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="phone_number" value={formData.phone_number}/></th>

                <th className='user--cell' style={{width: 50}}>
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="role" value={formData.role}/></th>

                <th className='user--cell' style={{width: 100}}>
                <Button  onClick={updateUser}>ULOŽIT</Button></th>

                {props.item.username != "admin"
                &&
                <th className='user--cell' style={{width: 100}}>
                <Button sx={{color: "red"}} onClick={deleteAccount}>SMAZAT</Button></th>
                }
                {props.item.username == "admin"
                &&
                <th className='user--cell' style={{width: 100}}>
                <Button sx={{color: "grey"}}>SMAZAT</Button></th>
                }

            </tr>
            </tbody>
        </table>
        </div>
    )  
  }
  
export default UserAdmin