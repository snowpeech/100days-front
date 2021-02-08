import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from "./hooks/useFields"
import ApiHelper from './helpers/ApiHelper';
import UserContext from "./UserContext";
import { decode } from "jsonwebtoken";

const Login=()=>{
    const history = useHistory();
    const {setToken} = useContext(UserContext)
//show login or sign-up form and will store signed-in token with successful login
    const [formData,handleChange, resetFormData] = useFields(
        {email:"", 
        password:""})

    const handleLogin = async (evt) =>{
        evt.preventDefault();
        console.log("handle login")
        const {email, password} = formData;
     try{
         let _token= await ApiHelper.login(email,password);
         setToken(_token);

         let decodedToken = decode(_token)
         let { goals,start_days} = decodedToken;
         localStorage.setItem('_goalId',goals[0])
         localStorage.setItem('_startDay',start_days[0])
         //set up goals and start day in localStorage
         resetFormData();
         history.push("/")//push to profile...
     }catch(e){
         console.error(e);
     }
    }


    return(<>
            <form onSubmit={handleLogin}>
                <h2>Log in</h2>
                <div>
                    <label htmlFor="email">Email </label>
                    <input 
                    id='email' 
                    type='email'
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
                <button className="login-btn">Log In</button>
            </form>
                
        </>)
    }

export default Login;