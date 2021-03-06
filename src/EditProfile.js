import React, {useState, useContext} from "react";
import UserContext from "./UserContext"
import {useHistory} from "react-router-dom";
import useFields from "./hooks/useFields"
import ApiHelper from './helpers/ApiHelper';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//passing info down instead of grabbing from Context
const EditProfile=({id,first_name, last_name,location})=>{
    const history = useHistory();
    const {storedUser,setStoredUser} = useContext(UserContext);

    const [formData, setFormData, resetFormData] = useFields({first_name, last_name,location})
    const [showDelete, setShowDelete] = useState(false);

    const handleModalClose = () => {
        setShowDelete(false);
    }

    const handleSubmit = async (evt)=>{
        const {first_name, last_name, location} = formData
        evt.preventDefault();
        let res = await ApiHelper.editProfile(id,first_name,last_name, location);
        console.log("RES FROM EDIT PROFILE", res)
        resetFormData();
        alert("Account Updated!")
        history.push("/") //to go to profile page or something
        setStoredUser({...storedUser,first_name, last_name, location })
    }

    const handleDelete = async () => {
        let res = await ApiHelper.deleteUser(id);
        console.log("delete res", res)
        history.push("/logout") 
    }

    return(<>
    <h2>Edit</h2>
        <form onSubmit={handleSubmit} >
            
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
            <button className="edit-btn mx-auto"> Update Profile</button>
        </form>
        <button className="delete-btn mb-5" onClick={()=>setShowDelete(true)}><i className="fas fa-user-slash"></i></button>
        {/* Modal for confirm delete */}
        <Modal show={showDelete} onHide={handleModalClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete your profile?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Once you've deleted your profile, your goal and recorded posts are gone. Forever.
            <Button onClick={handleDelete} variant="danger">Delete Profile</Button>
            <Button onClick={handleModalClose}>Keep Profile</Button>
        </Modal.Body>
      </Modal>
    </>)
}

export default EditProfile;