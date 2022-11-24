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
            creation_date_time={item.creation_date_time}
        />
    )
})

  return (
    <div>
        <h3 style={{margin: "0px 0px 16px 16px"}}>Seznam všech nahlášených závad</h3>
        <table className='ticket--table '>
        <tbody>
          <tr style={{height: 40}}>
            <td style={{width: 50}}></td> 
            <td style={{width: 100}}>Čislo Tiketu</td>
            <td style={{width: 250}}>Datum Odeslání Tiketu</td>
            <td style={{width: 300}}>Název</td>
            <td style={{width: 120}}>Stav</td>
            <td style={{width: 120}}>Komentáře</td>
            <td style={{width: 100}}></td>
            {user.role == 3 
            &&
            <td style={{width: 100}}>  </td>}
          </tr>
        </tbody>
      </table>
        <div>
            {items}
        </div>
    </div>
  )

}

export default ListOfTasksPage 