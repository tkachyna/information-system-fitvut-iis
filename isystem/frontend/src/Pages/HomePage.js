import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const HomePage = () => {
  let [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(()=> {
      getNotes()
  }, [])


  let getNotes = async() =>{
      let response = await fetch('https://smart-city-test.herokuapp.com/api/tickets/', {
          method:'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
      })
      let data = await response.json()

      if(response.status === 200){
          setNotes(data)
      }else if(response.statusText === 'Unauthorized'){
          logoutUser()
      }
      
  }

  return (
    <div>
    <div>You are logged to the home page!</div>
    <Link to='/reportfailure'>Report Failure</Link>
    <Link to='/viewreports'>View Reports</Link>
    <Link to='/overview'>Overview</Link>
    <ul>
      {notes.map(ticket => (
          <li key={ticket.id}>{ticket.body}</li>
      ))}
    </ul>
    </div>
  )

}

export default HomePage