import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const SignupPage = () =>  {
  let [signedUp, setSignedUp] = React.useState(false)
  let {authTokens} = useContext(AuthContext)
  const [formData, setFormData] = React.useState(
    {
      username: "",
      password2: "",
      password2check: "",
      email2: "",
    }
  )

  function handleChange(event) {
    const {name, value, type} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function validateForms() {



    if (formData.password2 !== formData.password2check) {
      alert("The password is not the same!")
      return false;
    } else if (formData.username == "" || formData.password2  == "" || formData.password2check == "" || formData.email2=="" ) {
      alert("Error")
      return false;
    } else {
      return true;
    }
  }

  let getUserInfo = () =>{

    let valid
    valid = validateForms();

    if (true) {
      let response = fetch('/api/regU/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({ user: formData.username, password: formData.password2, email: formData.email2})
      })
    }

    setSignedUp(state => !state)

    
  }

  return (
    <div className='form-signup'>
      <form>
          <input 
            type="text" 
            name="username" 
            onChange={handleChange}
            placeholder='Enter Username'
            value={formData.username}
          />
          <br/>
          <input 
            type="password" 
            name="password2" 
            onChange={handleChange}
            placeholder='Enter Password'
            value={formData.password2}
          />
          <br/>
          <input 
            type="password" 
            name="password2check" 
            onChange={handleChange}
            placeholder='Confirm Your Password'
            value={formData.password2check}
          />
          <br/>
          <input 
            type="email" 
            name="email2"
            onChange={handleChange} 
            placeholder="Enter Email"
            value={formData.email2}
          />
          <br/>
          <button className='signup-submit' onClick={getUserInfo}>
            Submit
          </button>
      </form>
      
      <div className='signup-login'>
      <p>Already have an account? Login in here.</p>
      <Link to="/login">Login in</Link>
      {signedUp && <p>You were sucessfully signed up!</p>}
      </div> 
    </div>
  )
  

}

export default SignupPage