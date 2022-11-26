import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Select, Alert }from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, MenuItem, TextField }from '@mui/material';
import Spinner from '../components/Spinner';


const UserAdmin = (props) => {

    let [alertMessage, setAlertMessage] = useState("")
    let [alertCode, setAlertCode] = useState()
    let [open, setOpen] = useState(false)
    let {authTokens, logoutUser, user} = useContext(AuthContext)
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

        if (true) {
          let response = await fetch('api/editUser', {
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(authTokens.access)
              },
              body: JSON.stringify({ 
                id: user.user_id,
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
            Alert("Heslo úspěšně změněno!")
          } 
        }
      }
      


    return (
    
        <table className='usera--table'>
            <tbody>
            <tr style={{height: 40, fontSize: 12}}>
                
                <th className='user--cell' style={{width: 100, height: 40}}> 
                 {formData.id}</th>

                <th className='user--cell' style={{width: 150}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="username" value={formData.username}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="email" value={formData.email}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="first_name" value={formData.first_name}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="last_name" value={formData.last_name}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="city" value={formData.city}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="street" value={formData.street}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="house_number" value={formData.house_number}/></th>

                <th className='user--cell' style={{width: 200}} >
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="zipcode" value={formData.zipcode}/></th>

                <th className='user--cell' style={{width: 250}}>
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="phone_number" value={formData.phone_number}/></th>

                <th className='user--cell' style={{width: 100}}>
                <TextField  inputProps={{style: {fontSize: 12}}} size="small" onChange={handleChange}  name="role" value={formData.role}/></th>

                
                <th className='user--cell' style={{width: 100}}>
                <Button  onClick={updateUser}  >ULOŽIT</Button></th>
                <th className='user--cell' style={{width: 100}}>
                <Button onClick={deleteAccount}>SMAZAT</Button></th>
            </tr>
            </tbody>
        </table>
    )
  
    
  }
  
export default UserAdmin