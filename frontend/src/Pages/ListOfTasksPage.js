import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';
import Ticket from '../components/Ticket';

const ListOfTasksPage = () => {

  let {authTokens, logoutUser, user} = useContext(AuthContext)
  let [listOfTickets, setListOfTickets] = useState([])
  let [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getAllTickets()
  },[])

  let getAllTickets = async() => {
    let response = await fetch(`api/getTickets`, {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    
    let data = await response.json()

    if(response.status == 200) {
        setListOfTickets(data)
        setIsLoaded(true)

    }
  }

  const items = listOfTickets.map((item) => {
    return (
        <Ticket
            key={item.id}
            id={item.id}
            description={item.description}
            state={item.state}
            name={item.name}
            creation_date_time={item.creation_date_time}
        />
    )
})

  return (
    <div>
    {isLoaded 
    &&
    <div>
        <h3 style={{margin: "0px 0px 16px 16px"}}>Seznam všech nahlášených závad</h3>
        <table className='ticket--table '>
        <tbody>
          <tr style={{height: 40}}>
            <td style={{width: 50}}></td> 
            <td style={{width: 100}}>Čislo Tiketu</td>
            <td style={{width: 250}}>Datum Odeslání Tiketu</td>
            <td style={{width: 300}}>Název</td>
            <td style={{width: 120}}>Stav</td>
            <td style={{width: 120}}>Komentáře</td>
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