import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from "./hooks/useFields"
import ApiHelper from './helpers/ApiHelper';    
import UserContext from "./UserContext"
// import "./styles/Signup.css"


const Signup=()=>{
    //sign up form 
    const history = useHistory();
    const {setToken, setStoredUser} = useContext(UserContext)

    const [formData, setFormData, resetFormData] = useFields({email:"", password:"", password2:"", first_name:"", last_name:""})
    
    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        if(formData.password === formData.password2 ){
            const {email, password, first_name, last_name} = formData
            let _token = await ApiHelper.signup(email, password, first_name,last_name);
            setToken(_token);
            setStoredUser({email,password,first_name,last_name})
            resetFormData();
            alert("Account Created!")
            history.push("/profile")
        } else {
            alert("Passwords must match")
        }
    }

    return(<>
    <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email </label>
                <input 
                    type="text"
                    name = "email"
                    value ={formData.email}
                    onChange = {setFormData}
                />
            </div>
            <div>
                {/* put requirements for password here? */}
                <label htmlFor ="password">Password </label>
                <input  
                    type="password"
                    name = "password"
                    value ={formData.password}
                    onChange = {setFormData}
                />
            </div>
            <div>
                {/* put requirements for password here? */}
                <label htmlFor ="password2">Re-Type Password </label>
                <input  
                    type="password"
                    name = "password2"
                    value ={formData.password2}
                    onChange = {setFormData}
                />
            </div>
            {formData.password !== formData.password2 ? <div>Passwords don't match</div> : ""}
            <div>
                <label htmlFor="first_name">First Name </label>
            
                <input 
                    type="text"
                    name = "first_name"
                    value ={formData.first_name}
                    onChange = {setFormData}
                />
           </div> 
           <div>
                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text"
                    name = "last_name"
                    value ={formData.last_name}
                    onChange = {setFormData}
                />
            </div>
            <button> Sign Up!</button>
        </form>

    </>)
}

export default Signup;