import { Routes, Route, Navigate  } from 'react-router-dom'
import React from 'react'

const PrivateRoute = ({children, ...rest}) => {
    console.log("it iw ")
    const authenticated = false
    return(
        <Routes>
        <Route 
        {...rest}
        render = {() => !authenticated 
            ? <Navigate  to="/login"/> 
            :  children
        }
        />
        </Routes>
    )
}

export default PrivateRoute;