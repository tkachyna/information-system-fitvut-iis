import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import { List } from '@mui/material';

const AddTechnicianPage = () => {

    let {authTokens, logoutUser, user} = useContext(AuthContext)


    useEffect(() => {
        getListOfUsers()
      }, [])

    let getListOfUsers = async() => {
        let response = await fetch("api/getlistofusers", {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })


}



  return (
    <div>
    Henlo tech
    </div>
  )

}

export default AddTechnicianPage