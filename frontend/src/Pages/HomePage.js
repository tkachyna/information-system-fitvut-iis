import PropTypes from 'prop-types'
import React, { Component, useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import { Alert, AlertTitle } from '@mui/material';
import { Link } from 'react-router-dom'

const HomePage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)
  let [fact, setFact] = useState([])
  useEffect(() => {
    getRandomFact()
  }, [])

  let style = {
    width: 400,
    height: 40,
    borderRadius: 28,
    mb: 2,
    ml: 2
  } 

  let getRandomFact = async() => {
    let response = await fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
      method: 'GET',
      headers:{
        'X-Api-Key': 'AfGMIXUd08fbw5zFNJWBLQ==56UawhmX5vYaA0kX',
        'Content-Type':'application/json'
      }
    })

    let data = await response.json()
    setFact(data[0].fact)
  }


  return (
    <div>
    <Alert 
          severity="info"
          sx={{width: 1000}}>
            <AlertTitle>{"Náhodný vzdělávací fakt :)"}</AlertTitle>
          {fact}
      </Alert>
    <h2 className='signup--text-2'>Vítejte na domovské stránce!</h2>
    
    {user.role == 1
    &&
    <div>
    <Button  href='/addticket' type="submit" variant="outlined" sx = {style} >Nahlásit závadu</Button> 
    <br/>
    <Button  href='/tickets' type="submit" variant="outlined" sx = {style} >Zobrazit nahlášené závady</Button> 
    <br/>
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    </div>
    }
    {user.role == 2
    &&
    <div>
    <Button  href='/servicerequests' type="submit" variant="outlined" sx = {style} >Servisní požadavky</Button> 
    <br/>
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    </div>
    }
    {user.role == 4
    && 
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    }
    {user.role == 3
    &&
    <div>
    <Button  href='/addtechnician' type="submit" variant="outlined" sx = {style} >Přidat technického pracovníka</Button> 
    <br/>
    <Button  href='/servicerequests' type="submit" variant="outlined" sx = {style} >Spravovat nahlášené závady</Button>
    <br/>
    <Button  href='/servicerequests' type="submit" variant="outlined" sx = {style} >Vytvoření servisního požadavku  </Button> 
    <br/>
    <Button  href='/editaccount' type="submit" variant="outlined" sx = {style} >Upravit účet</Button> 
    </div>
    }
    <img style={{width: 500, borderRadius: 25}} src="https://1884403144.rsc.cdn77.org/foto/cernobile-hvezdy-kazde-zoo/Zml0LWluLzk5OXg5OTkvZmlsdGVyczpxdWFsaXR5KDg1KTpub191cHNjYWxlKCkvaW1n/4868416.jpg?v=0&st=cUz5BygWyqeXLmURARtP8kpRec-oggNila2-nNa_ocM&ts=1600812000&e=0"/>
    </div>

  )

}

export default HomePage 