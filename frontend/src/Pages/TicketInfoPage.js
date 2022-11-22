import React, { Component, useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from '@mui/material';
import { useQuery } from 'react-query'
import AuthContext from '../context/AuthContext';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import Ticket from '../components/Ticket';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import { Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

const TicketInfoPage = () => {

    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const id = query.get('id');

    let {authTokens, logoutUser, user} = useContext(AuthContext)  
    let [ticket, setTicket] = useState([])

    useEffect( () => {
       getTickets();
    }, [])

    let getColor = () => {
      switch(ticket.state) {
          case "Podáno":
            return {color: "#e60000"} 
          case "V řešení":
            return {color: "#ff9900"} 
          case "Dokončeno":
            return {color: "#006600"} 
          default:
            return {color: "#e60000"} 
      }
    } 

    
    let getTickets = async() => {
        let response = await fetch(`api/getTicket?id=${id}`, {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()
        if(response.status == 200) {
            setTicket(data)
        }
    }

    return (
      <div>
        <div style={{display: "flex"}}>
        <Button 
          onClick={() => navigate(-1)}
          variant="contained" 
          sx={{ml: 2}}>
          Zpět
        </Button>
        <br/>
        <div className='ticketinfopage--header' >Nahlášená závada</div>
        </div>

    
        <div className='ticketinfopage--wrapper'>
            
            <br/>
            <div className='ticketinfopage--name'>{ticket.name} </div>    
            <br/> 

            <div className='ticketinfopage--icons-text'>
            <AccessAlarmIcon className='ticketinfopage--icons'/>
            <span>Stav</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <span style={getColor()}>{ticket.state}</span>
            <br/>
            <div className='ticketinfopage--icons-text'>
            <CommentIcon className='ticketinfopage--icons'/>
            <span className='light-text' >Popis</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <span className='light-text'> {ticket.description}</span>
            <br/>
            <div className='ticketinfopage--icons-text'>
            <AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
            <span>Nahlášeno dne</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            21.11.2022
            <br/>

        </div>
        
      </div>
    )
  }
export default TicketInfoPage