import React,{useContext} from "react"; //import {useContext} later
import { NavLink} from 'react-router-dom';
import "./styles/Navbar.css"
import UserContext from "./UserContext"

const  Navbar=()=>{
    // //before auth, default loggedIn = true for dev
    const {storedUser} = useContext(UserContext);

if(storedUser){
    return(<div className="Navbar">
        <h1>Logged In</h1>
        <NavLink exact to="/" className="navbar-brand">
            100 Days
        </NavLink>
        
        <NavLink exact to="/profile" className="navbar-brand">
            Profile
        </NavLink>
        <NavLink exact to="/logout" className="navbar-brand">
            Log out
        </NavLink>        
    </div> )
}
else {
    return (
<div className="Navbar">
    <h1>Not Logged In</h1>
        <NavLink exact to="/" className="navbar-brand">
            100 Days
        </NavLink>
        {/* <NavLink exact to="/login" className="navbar-brand">
            Log In or Sign Up
        </NavLink> */}
        {/* Add an About link? */}
        
    </div>
    )
}
}

export default Navbar;