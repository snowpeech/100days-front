import React,{useContext} from "react";
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import Home from "./Home";
import Profile from "./Profile"
import Logout from './Logout'
import UserContext from "./UserContext"
import NewGoal from "./NewGoal";
import Today from "./Today";
import About from './About'
import ProtectedRoute from './ProtectedRoute'
const dayjs = require('dayjs');

const Routes =()=>{
/* Home page is a simple welcome page
Login allows user to log in or sign up
Profile displays profile information + allows user to edit  
Goals displays Goal information + allows to edit. May combine with  Profile page
*/  console.log("ROUTES WAS HERE")
    let dayDiff, goalId;
    const {storedUser} = useContext(UserContext);
    console.log("storedUser FROM ROUTES", storedUser)
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


return(<Switch>

    <ProtectedRoute exact path="/profile">
        <Profile/>
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

    <Route  exact path="/home">
        {storedUser ? <Redirect to="/profile" /> : <Home/>}
    </Route>

    <Redirect to="/home" />

</Switch>
// const PublicRoutes = <Switch>
//      <Route exact path="/profile">
//         <Profile /> 
//     </Route>

//     <Route exact path="/logout">
//         <Logout />
//     </Route>

//     <ProtectedRoute exact path="/goals">
//         <NewGoal />
//     </ProtectedRoute>

//     {/* <ProtectedRoute exact path="/journal/NaN">
//         {storedUser.goals[0] ?  <Redirect to="/" /> : <div>Let's <Link to="/goals">create a new goal</Link> before journaling</div> } 
//     </ProtectedRoute> */}

//     <ProtectedRoute exact path="/journal/:day">
//         {storedUser? console.log("JOURNAL PATH STORED USER", storedUser): console.log("JOURNAL PATH No stored user")}
//         <Today goalId = {goalId} />
//     </ProtectedRoute>

//     <Route exact path="/about">
//         <About />
//     </Route>

//     <Route exact path="/">
//         <Redirect to="/profile" />
//     </Route>
// </Switch>;
///////////////////////
// <Switch>  

//     <Route exact path="/profile">
//        {storedUser ? <Profile /> : <Redirect to="/" /> } 
//     </Route>

//     <Route exact path="/logout">
//         <Logout />
//     </Route>

//     <Route exact path="/goals">
//     {storedUser ? <NewGoal /> : <Redirect to="/" /> } 
//         {/* <NewGoal /> */}
//     </Route>

//     <Route exact path="/journal/NaN">
//         {storedUser ? 
//         {storedUser.goals[0] ?  <Redirect to="/" /> : <div>Let's <Link to="/goals">create a new goal</Link> before journaling</div> } 
//         :  <Redirect to="/" /> }
//         </Route>

//     <Route exact path="/journal/:day">
//         {storedUser? console.log("JOURNAL PATH STORED USER", storedUser): console.log("JOURNAL PATH No stored user")}
//         {storedUser ? <Today goalId = {goalId} /> : <Redirect to="/" /> } 
//     </Route>

//     <Route exact path="/about">
//         <About />
//     </Route>

//     <Route exact path="/">
//         {storedUser ? <Redirect to="/profile" /> : <Home />} 
//     </Route>

// </Switch>
)
}
export default Routes;