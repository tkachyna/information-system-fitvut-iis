import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'


const Comment = (props) => {

    let {authTokens, logoutUser, user} = useContext(AuthContext)


    return (
      <table className='comment--table'>
        <tbody>
          <tr>
            <th className='comment--cell'>{">> " + props.item.text}</th>
          </tr>
        </tbody>
      </table>
    )
  }
export default Comment