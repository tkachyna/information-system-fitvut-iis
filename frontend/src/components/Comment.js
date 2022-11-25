import React, { Component, useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'


const Comment = (props) => {

    let {authTokens, logoutUser, user} = useContext(AuthContext)
    let [name, setName] = useState("")
    
    useEffect(() => {
      getListOfUsers()
    },[])

    let getListOfUsers = async() => {
      let response = await fetch("api/getUsers", {
          method: 'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
      })

      let data = await response.json()

      if (response.status == 200) {
          for (let i = 0; i < data.length; i++) {

            if(data[i].id == props.item.author_id)   {
                setName(data[i].username)
            }
            
          } 
          console.log(data)
      }
  }

    return (
      <table className='comment--table'>
        <tbody>
          <tr>
            <th className='comment--cell'>{"[ "}<b>{name}</b>{" ] >>  "}{ props.item.text}</th>
          </tr>
        </tbody>
      </table>
    )
  }
export default Comment