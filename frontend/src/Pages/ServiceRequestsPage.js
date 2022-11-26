import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useQuery } from 'react-query'
import AuthContext from '../context/AuthContext';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import Comment from '../components/Comment';
import { Select, MenuItem, Divider, TextField }from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddIcon from '@mui/icons-material/Add';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CommentIcon from '@mui/icons-material/Comment';
import TopicIcon from '@mui/icons-material/Topic';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Spinner from '../components/Spinner';

const ServiceRequestPage = () => {
    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    let [isLoaded, setIsLoaded] = useState(false)
    const id = query.get('id');

    let [formData, setFormData] = useState({
		esttime: 0,
		realtime: 0,
  	})
    let {authTokens, user} = useContext(AuthContext)  
    let [request, setRequest] = useState([])
    let [requestState, setRequestState] = useState("")
    let [requestComment, setRequestComments] = useState([])
    let [technicians, setTechnicians] = useState([])
    let [name, setName] = useState("")

    useEffect( () => {
        getRequest()
        getListOfUsers()
    }, [])

    function handleChange3(event) {
		const {name, value,} = event.target
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: value
			}
		})
	}

    function handleChange(event) {
		const {value} = event.target
		updateRequestState(value)
    }


    let getrequestComments = async() => {  
        let response = await fetch(`api/getRequestComments?id=${id}`, {
          method: 'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
      })

      let data = await response.json()

      if (response.status == 200) {
          setRequestComments(data)
      }
    }
    
    let getRequest = async() => {
        let response = await fetch(`api/getRequest?id=${id}`, {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()

        if (response.status == 200) {
            setRequest(data)
            setRequestState(data.state)
            getTechsUsername(data.t_id)
            getrequestComments()
            setFormData(prevFormData => {
				return {
					esttime: data.estimated_time,
					realtime: data.real_time
				}
            })
        }
    }

    let updateTicketState = async() => {
      let response = await fetch(`api/editTicket`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({
            author_id: user.user_id,
            id: request.ticket_id,
            state: '3'
          })
      })
    }

    let getTechsUsername = async(t_id) => {
        let response = await fetch(`api/getUsers/`, {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })

        let data = await response.json()

        if (response.status == 200) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                if (t_id.indexOf(data[i].id) >= 0 && data[i].role == 2) {
                    setTechnicians(oldData => [...oldData, data[i]])
                }
            }
        }
        
        
        setIsLoaded(true)
      }


    let updateRequestState = async(value) => {
      let response = await fetch(`api/editRequest`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({
            author_id: user.user_id,
            id: request.id,
            state: value
          }) 
      })
      
      let data = await response.json()

      if(response.status == 200) {
          if (value == "3") {
            updateTicketState()
          }
          setRequestState(data.state)
      }
  }

	let updateEstTime = async(value) => {
		let response = await fetch(`api/editRequest`, {
			method: 'POST',
			headers:{
				'Content-Type':'application/json',
				'Authorization':'Bearer ' + String(authTokens.access)
			},
			body: JSON.stringify({
				author_id: user.user_id,
				id: request.id,
				estimated_time: formData.esttime
			})
		})
		
	}

	let updateRealTime = async(value) => {
		let response = await fetch(`api/editRequest`, {
			method: 'POST',
			headers:{
				'Content-Type':'application/json',
				'Authorization':'Bearer ' + String(authTokens.access)
			},
			body: JSON.stringify({
				author_id: user.user_id,
				id: request.id,
				real_time: formData.realtime
			})
	})
	}

    let getListOfUsers = async() => {
        let response = await fetch("api/getUsers", {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })

      let data = await response.json()

      if (response.status == 200) {
            for (let i = 0; i< data.length; i++) {
                console.log(data[i])
                if(data[i].id == props.item.author_id && data[i].role == 2) {
                    console.log(data[i].role)
                    setName(data[i].username)
                }
                
            } 
            console.log(data)
        }
        
        
    } 

	const comments = requestComment.map(item => {
		return (
			<Comment
				key={item.id}
				item={item}
                name={name}
			/>
		)
	})

	let keyPress2 = (e) => {
		if(e.key == 'Enter'){
			updateEstTime()

		}
	}

	let keyPress1 = (e) => {
		if(e.key == 'Enter'){
			updateRealTime()
		}
	}

    const techs = technicians.map(item => {
        return (
            <table key={item.id}>
                <tbody>
                    <tr>
                        <td><AccountCircleIcon/></td>
                        <td>(ID {item.id})</td>
                        <td><b>{item.username}</b></td>
                        <td><LocalPhoneIcon/></td>
                        <td>+420 {item.phone_number}</td>
                    </tr>
                </tbody>
            </table> 
        )
    })


	function formatDate(string){
		var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
		return new Date(string).toLocaleDateString([],options);
	}

   
    return (
    <div>
    {isLoaded 
    &&

      <div>
        <h2 style={{marginLeft: 16, marginTop: 16}} >Servisní požadavek</h2>
        <div className='ticketinfopage--wrapper'>

            <div className='ticketinfopage--icons-text'> <TopicIcon className='ticketinfopage--icons'/><span style={{color: "#2074d4"}} >Tiket</span></div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/><br/>
            <span onClick={() => navigate(`/ticket?id=${request.ticket_id}`)} className='light-text'><u>{request.ticket_id}</u></span><br/>
    
            <div className='ticketinfopage--icons-text'><GroupIcon className='ticketinfopage--icons'/><span style={{color: "#2074d4"}} >Servisní pracovníci</span></div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/><br/>
            <span className='light-text'> {techs}</span>
            


            <div className='ticketinfopage--icons-text'>
            <AccessAlarmIcon className='ticketinfopage--icons'/>
            <span style={{color: "#2074d4"}}>Stav</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <Select
              size="small"
              labelId="state"
              id="state"
              value={requestState}
              label="state"
              onChange={handleChange}
            >
              <MenuItem value={'1'}>Podáno</MenuItem>
              <MenuItem value={'2'}>V řešení</MenuItem>
              <MenuItem value={'3'}>Dokončeno</MenuItem>
            </Select>
            
            <br/>
            <div className='ticketinfopage--icons-text'>
            <CommentIcon className='ticketinfopage--icons'/>
            <span style={{color: "#2074d4"}} >Popis</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <span className='light-text'> {request.description}</span>
            <br/>
            <div className='ticketinfopage--icons-text'>
            <AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
            <span style={{color: "#2074d4"}} >Nahlášeno dne</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            {formatDate(String(request.creation_date_time))}
            <br/>
            <div className='ticketinfopage--icons-text'>
            <AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
            <span style={{color: "#2074d4"}} >{"Očekávaný čas opravy  (v hodinách, enter pro uložení)"}</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <TextField required size="small"
            id="servicerequest-est" variant="outlined" onChange={handleChange3}  value={formData.esttime} onKeyDown={keyPress2} sx={{width: 100}}
            type="text" name="esttime"/> 
            <br/>

            <div className='ticketinfopage--icons-text'>
            <AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
            <span style={{color: "#2074d4"}} >{"Reálný čas opravy (v hodinách, enter pro uložení)"}</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
    
            <TextField required size="small"
            id="servicerequest-real" variant="outlined" onChange={handleChange3} value={formData.realtime} onKeyDown={keyPress1} sx={{width: 100}}
            type="text" name="realtime"/> 
            <div className='ticketinfopage--icons-text'>
            <MessageIcon className='ticketinfopage--icons'/>
            <span style={{color: "#2074d4"}} >Komentáře</span>
            <AddIcon className='ticketinfopage--icons-2' onClick={() => navigate(`/createreqcomment?request_id=${id}`)}/>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            {comments}   
            <br/>

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

export default ServiceRequestPage