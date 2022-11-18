import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const SignupPage = () =>  {

  return (
    <div>
      <form>
          <input type="text" name="username" placeholder='Enter Username'/>
          <input type="password" name="password" placeholder='Enter Password'/>
          <input type="password" name="passwordCheck" placeholder='Confirm Your Password'/>
          <input type="email" name="email" placeholder="Enter Email"/>
          <input type="submit" />
      </form>
    </div>
  )
  
}

export default SignupPage