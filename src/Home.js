import React, {useState} from "react";
import Signup from './Signup';
import Login from './Login';
import "./styles/Home.css";

const Home=()=>{

    const [showLogin,setShowLogin]=useState(true);

    const toggleForm = ()=>{    setShowLogin(!showLogin)}

    const signUpClasses=`Login ${ showLogin ? "dead" : "live"}`;
    const logInClasses=`Login ${ showLogin ? "live" : "dead"}`;

return(<>
<h1>Welcome to the 100 day goal - journal </h1>
<p> Time is precious. Live with intention. </p>
<div class="border-box">
    <button onClick={toggleForm} className={logInClasses} disabled={showLogin}> Log In</button > 
    <button onClick={toggleForm} className={signUpClasses} disabled={!showLogin}>Sign Up</button>
    {showLogin ? <Login /> : <Signup />}
</div>
</>)
}

export default Home;