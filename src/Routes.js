import React,{useContext} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./Home";
import Profile from "./Profile"
import Logout from './Logout'
import UserContext from "./UserContext"
import Goals from "./Goals";

const Routes =()=>{
/* Home page is a simple welcome page
Login allows user to log in or sign up
Profile displays profile information + allows user to edit  
Goals displays Goal information + allows to edit. May combine with  Profile page
*/

const {storedUser} = useContext(UserContext);

return(
<Switch>  

    <Route exact path="/profile">
       {storedUser ? <Profile /> : <Redirect to="/" /> } 
    </Route>


    <Route exact path="/logout">
        <Logout />
    </Route>

    <Route exact path="/goals">
        <Goals />
    </Route>


    <Route exact path="/">
        <Home />
    </Route>

</Switch>
)
}
export default Routes;