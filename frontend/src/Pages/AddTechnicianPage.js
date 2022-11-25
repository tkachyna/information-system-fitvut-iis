import React, { useState, useEffect, useContext } from 'react'
import { Alert } from '@mui/material';
import User from '../components/User'
import Spinner from '../components/Spinner';
import AuthContext from '../context/AuthContext'

const AddTechnicianPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [users, setUsers] = useState([])
    let [isLoaded, setIsLoaded] = useState(false)
 
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
        console.log(data)
        if (response.status == 200) {
            for (let i = 0; i < data.length; i++) {
                if(data[i].role == 1  || data[i].role == 2)   {
                    setUsers(oldArray => [...oldArray, data[i]])
                }
            } 
            setIsLoaded(true)
        }
    }

    let users_ = users.map(item => {
        return (
            <User
                key={item.id}
                user={item}
            />
        )
    })


  return (
    <div>
    {isLoaded 
    &&
    <div>
      <h2 style={{marginLeft: 16}}>Seznam uživatelů</h2>
      <Alert severity="info" sx={{ m: 2, width: 510}}>Můžeš měnit roli jen uživatelům s rolí nižší, než máš ty.</Alert>
      <Alert severity="info" sx={{ m: 2, width: 510}}>Druhý sloupec tabulky reprezentuje ID uživatele.</Alert>
      {users_}
    </div>
    } 
    {!isLoaded 
    && 
    <Spinner/>
    }
    </div>
  )
}

export default AddTechnicianPage