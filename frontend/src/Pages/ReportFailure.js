import React, { Component } from 'react'
import Header from '../components/Header'

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
        <h2>Nahlášení závady</h2>
        <form>
          <textarea 
            name="Text1" 
            cols="40" 
            rows="5"
            placeholder='Popište zde závadu, kterou chcete nahlásit.'
          />
          <br></br>
          <p>Čas nahlášení</p>
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