import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const ReportFailure = () => {

    const [formData, setFormData] = React.useState(
      {
          text: "",
          creation_time_date: "",
          author_id: "",
          photo: "",
      }
    ) 

    const [selectedDate, setSelectedDate] = React.useState(new Date())

    let style = {
      width: 250,
      height: 40,
      mb: 4,
      ml: 2
    } 

    return (
        <div>
          <h2 className='signup--text-2'>Nahlášení závady</h2>
          <form>
          <TextField required id="outlined-basic" label='Název' variant="outlined" placeholder='Název závady' sx = {style}
              name="username"
            />
          <br/>
          <TextField
            required
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
            <input className='reportticker--timer' type="datetime-local" id="creation_time_date" name="creation_time_date"/>
            <br/>
            <p className='signup--text-2'>Fotografie</p>
            <TextField
              style={{textAlign: 'left'}}
              hintText="Message Field"
              floatingLabelText="MultiLine and FloatingLabel"
              placeholder='Můžete přiložit obrázek (pouze URL)'
              rows={1}
              sx={{ width: 500, ml: 2 }}
            />
            </form>
            <br/>
            <Button
              variant="contained"
              sx = {style}>
              Odeslat
            </Button>
        </div>
    )
  
}

export default ReportFailure