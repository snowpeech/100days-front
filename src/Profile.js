import React,{useContext,useState, useEffect} from "react";
// import {Link} from 'react-router-dom'
import UserContext from "./UserContext"
import './styles/Profile.css';
import ApiHelper from "./helpers/ApiHelper";
import EditProfile from "./EditProfile";
import GoalItem from './GoalItem';
import NoGoal from "./NoGoal";
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

const Profile = () => {
    //display user info. Allow to edit.
    //also list goals. And allow to edit
    const {storedUser} = useContext(UserContext); //takes a second to come back from a page refresh...
    const goalId = localStorage.getItem("_goalId")

    const [userGoals, setUserGoals] = useState("");

    useEffect(()=>{
        loadGoals();

        async function loadGoals(){
            const res =  await ApiHelper.getUserGoals();
            console.log("PROFILE JS GOAL INFO",res.goals)
            setUserGoals(res.goals);//return all goals' info: id, userId, goal (str), start_day, user_def1, 2,3
        }
    },[storedUser])
    
    //toggle edit user form 
    const [showEdit,setShowEdit] = useState(false);
    const toggleEdit = () => {setShowEdit(!showEdit)}

    if(!storedUser){
        return(<><h1>Profile</h1> 
                <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
                </Spinner></>)
    } else {
        const { id, email, first_name, last_name, location } = storedUser 
        return(<div className="border-boxx">
            <h2>Profile</h2>
            <Button onClick={toggleEdit} size="sm"><i className="fas fa-user-edit"></i></Button>
            {showEdit ? <EditProfile id={id} first_name={first_name} last_name={last_name} location={location} /> :
            <div className="profile">
                <div>
                    <b>Name:</b> <span>{first_name} {last_name}</span>
                </div>
                <div>
                    <b>Email:</b> <span>{email}</span>
                </div>
                <div>
                    <b>Location:</b> <span>{location}</span>
                </div>
            </div>
            }

<hr className="mt-5 "></hr>
            <h2>Goal</h2>
            {!goalId ?  
                <NoGoal/> :

                <div>{userGoals ? 
                    
                    userGoals.map(g => <GoalItem key ={g.goal_id} goalObj = {g} setUserGoals={setUserGoals} userGoals={userGoals}/>) : 
                            <div>Loading goal info...</div>}</div>}

                    
        </div>)
    }
}

export default Profile;

