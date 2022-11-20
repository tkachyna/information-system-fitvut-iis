import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'

const FailuresPage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)


  return (
    <div>
    Henlo
    </div>
  )

}

export default FailuresPage 