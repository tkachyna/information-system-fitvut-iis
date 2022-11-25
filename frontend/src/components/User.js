import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'
import { Select }from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MenuItem, FormControl, InputLabel, Alert }from '@mui/material';


const User = (props) => {

    let {authTokens, logoutUser, user} = useContext(AuthContext)
    let [role, setRole] = React.useState(props.user.role)

    let handleChange = async(event) => {
        const {value} = event.target

        console.log(value)
        let response = await fetch(`api/editUserRole`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                role: value,
                id: props.user.id
            })    
        })

        if (response.status == 200) {
            setRole(value)
        } 
    }


    return (
        <table className='user--table'>
            <tbody>
            <tr>
                <th className='user--cell' style={{width: 50}}><AccountCircleIcon/></th>
                <th className='user--cell' style={{width: 50}} >{props.user.id}</th>
                <th className='user--cell' >{props.user.username}</th>
                <th className='user--cell'>
                <Select
                    sx={{width: 200}}
                    labelId="state"
                    id="state"
                    className='user--select'
                    label="state"
                    value={role}
                    onChange={handleChange}
                    >
                    <MenuItem value={1}>Obyvatel</MenuItem>
                    <MenuItem value={2}>Servisní technik</MenuItem>
                    </Select>
                </th>
            </tr>
            </tbody>
        </table>

    )
  }
export default User