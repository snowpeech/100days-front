import React,{useContext,useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import UserContext from "./UserContext"
import './styles/Profile.css';
import ApiHelper from "./ApiHelper";
import EditProfile from "./EditProfile";
import GoalItem from './GoalItem';

const Profile = () => {
    //display user info. Allow to edit.
    //also list goals. And allow to edit
    const {storedUser} = useContext(UserContext);
    const { id, email, first_name, last_name, gender, location, goals } = storedUser //note: gender isn't
    console.log("storedUser in Profile", storedUser);

    const [userGoals, setUserGoals] = useState("");

    useEffect(()=>{
        //if goals.length>0 go find the goals
        if(goals.length > 0){
            loadGoals();
        }

        async function loadGoals(){
            const res =  await ApiHelper.getUserGoals();
            console.log("PROFILE JS GOAL INFO",res.goals)
            setUserGoals(res.goals);//return all goals' info: id, userId, goal (str), start_day, user_def1, 2,3
        }
    },[goals.length])

    //toggle edit user form 

    const [showEdit,setShowEdit] = useState(false);
    const toggleEdit = () => {setShowEdit(!showEdit)}

    return(<>
        <h1>Profile Page</h1>
        <button onClick={toggleEdit}>Edit Profile</button>
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

        <h2>Goals</h2>
        {goals.length === 0 || goals[0] === null ?  
            <div>No goal started? Let's fix that --> <Link to="/goals">Create a new goal</Link></div> :
            <div>{userGoals ? 
                // userGoals.map(g => <div>"{g.goal}" started on {g.start_day.slice(0,10)}</div>) : 
                userGoals.map(g => <GoalItem key ={g.goal_id} goalObj = {g} setUserGoals={setUserGoals} userGoals={userGoals}/>) : 
                        <div>Loading goal info...</div>}</div>}

                
    </>)
}

export default Profile;
