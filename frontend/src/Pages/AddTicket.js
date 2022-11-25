import React, { Component, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AuthContext from '../context/AuthContext';
import { Alert } from '@mui/material';

const AddTicket = () => {

    const [formData, setFormData] = React.useState(
      { 
          title: "",
          text: "",
          creation_time_date: "",
          author_id: "",
          photo: "",
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
    
    let {authTokens, logoutUser, user} = useContext(AuthContext) 
    const [sentStatus, setSentStatus] = React.useState(0)
    const [selectedDate, setSelectedDate] = React.useState(new Date())

    let validateForm = () => {
        if(formData.title !== "" && formData.description !== "") {
          console.log("gg")
          return true
        } else {
          console.log("ff")
          setSentStatus(2)
          return false
        }
    }

    let postTicket = async() => {
      
      
      let validation = validateForm()
      console.log(validation)
      if (validation) {
        console.log(user.user_id)
        console.log("valid success")
        let response = await fetch(`api/createTicket`, {
          method: 'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify({
            id: user.user_id,
            url: "",
            name: formData.title,
            description: formData.text,
            creation_time_date: formData.creation_time_date,
            photo: formData.photo,
          })
      })
      
      let data = await response.json()

      if(response.status == 200) {
          setSentStatus(200)
      } else {
          setSentStatus(1)
      }
    }
      
  }

    let style = {
      width: 250,
      height: 40,
      mb: 4,
      ml: 2
    } 

    return (
        <div>
          {sentStatus == 200 
          &&
          <Alert 
            severity="success"
            sx={{width: 470, ml: 2}}>
            Tiket byl úspěšně zpracován!
          </Alert>
          }
          {sentStatus == 1
          &&
          <Alert 
            severity="error"
            sx={{width: 470, ml: 2}}>
            Oops. Něco se pokazilo!
          </Alert>
          }
          {sentStatus == 2
          &&
          <Alert 
            severity="warning"
            sx={{width: 470, ml: 2}}>
            Nevyplnil si všechny požadované informace!
          </Alert>
          }
          <h2 className='signup--text-2'>Nahlášení závady</h2>
          <form>
          <TextField 
            required 
            id="outlined-basic" 
            label='Název'
            variant="outlined" 
            placeholder='Název závady'
            sx={{ width: 500, ml: 2, mb: 2 }}
            onChange={handleChange}
            name="title"
            value={formData.title}
          />
          <br/>
          <TextField
            required
            style={{textAlign: 'left'}}
            multiline
            placeholder='Popište zde závadu, kterou chcete nahlásit.'
            rows={4}
            sx={{ width: 500, ml: 2 }}
            onChange={handleChange}
            name="text"
            value={formData.text}
          />
          <br/>
          <p className='signup--text-2'>Čas nahlášení</p>
          <div className='reportticker--timer'>
            <input type="datetime-local" id="creation_time_date" name="creation_time_date"/>
          </div>
          <br/>
          <p className='signup--text-2'>Fotografie</p>
          <TextField
            style={{textAlign: 'left'}}
            placeholder='Můžete přiložit obrázek (pouze URL)'
            rows={1}
            sx={{ width: 500, ml: 2 }}
          />
          </form>
          <br/>
          <Button
            variant="contained"
            onClick={postTicket}
            sx = {style}>
            Odeslat
          </Button>    
        </div>
    ) 
}

export default AddTicket