import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';
import Ticket from '../components/Ticket';
import UserAdmin from '../components/UserAdmin'

const ListOfTasksPage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)
  let [listOfTickets, setListOfTickets] = useState([])
  let [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getUsers()
  },[])

  let getUsers = async() => {
    let response = await fetch(`api/getUsers`, {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }

    })
    
    let data = await response.json()
    console.log(data)
    if(response.status == 200) {
        setIsLoaded(true)
        setListOfTickets(data)


    }
  }

  const items = listOfTickets.map((item) => {
    return (
        <UserAdmin
            key={item.id}
            item={item}
        />
    )
})

  return (
    <div>
    {isLoaded
    &&
    <div>
        <h3 style={{margin: "0px 0px 16px 16px"}}>Seznam všech nahlášených závad</h3>
        <table style={{marginLeft: 30}}>
        <tbody>
          <tr style={{height: 40, fontSize: 12}}>
            <td style={{width: 100}}>ID</td> 
            <td style={{width: 150}}>Uživatel</td>
            <td style={{width: 200}}>Email</td>
            <td style={{width: 200}}>Jméno</td>
            <td style={{width: 200}}>Příjmení</td>
            <td style={{width: 200}}>Město</td>
            <td style={{width: 200}}>Ulice</td>
            <td style={{width: 299}}>Popisné číslo</td>
            <td style={{width: 200}}>PSČ</td>
            <td style={{width: 250}}>Telefonní číslo</td>
            <td style={{width: 100}}>Role</td>
            <td style={{width: 100}}></td>
            <td style={{width: 100}}></td>
            {user.role == 3 
            &&
            <td style={{width: 100}}>  </td>}
          </tr>
        </tbody>
      </table>
        <div>
            {items}
        </div>
    </div>
    }
    {!isLoaded 
      &&
      <Spinner/>
      }
      </div>
      )
}

export default ListOfTasksPage 