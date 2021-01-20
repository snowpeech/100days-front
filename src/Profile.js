import React,{useContext,useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import UserContext from "./UserContext"
import './styles/Profile.css';
import ApiHelper from "./ApiHelper";

const Profile = () => {
    //display user info. Allow to edit.
    //also list goals. And allow to edit
    const {storedUser} = useContext(UserContext);
    const { email, first_name, last_name, gender, location, goals } = storedUser
    console.log("storedUser", storedUser);

    const [userGoals, setUserGoals] = useState("");

    useEffect(()=>{
        //if goals.length>0 go find the goals
        if(goals.length > 0){
            loadGoals();
            // const goalsDiv = userGoals.map((g => <div>{g.goal} started on {g.start_day}</div>))
        }

        async function loadGoals(){
            const res =  await ApiHelper.getUserGoals();
            console.log("PROFILE JS GOAL INFO",res.goals)
            setUserGoals(res.goals);//return all goals' info: id, userId, goal (str), start_day, user_def1, 2,3
        }
        console.log("hi use effect")
    },[])

    return(<>
        <h1>Profile Page</h1>
        <div class="profile">
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

        <h2>Goals</h2>
        {goals.length === 0 ?  
            <div>No goal started? Let's fix that --> <Link to="/goals">Create a new goal</Link></div> :
            <div>{userGoals ? 
                userGoals.map((g => <div>"{g.goal}" started on {g.start_day.slice(0,10)}</div>)) : 
                        <div>Loading goal info...</div>}</div>}

                
    </>)
}

export default Profile;
