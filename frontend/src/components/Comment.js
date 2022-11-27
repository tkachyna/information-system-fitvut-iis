import React, {  useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'


const Comment = (props) => {

    let {authTokens} = useContext(AuthContext)
    let [name, setName] = useState()

    useEffect(() => {
      getListOfUsers()
    }, [])

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
          for (let i = 0; i< data.length; i++) {
    
              if(data[i].id == props.item.author_id ) {
                  setName(data[i].username)
              }
              
          } 

      }
      
      
  } 

    

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