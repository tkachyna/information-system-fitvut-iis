import React, { Component } from 'react'
import TextField from '@mui/material/TextField';

const ReportFailure = () => {

  const [formData, setFormData] = React.useState(
    {
      text: "",
      creation_time_date: "",
      author_id: ""
    }
  ) 

  return (
      <div>
        <h2 className='signup--text-2'>Nahlášení závady</h2>
        <form>
        <TextField
          style={{textAlign: 'left'}}
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiline
          placeholder='Popište zde závadu, kterou chcete nahlásit.'
          rows={4}
          sx={{ width: 500, ml: 2 }}
          />
    
          <br></br>
          <p className='signup--text-2'>Čas nahlášení</p>
          <input 
            type="datetime-local" 
            id="meeting-time"
            name="meeting-time" 
            value="2022-07-12T19:30"
            min="2022-06-07T00:00" 
            max="2022-06-14T00:00"
          />
        </form>
        <button>Odeslat</button>
      </div>
  )
  
}

export default ReportFailure