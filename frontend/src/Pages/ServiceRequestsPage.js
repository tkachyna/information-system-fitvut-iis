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
import CommentIcon from '@mui/icons-material/Comment';
import TopicIcon from '@mui/icons-material/Topic';
import GroupIcon from '@mui/icons-material/Group';

const ServiceRequestPage = () => {

    const navigate = useNavigate();
    const navigate2 = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const id = query.get('id');

    let {authTokens, user} = useContext(AuthContext)  
    let [request, setRequest] = useState([])
    let [requestState, setRequestState] = useState("")
    let [requestComment, setRequestComments] = useState([])
    let [estDate, setEstDate] = useState(request.creation_date_time)

    useEffect( () => {
        getRequest()
    }, [])

    let getColor = () => {
      switch(request.state) {
          case "Podáno":
            return {color: "#e60000"} 
          case "V řešení":
            return {color: "#ff9900"} 
          case "Dokončeno":
            return {color: "#006600"} 
          default:
            return {color: "#e60000"} 
      }
    } 

    function handleChange2(event) {
        const {value} = event.target
        updateRequestEstTime(value)
        console.log(value)
      }
      
    function handleChange(event) {
      const {value} = event.target
      updateRequestState(value)
      console.log(value)
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
        console.log(data)
        if(response.status == 200) {
            setRequest(data)
            
            setRequestState(data.state)

            getrequestComments()
        }
    }

    let updateRequestEstTime = async(value) => {
        let response = await fetch(`api/editRequest`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
              author_id: user.user_id,
              id: request.id,
              estimated_time: value
            })
        })
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
      console.log(data)
      if(response.status == 200) {
          setRequest(data)
          
          setRequestState(data.state)
          console.log(requestState)
         // getrequestComments()
      }
  }

  const comments = requestComment.map(item => {
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
        <h2 style={{marginLeft: 16, marginTop: 16}} >Servisní požadavek</h2>
        <div className='ticketinfopage--wrapper'>
            <div className='ticketinfopage--icons-text'>
                <TopicIcon className='ticketinfopage--icons'/>
                <span>Tiket</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <span className='light-text'> {request.ticket_id}</span>
            <br/>

            <div className='ticketinfopage--icons-text'>
            <GroupIcon className='ticketinfopage--icons'/>
            <span>Servisní pracovníci</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <span className='light-text'> {request.ticket_id}</span>
            <br/>


            <div className='ticketinfopage--icons-text'>
            <AccessAlarmIcon className='ticketinfopage--icons'/>
            <span>Stav</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            {user.role == 1
            &&
            <span style={getColor()}>{request.state}</span>
            }
            {user.role == 3
            &&
            <Select
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
            }
            <br/>
            <div className='ticketinfopage--icons-text'>
            <CommentIcon className='ticketinfopage--icons'/>
            <span className='light-text' >Popis</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <span className='light-text'> {request.description}</span>
            <br/>
            <div className='ticketinfopage--icons-text'>
            <AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
            <span>Nahlášeno dne</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            {formatDate(String(request.creation_date_time))}
            <br/>
            <div className='ticketinfopage--icons-text'>
            <AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
            <span>{"Očekávaný čas opravy  (v hodinách)"}</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <TextField required
            id="servicerequest-est" variant="outlined"
            type="text" name="esttime"/>
            <br/>
            <div className='ticketinfopage--icons-text'>
            <AccessTimeFilledOutlinedIcon className='ticketinfopage--icons'/>
            <span>{"Reálný čas opravy (v hodinách)"}</span>
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            <TextField required
            id="servicerequest-real" variant="outlined"
            type="text" name="realtime"/>
            <br/>
            <div className='ticketinfopage--icons-text'>
            <MessageIcon className='ticketinfopage--icons'/>
            <span>Komentáře</span>
            {user.role === 3
            &&
            <AddIcon className='ticketinfopage--icons-2' onClick={() => navigate2(`/createreqcomment?request_id=${id}`)}/>
            }
            </div>
            <Divider style={{width: 370}}  sx={{ borderBottomWidth: 2, color: "black" }}/>
            <br/>
            {comments}   
            <br/>

        </div>
        
      </div>
    )
  }

export default ServiceRequestPage