import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import AuthContext from '../context/AuthContext'
import { TextField, Button, Alert } from '@mui/material'
import { useQuery } from 'react-query'
const AddRequestCommentPage = (props) => {

    // naviagte for "to go back" button
    // authContext for authentication
    let navigate = useNavigate()
    let {authTokens,user} = useContext(AuthContext)
    
    // get id of a ticket 
    let useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let request_id = query.get('request_id');

    // sentStatus for the alerts
    let [sentStatus, setSentStatus] = useState(0)
    let [formData, setFormData] = useState({
        comment: "",
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function validateForm() {
        if (formData.comment !== "") {
            return true

        } else { 
            setSentStatus(2)
            return false

        }
    }

    let postComment = async() => {

        let valid = validateForm()
        if (valid) {
            let response = await fetch(`api/requestComment`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    author_id: user.user_id,
                    request_id: request_id,
                    text: formData.comment
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
        ml: 2,
        mt: 2
      } 

    return (
      <div >
        {sentStatus == 200 
          &&
          <Alert 
            severity="success"
            sx={{width: 470, ml: 2}}>
            Komentář byl úspěšně zpracován!
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
        <Button 
          onClick={() => navigate(-1)}
          variant="contained" 
          sx={{ml: 2, mt: 2}}>
          Zpět
        </Button>
        <h3 className='signup--text-2'>Přidat komentář</h3>
        <form>
            <TextField
                required
                style={{textAlign: 'left'}}
                multiline
                placeholder='*  '
                rows={4}
                sx={{ width: 500, ml: 2 }}
                onChange={handleChange}
                name="comment"
                value={formData.comment}
          />
        </form>
        <Button 
          onClick={postComment}
          variant="contained" 
          sx={style}>
          Potvrdit
        </Button>
      </div>
    )
  }
  
export default AddRequestCommentPage