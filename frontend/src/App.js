import React, { useContext } from "react";;
import ReactDOM from "react-dom/client";
import AddTicketPage from "./Pages/AddTicketPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Header from "./components/Header";
import AuthContext, { AuthProvider } from './context/AuthContext'
import SignupPage from "./Pages/SignupPage";
import ListOfTicketsPage from "./Pages/ListOfTicketsPage";
import EditAccountPage from "./Pages/EditAccountPage";
import AddTechnicianPage from "./Pages/AddTechnicianPage";
import TicketInfoPage from "./Pages/TicketInfoPage";
import AddTicketCommentPage from "./Pages/AddTicketCommentPage"
import AddRequestPage from "./Pages/AddRequestPage"
import ListOfServiceRequestsPage from "./Pages/ListOfServiceRequestsPage"
import ServiceRequestPage from "./Pages/ServiceRequestsPage"
import AddRequestCommentPage from "./Pages/AddRequestCommentPage";
import UserManagementPage from "./Pages/UserManagementPage"
import About from "./Pages/AboutPage"

function PrivateRoute({children}) {
  let {user} = useContext(AuthContext)
  return user ? children : <Navigate to="/login"/>;
}


function PrivateRouteAdmin({children}) {
	let {user} = useContext(AuthContext)
	return user?.role === 4 ? children : <Navigate to="/"/>;

}


function PrivateRouteManagerPlus({children}) {
	let {user} = useContext(AuthContext)
	return (user?.role === 3 || user?.role === 4)? children : <Navigate to="/"/>;
  
}


function PrivateRouteTechPlus({children}) {
	let {user} = useContext(AuthContext)
	return (user?.role === 2 || user?.role === 3 || user?.role === 4)? children : <Navigate to="/"/>;
  
}


function PrivateRouteCitPlus({children}) {
	let {user} = useContext(AuthContext)
	return (user?.role === 1 ||  user?.role === 2 || user?.role === 3 || user?.role === 4)? children : <Navigate to="/"/>;
  
}


function App () {
    return (
		<div>
			<BrowserRouter>
			<AuthProvider>
				<Header/>
				<Routes>

					{/* Only Admin Access */}
					<Route  path="/usermanagement" element={<PrivateRouteAdmin><UserManagementPage/></PrivateRouteAdmin>}/>

					{/* Only Admin and Manager Access */}
					<Route  path="/addtechnician" element={<PrivateRouteManagerPlus><AddTechnicianPage/></PrivateRouteManagerPlus>}/>
					<Route  path="/addrequest" element={<PrivateRouteManagerPlus><AddRequestPage/></PrivateRouteManagerPlus>}/>

					{/* Only Admin, Manager and Technician Access */}
					<Route  path="/servicerequests" element={<PrivateRouteTechPlus><ListOfServiceRequestsPage/></PrivateRouteTechPlus>}/>
					<Route  path="/servicerequest" element={<PrivateRouteTechPlus><ServiceRequestPage/></PrivateRouteTechPlus>}/>
					<Route  path="/createreqcomment" element={<PrivateRouteTechPlus><AddRequestCommentPage/></PrivateRouteTechPlus>}/>
					<Route  path="/createticketcomment" element={<PrivateRouteTechPlus><AddTicketCommentPage/></PrivateRouteTechPlus>}/>

					{/* Only Admin, Manager, Technician and Citizen Access */}
					<Route  path="/tickets" element={<PrivateRouteCitPlus><ListOfTicketsPage/></PrivateRouteCitPlus>}/>
					<Route  path="/ticket" element={<PrivateRouteCitPlus><TicketInfoPage/></PrivateRouteCitPlus>}/>
					<Route  path="/addticket" element={<PrivateRouteCitPlus><AddTicketPage/></PrivateRouteCitPlus>}/>
				
					<Route  path="/editaccount" element={<PrivateRouteCitPlus><EditAccountPage/></PrivateRouteCitPlus>}/>

					<Route  path="*" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
				
					<Route  path="/about" element={<About />}/>
					<Route  path="/signup" element={<SignupPage/>}/>
					<Route  path="/login" element={<LoginPage/>}/>
			
				</Routes>
			</AuthProvider>
			</BrowserRouter>
		</div>    
    );
}


const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(
    <App />
)
