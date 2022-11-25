import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AuthContext from '../context/AuthContext'
import TopicIcon from '@mui/icons-material/Topic';


const Ticket = (props) => {

    let navigate = useNavigate()
    let [numOfComments, setNumOfComments] = useState()
    let {authTokens, user} = useContext(AuthContext)

    useEffect(() => {
      getTicketComments()
    }, [])

    let getColor = () => {
      switch(props.state) {
          case "1":
            return {color: "#e60000"} 
          case "2":
            return {color: "#ff9900"} 
          case "3":
            return {color: "#02630c"} 
          case "4":
            return {color: "#630202"} 
          default:
            return {color: "#e60000"} 
      }
    } 

    let getState = () => {
      switch(props.state) {
        case "1":
          return "Podáno" 
        case "2":
          return "V řešení" 
        case "3":
          return "Dokončeno"
        case "4":
          return "Zamítnuto"
        default:
          return "Error"
    }
  } 

    
    let deleteTicket = async() => {

      let response = await fetch(`api/deleteTicket?id=${props.id}`, {
          method: 'DELETE',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }  
      })

      if (response.status == 200) {
          window.location.reload()
      } 
    }


    let getTicketComments = async() => {
      
        let response = await fetch(`api/getTicketComments?id=${props.id}`, {
          method: 'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
      })

      let data = await response.json()

      if (response.status == 200) {
          setNumOfComments(data.length)
      }
    }

    function formatDate(string){
      var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
      return new Date(string).toLocaleDateString([],options);
    }

    return (
      <table className='user--table '>
        <tbody>
          <tr>
            <td style={{width: 50}}><TopicIcon/></td> 
            <td style={{width: 100}}>Tiket {props.id} </td>
            <td style={{width: 250}}> {formatDate(String(props.creation_date_time))}</td>
            <td style={{width: 300}}> {props.name} </td>
            <td style={{width: 120}}><div style={getColor()}>{getState()}</div></td>
            <td style={{width: 120}}>{numOfComments}</td>
            <td style={{width: 100}}> <Button variant="outlined" onClick={() => navigate(`/ticket?id=${props.id}`)}>DETAILY</Button> </td>
            {user.role == 3 
            &&
            <td style={{width: 100}}> <Button variant="outlined" onClick={deleteTicket}>SMAZAT</Button> </td>}
          </tr>
        </tbody>
      </table>
        
    )
  }

export default Ticket