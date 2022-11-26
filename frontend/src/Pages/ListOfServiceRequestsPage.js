import React, { useState, useEffect, useContext } from 'react'
import { Alert, AlertTitle }from '@mui/material';
import ServiceRequest from '../components/ServiceRequest';
import Spinner from '../components/Spinner';
import AuthContext from '../context/AuthContext'

const ListOfServiceRequestsPage = () => {
    let {authTokens, user} = useContext(AuthContext)  
    let [listOfTickets, setListOfTickets] = useState([])
    let [isLoaded, setIsLoaded] = useState(false)

    useEffect( () => {
        getServiceRequests()

    }, [])
    
    let getServiceRequests = async() => {
        let response = await fetch(`api/getRequests`, {
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

    const items = listOfTickets.map(item => {
        return (
            <ServiceRequest
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
            <Alert sx={{ml: 2, mb: 2}} severity="info">
            <AlertTitle>Tip</AlertTitle>
            Zjisti podrobnější informace o tiketu kliknutím na jeho ID v tabulce.
            </Alert>
            <h3 style={{margin: "0px 0px 16px 16px"}}>Seznam servisních požadavků</h3>
            <table className='ticket--table '>
            <tbody>
            <tr style={{height: 40}}>
                <td style={{width: 50}}></td> 
                <td style={{width: 50}}>Čislo</td>
                <td style={{width: 230}}>Datum vytvoření</td>
                <td style={{width: 150}}>{"Očekávný čas (h)"}</td>
                <td style={{width: 150}}>{"Reálný čas (h)"}</td>
                <td style={{width: 100}}>Tiket</td>
                <td style={{width: 120}}>Stav</td>
                <td style={{width: 120}}>Komentáře</td>
                <td style={{width: 100}}></td>
                {user.role == 3 || user.role == 4
                &&
                <td style={{width: 100}}>  </td>}
            </tr>
            </tbody>
        </table>
                {items}

        </div>
        } 
        {!isLoaded 
        && 
        <Spinner/>
        }
        </div>
    )
}

export default ListOfServiceRequestsPage 