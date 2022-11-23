import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import { List } from '@mui/material';
import Ticket from '../components/Ticket';

const ListOfTasksPage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)
  let [listOfTickets, setListOfTickets] = useState([])

  useEffect(() => {
    getAllTickets()
  },[])

  let getAllTickets = async() => {
    let response = await fetch(`api/getTickets`, {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    
    let data = await response.json()
    console.log(data)
    if(response.status == 200) {
        setListOfTickets(data)
    }
  }

  const items = listOfTickets.map((item) => {
    return (
        <Ticket
            key={item.id}
            id={item.id}
            description={item.description}
            state={item.state}
            name={item.name}
        />
    )
})

  return (
    <div>
        <h3 style={{margin: "0px 0px 16px 16px"}}>Seznam všech nahlášených závad</h3>
        <div>
            {items}
        </div>
    </div>
  )

}

export default ListOfTasksPage 