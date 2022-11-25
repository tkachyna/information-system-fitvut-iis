import React, { Component, useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Select }from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MenuItem, FormControl, InputLabel, Alert }from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const AddTicket = () => {

    let {authTokens, logoutUser, user} = useContext(AuthContext) 

    let [alertMessage, setAlertMessage] = useState("")
    let [alertCode, setAlertCode] = useState()
    let [sentStatus, setSentStatus] = React.useState(0)
    let [selectedDate, setSelectedDate] = React.useState(new Date())

    let [tickets, setTickets] = React.useState([])
    let [techs, setTechnicians] = React.useState([])

    let navigate = useNavigate()

    useEffect(() => {
        getTickets()
        getTechs()
    }, [])

    const [formData, setFormData] = React.useState({ 
          description: "",
          ticket: "",
          technicians: ""
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
    let validateForm = () => {

        const arrayOfTechs = formData.technicians.split(",").map(Number);
        if (formData.description == ""
        || formData.technicians == ""
        || formData.ticket == "") 
        {
            setAlertMessage("Vyplň všechny požadované informace * !")
            setAlertCode(2)
            return false
        } else if (!tickets.includes(parseInt(formData.ticket))) {
            setAlertMessage(`Tiket s tímto ID (${formData.ticket}) neexistuje!`)
            setAlertCode(3)
          return false
        } else {
            for (let i = 0; i < arrayOfTechs.length; i++) {
                console.log(arrayOfTechs[i])
                console.log(formData.technicians)
                if (!techs.includes(arrayOfTechs[i])) {
                    setAlertMessage(`Servisní technik s tímto ID (${arrayOfTechs[i]}) neexistuje!`)
                    setAlertCode(3)
                    return false
                }
            }

            return true
        }
    }   

    let getTickets = async() => {

        let response = await fetch("api/getTickets", {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()

        if (response.status == 200) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].state == "1") {
                setTickets(oldData => [...oldData, data[i].id])
                }
            }     

        } else {
            setAlertCode(1)
            setAlertMessage(`Oops. Nastala chyba na serveru! (${response.status})`)
        }
      }  
    

    let getTechs = async() => {
        
        let response = await fetch("api/getUsers", {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()

        if(response.status == 200) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].role == 2) {
                    setTechnicians(oldData => [...oldData, data[i].id])
                }
            }
            
        } else {
            setAlertCode(1)
            setAlertMessage(`Oops. Nastala chyba na serveru! (${response.status})`)
        }
      }  
    

    let postTicket = async() => {
      
      let validation = await validateForm()
      if (validation) {

        let response = await fetch(`api/createRequest`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({
            id: user.user_id,
            description: formData.description,
            ticket_id: formData.ticket,
            technicians: formData.technicians
          })
      })
      
      let data = await response.json()
      console.log(data)
      if(response.status == 200) {
          setAlertCode(200)
             setAlertMessage("Servisní požadavek byl úspěšně zpracován!")
      } else {
          setAlertCode(1)
            setAlertMessage(`Oops. Nastala chyba na serveru: ${response.status} ${data}!`)
      }
    }
      
  }
  


    return (    
        
        <table className='sr--table '>
            <tbody>
                <tr><td>
                    {alertCode == 200 
                    &&
                    <Alert
                        severity="success"
                        sx={{width: 470}}>
                        {alertMessage}
                    </Alert>
                    }
                    {alertCode == 3
                    &&
                    <Alert 
                        severity="error"
                        sx={{width: 470}}>
                        {alertMessage}
                    </Alert>
                    }
                    {alertCode == 2
                    &&
                    <Alert 
                        severity="warning"
                        sx={{width: 470}}>
                        {alertMessage}
                    </Alert>
                    }
                    {alertCode == 1
                    &&
                    <Alert 
                        severity="error"
                        sx={{width: 470}}>
                        {alertMessage}
                    </Alert>
                    }
                </td></tr>
            <tr><td style={{fontSize: 25, height: 80, ml: 2}}>
                Vytvoření servisního požadavku
            </td></tr>
            <tr><td className='user--cell'>
                <TextField
                    required
                    style={{textAlign: 'left'}}
                    multiline
                    placeholder='*'
                    rows={4}
                    sx={{ width: 500}}
                    onChange={handleChange}
                    name="description"
                    value={formData.text}
                />
            </td></tr>
            <tr><td className='user--cell' style={{height: 50}}>Zadejte identifikační číslo tiketu</td></tr>
            <tr><td className='user--cell' style={{height: 50}}><Alert
                        severity="info"
                        sx={{width: 470}}>
                       {`Zadejte jedno ID (možné ${tickets})`}
                       </Alert></td>
                    <td ><RemoveRedEyeIcon sx={{ml: 2}} onClick={() => navigate('/servicerequests')}/></td></tr>
            <tr><td className='sr--cell' style={{height: 100}}>
                <TextField 
                    required
                    sx={{width: 200}}
                    id="addrequest-textfield-2" 
                    label="Tiket" 
                    variant="outlined"
                    onChange={handleChange}
                    name="ticket"
                    value={formData.ticket}
                    />
            </td></tr>
            <tr><td className='user--cell' style={{height: 50}}>Zadejte identifikační číslo technického pracovníka</td></tr>
            <tr><td  style={{height: 50}}><Alert
                        severity="info"
                        >
                        {`Zadejte >= 1 ID oddělené "," (možné ${techs})`}
                    </Alert></td>
                    <td><RemoveRedEyeIcon sx={{ml: 2}} onClick={() => navigate('/addtechnician')} /></td></tr>
            <tr><td className='sr--cell' style={{height: 100}}>
                <TextField 
                    required
                    sx={{width: 200}}
                    id="addrequest-textfield-3" 
                    label="Technický pracovník" 
                    variant="outlined"
                    onChange={handleChange}
                    name="technicians"
                    value={formData.technicians}
                    />
            </td></tr>
            <tr><td>
                <Button
                    required    
                    variant="contained"
                    onClick={postTicket}
                    sx={{width: 200, height: 50}}
                    >
                    Odeslat
                </Button>    
            </td></tr>
        </tbody>
      </table>
    )
}


export default AddTicket