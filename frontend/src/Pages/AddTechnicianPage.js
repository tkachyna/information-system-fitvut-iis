import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import { List, Alert } from '@mui/material';
import User from '../components/User'

const AddTechnicianPage = () => {

    let {authTokens, logoutUser, user} = useContext(AuthContext)
    let [users, setUsers] = useState([])
 
    useEffect(() => {
        getListOfUsers()
      }, [])

    let getListOfUsers = async() => {
        let response = await fetch("api/getUsers", {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })

        let data = await response.json()
        console.log(data)
        if (response.status == 200) {
            for (let i = 0; i < data.length; i++) {

              if(data[i].role == 1  || data[i].role == 2)   {
                  setUsers(oldArray => [...oldArray, data[i]])
              }
              
            } 
            console.log(data)
        }
    }

    let user_ = users.map(item => {
      return (
          <User
              key={item.id}
              user={item}
          />
      )
  })


  return (
    <div>
      <Alert 
            severity="info"
            sx={{width: 470}}>
            Můžeš měnit roli jen uživatelům s rolí nižší, než máš ty.
        </Alert>
      <h2 style={{marginLeft: 16}}>Seznam uživatelů</h2>
      {user_}
    </div>
  )

}

export default AddTechnicianPage