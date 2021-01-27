import React,{useContext} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./Home";
import Profile from "./Profile"
import Logout from './Logout'
import UserContext from "./UserContext"
import NewGoal from "./NewGoal";
import Today from "./Today";
import About from './About'
const dayjs = require('dayjs');

const Routes =()=>{
/* Home page is a simple welcome page
Login allows user to log in or sign up
Profile displays profile information + allows user to edit  
Goals displays Goal information + allows to edit. May combine with  Profile page
*/
    let dayDiff, goalId;
    const {storedUser} = useContext(UserContext);
    // const {storedUser} = useContext(UserContext);
    if(storedUser){
        if(storedUser["start_days"]){

            console.log("NAVBAR STORED USER", storedUser)
            let startDay = dayjs(storedUser["start_days"][0])
            dayDiff =  dayjs().diff(startDay,'day')
        }
        // let startDay = dayjs(storedUser["start_days"][0])
        // dayDiff =  dayjs().diff(startDay,'day')
        goalId = storedUser["goals"][0];
        // console.log("dayDif!!", dayDiff)
    }

return(
<Switch>  

    <Route exact path="/profile">
       {storedUser ? <Profile /> : <Redirect to="/" /> } 
    </Route>


    <Route exact path="/logout">
        <Logout />
    </Route>

    <Route exact path="/goals">
    {storedUser ? <NewGoal /> : <Redirect to="/" /> } 
        {/* <NewGoal /> */}
    </Route>

    <Route exact path="/journal/NaN">
        {storedUser ? <div>Let's not get too carried away and create a goal before journaling</div> : <Redirect to="/" /> } 
    </Route>

    <Route exact path="/journal/:day">
        {console.log("JOURNAL PATH")}
        {storedUser ? <Today goalId = {goalId} /> : <Redirect to="/" /> } 
    </Route>

    <Route exact path="/about">
        <About />
    </Route>

    <Route exact path="/">
        {storedUser ? <Redirect to="/profile" /> : <Home />} 
    </Route>

</Switch>
)
}
export default Routes;