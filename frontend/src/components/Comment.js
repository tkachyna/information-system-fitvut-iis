import React, { Component, useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'


const Comment = (props) => {

    let {authTokens} = useContext(AuthContext)
    
    

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
        return new Date(string).toLocaleDateString([],options);
    }

    return (
      <table className='comment--table'>
        <tbody>
            <tr>
            <th className='comment--cell' style={{fontSize: 13}}>{formatDate(props.item.creation_date_time)}</th>
            </tr>
          <tr>
            
            <th className='comment--cell'>{"[ "}<b>{name}</b>{" ] >>  "}{ props.item.text}</th>
          </tr>
        </tbody>
      </table>
    )
  }
export default Comment