import React, {  useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Select, MenuItem, Divider }from '@mui/material';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import ImageIcon from '@mui/icons-material/Image';
import MessageIcon from '@mui/icons-material/Message';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import Comment from '../components/Comment';
import Spinner from '../components/Spinner';
import AuthContext from '../context/AuthContext';

const TicketInfoPage = () => {
    let navigate = useNavigate();
    let useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let id = query.get('id');

    let [ticket, setTicket] = useState([])
    let [ticketState, setTicketState] = useState("")
    let [ticketComment, setTicketComments] = useState([])
    let [isLoaded, setIsLoaded] = useState(false)
	let {authTokens, user} = useContext(AuthContext)  

    useEffect( () => {
       getTicket();

    }, [])

    let getColor = () => {
		switch(ticket.state) {
			case "1":
				return {color: "#e60000"} 
			case "2":
				return {color: "#ff9900"} 
			case "3":
				return {color: "#02630c"} 
			case "4":
				return {color: "#630202"} 
			default:
				return {color: "#e60000"} 
		}
    } 

    let getState = () => {
		switch(ticket.state) {
			case "1":
			return "Podáno" 
			case "2":
			return "V řešení" 
			case "3":
			return "Dokončeno"
			case "4":
			return "Zamítnuto"
			default:
			return "Error"
		}
	} 

    function handleChange(event) {
		const {value} = event.target
		updateTicketState(value)
    }


    let getTicketComments = async() => {      
        let response = await fetch(`api/getTicketComments?id=${id}`, {
			method: 'GET',
			headers:{
				'Content-Type':'application/json',
				'Authorization':'Bearer ' + String(authTokens.access)
			}
      })

      let data = await response.json()

		if (response.status == 200) {
			setTicketComments(data)
			setIsLoaded(true)
		}
    }
    
    let getTicket = async() => {
        let response = await fetch(`api/getTicket?id=${id}`, {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()

        if(response.status == 200) {
            setTicket(data)
            
            setTicketState(data.state)
            getTicketComments()
        }
    }

    let updateTicketState = async(value) => {
		let response = await fetch(`api/editTicket`, {
			method: 'POST',
			headers:{
				'Content-Type':'application/json',
				'Authorization':'Bearer ' + String(authTokens.access)
			},
			body: JSON.stringify({
				author_id: user.user_id,
				id: ticket.id,
				state: value
			})
      })
      
		let data = await response.json()

		if(response.status == 200) {
			setTicketState(data.state)
		}
  	}

    const comments = ticketComment.map(item => {
		return (
			<Comment
				key={item.id}
				item={item}
			/>
		)
  	})

	function formatDate(string){
		var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
		return new Date(string).toLocaleDateString([],options);
	}
  
    return (
		<div>
		{isLoaded &&
		<div>
				<h2 style={{marginLeft: 16}}>Nahlášená závada</h2>
				<h3 style={{marginLeft: 16}}>Název: {ticket.name} </h3> 

				<div className='ticketinfopage--wrapper'>

				<div className='ticketinfopage--icons-text'>
					<AccessAlarmIcon className='ticketinfopage--icons'/>
					<span style={{color: "#2074d4"}}>Stav</span>
				</div>
				<Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
				<br/>

				{(user.role == 2 || user.role == 1) &&
				<span style={getColor()}>{getState()}</span>
				}

				{(user.role == 3 || user.role == 4) &&
				<Select
					labelId="state"
					id="state"
					size="small"
					value={ticketState}
					label="state"
					onChange={handleChange}>
					<MenuItem value={'1'}>Podáno</MenuItem>
					<MenuItem value={'2'}>V řešení</MenuItem>
					<MenuItem value={'3'}>Dokončeno</MenuItem>
					<MenuItem value={'4'}>Zamítnuto</MenuItem>
				</Select>
				}
				<br/>

				<div className='ticketinfopage--icons-text'>
					<CommentIcon className='ticketinfopage--icons'/>
					<span style={{color: "#2074d4"}} >Popis</span>
				</div>
				<Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
				<br/>
				<span className='light-text'> {ticket.description}</span>
				<br/>

				<div className='ticketinfopage--icons-text'>
					<AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
					<span style={{color: "#2074d4"}} >Nahlášeno dne</span>
				</div>
				<Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
				<br/>
				{formatDate(String(ticket.creation_date_time))}
				<br/>

				<div className='ticketinfopage--icons-text'>
					<ImageIcon className='ticketinfopage--icons'/>
					<span style={{color: "#2074d4"}} >Fotografie</span>
				</div>
				<Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
				<br/>
				<img style={{width: 500}} src={ticket.url}/>
				<br/>

				<div className='ticketinfopage--icons-text'>
					<MessageIcon className='ticketinfopage--icons'/>
					<span style={{color: "#2074d4"}} >Komentáře</span>
				{(user.role == 3 || user.role == 4) &&
				<AddIcon className='ticketinfopage--icons-2' onClick={() => navigate(`/createticketcomment?ticket_id=${id}`)}/>
				}
				</div>
				<Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
				<br/>
				{comments}   
				<br/>

			</div>
		</div>
		} 
		{!isLoaded && 
		<Spinner/>
		}
		</div>
    )
  }
  
export default TicketInfoPage