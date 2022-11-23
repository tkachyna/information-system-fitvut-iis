import React, { Component, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { Button } from '@mui/material';
import AuthContext from '../context/AuthContext'
import TopicIcon from '@mui/icons-material/Topic';


const Ticket = (props) => {

    let navigate = useNavigate()
    let {authTokens, logoutUser, user} = useContext(AuthContext)
    let getColor = () => {
        switch(props.state) {
            case "Podáno":
              return {color: "#e60000"} 
            case "V řešení":
              return {color: "#ff9900"} 
            case "Dokončeno":
              return {color: "#33cc33"} 
            default:
              return {color: "#e60000"} 
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
            <td style={{width: 120}}><div style={getColor()}>{props.state}</div></td>
            <td style={{width: 100}}> <Button variant="outlined" onClick={() => navigate(`/ticket?id=${props.id}`)}>DETAILY</Button> </td>
            {user.role == 3 
            &&
            <td style={{width: 100}}> <Button variant="outlined" onClick={() => navigate(`/ticket?id=${props.id}`)}>SMAZAT</Button> </td>}
          </tr>
        </tbody>
      </table>
        
    )
  }

export default Ticket