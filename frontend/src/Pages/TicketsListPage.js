import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import Fault from '../components/Ticket'
import Ticket from '../components/Ticket';

const TicketsListPage = () => {
    let {authTokens, logoutUser, user} = useContext(AuthContext)  
    let [listOfTickets, setListOfTickets] = useState([])

    useEffect( () => {
        getTickets();
    }, [])
    
    let getTickets = async() => {
        let response = await fetch(`api/getMyTickets?id=${user.user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()

        if(response.status == 200) {
            setListOfTickets(data)
        }
    }


    const items = listOfTickets.map(item => {
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
        <h3 style={{margin: "0px 0px 16px 16px"}}>Seznam nahlášených závad</h3>
        <div>
            {items}
        </div>
    </div>
  )

}

export default TicketsListPage  