import React, { Component, useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from '@mui/material';
import { useQuery } from 'react-query'
import AuthContext from '../context/AuthContext';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import Ticket from '../components/Ticket';
import { Select }from '@mui/material';
import { MenuItem }from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddIcon from '@mui/icons-material/Add';
import { Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Comment from '../components/Comment';

const TicketInfoPage = () => {

    const navigate = useNavigate();
    const navigate2 = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const id = query.get('id');

    let {authTokens, logoutUser, user} = useContext(AuthContext)  
    let [ticket, setTicket] = useState([])
    let [ticketState, setTicketState] = useState("")
    let [ticketComment, setTicketComments] = useState([])

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

    function handleChange(event) {
      const {value} = event.target
      updateTicketState(value)
      console.log(value)
    }


    let getTicketComments = async() => {
      console.log("g")
      
        let response = await fetch(`api/getTicketComments?id=${id}`, {
          method: 'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
      })

      let data = await response.json()
      console.log(data)
      if (response.status == 200) {
          setTicketComments(data)
          
          console.log(data)
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
        console.log(data)
        if(response.status == 200) {
            setTicket(data)
            
            setTicketState(data.state)
            console.log(ticketState)
            getTicketComments()
        }
    }

    let updateTicketState = async(value) => {
      let response = await fetch(`api/editTicket`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({
            author_id: user.user_id,
            id: ticket.id,
            state: value
          })
      })
      
      let data = await response.json()
      console.log(data)
      if(response.status == 200) {
          setTicket(data)
          
          setTicketState(data.state)
          console.log(ticketState)
          getTicketComments()
      }
  }


    const comments = ticketComment.map(item => {
      return (
          <Comment
              key={item.id}
              item={item}
          />
      )
  })

    return (
      <div>
        <div className='ticketinfopage--header' >Nahlášená závada</div>
        <div className='ticketinfopage--name'>{ticket.name} </div>   
        <div className='ticketinfopage--wrapper'>
            

            <div className='ticketinfopage--icons-text'>
            <AccessAlarmIcon className='ticketinfopage--icons'/>
            <span>Stav</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            {user.role == 1
            &&
            <span style={getColor()}>{ticket.state}</span>
            }
            {user.role == 3
            &&
            <Select
              labelId="state"
              id="state"
              value={ticketState}
              label="state"
              onChange={handleChange}
            >
              <MenuItem value={'1'}>Podáno</MenuItem>
              <MenuItem value={'2'}>V řešení</MenuItem>
              <MenuItem value={'3'}>Dokončeno</MenuItem>
            </Select>
            }
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
            <div className='ticketinfopage--icons-text'>
            <MessageIcon className='ticketinfopage--icons'/>
            <span>Komentáře</span>
            {user.role === 3
            &&
            <AddIcon className='ticketinfopage--icons-2' onClick={() => navigate2(`/createcomment?ticket_id=${id}`)}/>
            }
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            {comments}   
            <br/>

        </div>
        
      </div>
    )
  }
export default TicketInfoPage