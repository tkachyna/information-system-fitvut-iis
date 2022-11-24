import React, { Component, useContext } from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom/client";
import AddTicket from "./Pages/AddTicket";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Header from "./components/Header";
import AuthContext, { AuthProvider } from './context/AuthContext'
import SignupPage from "./Pages/SignupPage";
import TicketsListPage  from "./Pages/TicketsListPage";
import ListOfTasksPage from "./Pages/ListOfTasksPage";
import EditAccountPage from "./Pages/EditAccountPage";
import AddTechnicianPage from "./Pages/AddTechnicianPage";
import TicketInfoPage from "./Pages/TicketInfoPage";
import AddTicketCommentPage from "./Pages/AddTicketCommentPage"
import AddRequest from "./Pages/AddRequest"
import ListOfServiceRequestsPage from "./Pages/ListOfServiceRequestsPage"

function PrivateRoute({children}) {
  let {user} = useContext(AuthContext)
  return user ? children : <Navigate to="/login"/>;
}

function PrivateRouteAdmin({children}) {
  let {user} = useContext(AuthContext)
  return user?.username === "admin" ? children : <Navigate to="/login"/>;
}

function App () {
    return (
      <div>
         <BrowserRouter>
         <AuthProvider>
            <Header/>
            <Routes>
            <Route  path="/addrequest" element={<AddRequest />}/>
            <Route  path="/addticket" element={<AddTicket />}/>
            <Route  path="/addtechnician" element={<AddTechnicianPage />}/>
            <Route  path="/tickets" element={<TicketsListPage  />}/>
            <Route  path="/servicerequests2" element={<ListOfServiceRequestsPage />}/>
            <Route  path="/editaccount" element={<EditAccountPage />}/>
            <Route  path="/ticket" element={<TicketInfoPage />}/>
            <Route  path="/createcomment" element={<AddTicketCommentPage/>}/>
            <Route  path="/servicerequests" element={<ListOfTasksPage />}/>
            <Route  path="/*" element={<PrivateRoute> <HomePage /> </PrivateRoute>}/>
            <Route  path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              {/* <Route path="/" element={<p>funguj</p>}/>
              <Route path="/nahlasenezavady" element={<ViewReports/>}/>
              <Route path="/nahlasitzavadu" element={<ReportFailure/>}/> */}
            </Routes>
          </AuthProvider>
          </BrowserRouter>
      </div>
      
      
    );
}

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(

    <App />)
