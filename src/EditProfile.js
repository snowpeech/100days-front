import React from "react";
import {useHistory} from "react-router-dom";
import useFields from "./hooks/useFields"
import ApiHelper from './ApiHelper';

//passing info down instead of grabbing from Context
const EditProfile=({id,first_name, last_name,location})=>{
    const history = useHistory();

    const [formData, setFormData, resetFormData] = useFields({first_name, last_name,location})
    
    const handleSubmit = async (evt)=>{
        const {first_name, last_name, location} = formData
        evt.preventDefault();
        let res = await ApiHelper.editProfile(id,first_name,last_name, location);
        console.log("RES FROM EDIT PROFILE", res)
        resetFormData();
        alert("Account Updated!")
        history.push("/") //to go to profile page or something
    }

    return(<>
    <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            
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
            <div>
                <label htmlFor="location">Location</label>
                <input 
                    type="text"
                    name = "location"
                    value ={formData.location}
                    onChange = {setFormData}
                />
            </div>
            <button> Update Profile</button>
        </form>

    </>)
}

export default EditProfile;