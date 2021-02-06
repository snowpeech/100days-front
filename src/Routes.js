import React,{useContext} from "react";
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import Home from "./Home";
import Logout from './Logout'
import UserContext from "./UserContext"
import NewGoal from "./NewGoal";
import Today from "./Today";
import About from './About'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from "./Dashboard";
import TenSummary from './TenSummary'

const Routes =()=>{
/* Home page is a simple welcome page
Login allows user to log in or sign up
Profile displays profile information + allows user to edit  
Goals displays Goal information + allows to edit. May combine with  Profile page
*/
    const {storedUser,goalId} = useContext(UserContext);
    console.log("storedUser FROM ROUTES", storedUser)

return(<Switch>

    <ProtectedRoute exact path="/profile">
        <Dashboard />
    </ProtectedRoute>

    <ProtectedRoute exact path="/logout">
        <Logout />
    </ProtectedRoute>

    <ProtectedRoute exact path="/goals">
       <NewGoal />
    </ProtectedRoute>
    
    <ProtectedRoute exact path="/journal/NaN">
         <div>Let's <Link to="/goals">create a new goal</Link> before journaling</div> 
    </ProtectedRoute>

    <ProtectedRoute exact path="/journal/:day">
        <Today goalId = {goalId} />        
    </ProtectedRoute>
    
    <Route exact path="/about">
        <About />
    </Route>

    <Route exact path="/ten/:day">
        <TenSummary />
    </Route>


    <Route  exact path="/home">
        {storedUser ? <Redirect to="/profile" /> : <Home/>}
    </Route>

    <Redirect to="/home" />

</Switch>
)
}
export default Routes;