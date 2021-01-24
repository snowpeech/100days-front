import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from "./hooks/useFields"
import ApiHelper from './ApiHelper';
import UserContext from "./UserContext"
// import "./styles/Login.css"

const Login=()=>{
    const {setToken} = useContext(UserContext)
//show login or sign-up form and will store signed-in token with successful login
const history = useHistory();
const [formData,handleChange, resetFormData] = useFields(
    {email:"", 
    password:""})

const handleLogin = async (evt) =>{
    evt.preventDefault();
    console.log("handle login")
    const {email, password} = formData;
    let _token= await ApiHelper.login(email,password);
    console.log("HANDLE LOGIN TOKEN",_token)
    setToken(_token);
    resetFormData();
    history.push("/")//push to profile...
}


return(<>
        <form onSubmit={handleLogin}>
            <h2>Log in</h2>
            <div>
                <label htmlFor="email">Email </label>
                <input 
                id='email' 
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange} 
                required/>
            </div>
            <div>
                <label htmlFor="password">Password </label>
                <input 
                id='password' 
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange} 
                required/> 
            </div>
            <button>Log In</button>
        </form>
            
    </>)
}

export default Login;