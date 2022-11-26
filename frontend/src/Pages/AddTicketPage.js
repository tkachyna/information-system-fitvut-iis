import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Alert } from '@mui/material';
import AuthContext from '../context/AuthContext';

const AddTicket = () => {
    let {authTokens, user} = useContext(AuthContext) 
    let [alertCode, setAlertCode] = useState(0)
    let [alertMessage, setAlertMessage] = useState("")
    let [formData, setFormData] = useState({ 


        name: "",
        description: "",
        creation_time_date: "",
        author_id: "",
        url: "",
    }) 

    function handleChange(event) {
        let {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    let validateForm = () => {
        if (formData.name == "" || formData.description == "") {
            setAlertCode(2)
            setAlertMessage("Vyplň všechna požadovaná pole s * !")

        } else if (formData.name.length < 15) {
            setAlertCode(3)
            setAlertMessage("Délka názvu musí být alespoň 15 znaků!")

        } else if (formData.description.length < 100) {
            setAlertCode(3)
            setAlertMessage("Delká popisu musí být alespoň 100 znaků")

        } else {
            return true

        }
    }

    let postTicket = async() => {
      	let validation = validateForm()

		if (validation) {
			let response = await fetch(`api/createTicket`, {
				method: 'POST',
				headers:{
					'Content-Type':'application/json',
					'Authorization':'Bearer ' + String(authTokens.access)
				},
				body: JSON.stringify({
					id: user.user_id,
					name: formData.name,
					description: formData.description,
					url: formData.url,
				})
		})
		
		let data = await response.json()

		if(response.status == 200) {
			setAlertCode(1)
			setAlertMessage("Tiket byl úspěšně zaznamenán!")

		} else {
			setAlertCode(3)
			setAlertMessage(data)

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
            {alertCode == 1 &&
            <Alert 
				severity="success"
				sx={{width: 470, m: 2}}>
				{alertMessage}
            </Alert>
            }
            {alertCode == 2 &&
            <Alert 
				severity="warning"
				sx={{width: 470, m: 2}}>
            	{alertMessage}
            </Alert>
            }
            {alertCode == 3 &&
            <Alert 
				severity="error"
				sx={{width: 470, m: 2}}>
				{alertMessage}
            </Alert>
            }
            <h2 className='signup--text-2'>Nahlášení závady</h2>
            <form>
            <TextField 
            	required 
            	variant="outlined" 
            	id="name"
            	name="name" 
            	label='Název (Alespoň 15 znaků)'
            	placeholder='Název závady'
            	value={formData.name}
				onChange={handleChange}
				sx={{ width: 500, ml: 2, mb: 2 }}
          	/>
          	<br/>
          	<TextField
				required
				name="description"	
				multiline
				rows={4}
				placeholder='Popište zde závadu, kterou chcete nahlásit (Alespoň 100 znaků) *'
				value={formData.description}
				onChange={handleChange}
				style={{textAlign: 'left'}}
				sx={{ width: 500, ml: 2 }}
          	/>
			<br/>
			<p className='signup--text-2'>Fotografie</p>
			<TextField
				name="url"
				rows={1}
				placeholder='Můžete přiložit obrázek (pouze URL)'
				value={formData.url}
				onChange={handleChange}
				style={{textAlign: 'left'}}
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