import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom"

const Ticket = (props) => {

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


    return (
      <div className='ticket--wrapper'>
        <div className='ticket--text'>
          Tiket {props.id} {props.name}
          <br/>
          <div style={{display: "flex"}}> 
          <span style={{color: "black"}}>Stav řešení:&nbsp;</span><div style={getColor()}>{props.state}</div>
          </div>
        </div>

        <div className='ticket--button'>
        <Link to={`/ticket?id=${props.id}`}>Prohlédnout detaily</Link>
        </div>


      </div>
    )
  }
export default Ticket