import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import AuthContext from '../context/AuthContext'


const ServiceRequest = (props) => {

    let navigate = useNavigate()
    let [numOfComments, setNumOfComments] = useState()
    let {authTokens, logoutUser, user} = useContext(AuthContext)

    useEffect(() => {
        getRequestComments()
    }, [])

    let getColor = () => {
        switch(props.item.state) {
            case '1':
              return {color: "#e60000"} 
            case '2':
              return {color: "#ff9900"} 
            case '3':
              return {color: "#33cc33"} 
            default:
              return {color: "#e60000"} 
        }
    } 

    let getState = () => {
      switch(props.item.state) {
        case '1':
          return 'Podáno'
        case '2':
          return 'V řešení'
        case '3':
          return 'Dokončeno'
        default:
          return 'Error'
    }
    }

    let deleteRequest = async() => {

      let response = await fetch(`api/deleteRequest?id=${props.item.id}`, {
          method: 'DELETE',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }  
      })

      if (response.status == 200) {
          window.location.reload()

          if (props.item.state == '1' || props.item.state == '2') {
              updateTicketState()
          }
          
      } 
    }

    let updateTicketState = async() => {
      let response = await fetch(`api/editTicket`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({
            author_id: user.user_id,
            id: props.item.ticket_id,
            state: '1'
          })
      })
    }

    let getRequestComments = async() => {
      
        let response = await fetch(`api/getRequestComments?id=${props.item.id}`, {
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
            <td style={{width: 50}}><ConstructionIcon/></td> 
            <td style={{width: 50}}>{props.item.id} </td>
            <td style={{width: 230}}>{formatDate(String(props.item.creation_date_time))}</td>
            <td style={{width: 150}}>{props.item.estimated_time}</td>
            <td style={{width: 150}}>{props.item.real_time}</td>
            <td onClick={() => navigate(`/ticket?id=${props.item.ticket_id}`)} style={{width: 100}}><u>{props.item.ticket_id}</u> </td>
            <td style={{width: 120}}><div style={getColor()}>{getState()}</div></td>
            <td style={{width: 120}}>{numOfComments}</td>
            <td style={{width: 100}}> <Button variant="outlined" onClick={() => navigate(`/servicerequest?id=${props.item.id}`)}>DETAILY</Button> </td>
            {user.role == 3 
            &&
            <td style={{width: 100}}> <Button variant="outlined" onClick={deleteRequest}>SMAZAT</Button> </td>}
          </tr>
        </tbody>
      </table>
        
    )
  }

export default ServiceRequest