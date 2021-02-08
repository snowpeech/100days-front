import React,{useContext} from "react";
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import Home from "./Home";
import Logout from './Logout'
import UserContext from "./UserContext"
import NewGoal from "./NewGoal";
import Today from "./Today";
import About from './About'
import Dashboard from "./Dashboard";
import TenSummary from './TenComponents/TenSummary'

const Routes =()=>{
/* Home page is a simple welcome page
Login allows user to log in or sign up
Profile displays profile information + allows user to edit  
Goals displays Goal information + allows to edit. May combine with  Profile page
*/
    const {storedUser,goalId} = useContext(UserContext);
    console.log("storedUser FROM ROUTES", storedUser)

return(<Switch>

    <Route exact path="/profile">
        {storedUser ? <Dashboard /> : <Redirect to="/"/> }
    </Route>

    <Route exact path="/logout">
        <Logout />
    </Route>

    <Route exact path="/goals">
        {storedUser ? <NewGoal/> : <Redirect to="/"/> }
    </Route>
    
    <Route exact path="/journal/NaN">
        {storedUser ? <div>Let's <Link to="/goals">create a new goal</Link> before journaling</div> : <Redirect to="/"/> }
    </Route>

    <Route exact path="/journal/undefined">
        {storedUser ? <div><Link to="/goals">Create a new goal</Link> before journaling</div> : <Redirect to="/"/> }
    </Route>

    <Route exact path="/journal/:day">
        {storedUser ? <Today goalId = {goalId} /> : <Redirect to="/"/> }
        
    </Route>
    
    <Route exact path="/about">
        <About />
    </Route>

    <Route exact path="/ten/undefined">
        {storedUser ? <div><Link to="/goals">Create a new goal</Link> before journaling</div> : <Redirect to="/"/> }
    </Route>
    
    <Route exact path="/ten/:day">
        {storedUser ? <TenSummary/> : <Redirect to="/"/> } 
        
    </Route>


    <Route  exact path="/home">
        {storedUser ? <Redirect to="/profile" /> : <Home/>}
    </Route>

    <Redirect to="/home" />

</Switch>
)
}
export default Routes;