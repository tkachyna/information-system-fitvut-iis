import React, { Component, useContext } from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'


const Comment = (props) => {

    let {authTokens, logoutUser, user} = useContext(AuthContext)


    return (
      <div >
        Comment
      </div>
    )
  }
export default Comment