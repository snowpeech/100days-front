import React,{useContext} from "react"; //import {useContext} later
import { NavLink} from 'react-router-dom';
import "./styles/Navbar.css"
import UserContext from "./UserContext"
var dayjs = require('dayjs');

const  Navbar=()=>{
    // //before auth, default loggedIn = true for dev
    const {storedUser, startDay} = useContext(UserContext);
    let dayDiff=0;
    if(storedUser){
        if(startDay){
            dayDiff =  dayjs().diff(startDay,'day')
        }        

        return(<div className="Navbar">
            <h1>Logged In</h1>
            <NavLink exact to="/" className="navbar-brand">
                100 Days
            </NavLink>
            
            <NavLink exact to="/profile" className="navbar-brand">
                Profile
            </NavLink>
            
            {/* Maybe change So goals info will be here? AND DASHBOARD. 
            latest post. 
            Plotting metrics
            List of struggles? List of solutions? Best moments? (thats a future feature)  */}
            <NavLink exact to="/goals" className="navbar-brand">
                Goals
            </NavLink>

            <NavLink exact to="/about" className="navbar-brand">
                About
            </NavLink>

            <NavLink exact to={`/journal/${dayDiff}`} className="navbar-brand">
                Today
            </NavLink>

            <NavLink exact to="/logout" className="navbar-brand">
                Log out
            </NavLink>        
        </div> )
    } else {
        return (
    <div className="Navbar">
        <h1>Not Logged In</h1>
            <NavLink exact to="/" className="navbar-brand">
                100 Days
            </NavLink>
            <NavLink exact to="/about" className="navbar-brand">
                About
            </NavLink>
        </div>
        )
    }
}

export default Navbar;