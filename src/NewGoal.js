import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from "./hooks/useFields"
import ApiHelper from './helpers/ApiHelper';
import UserContext from "./UserContext"
const dayjs = require('dayjs');
// import "./styles/Login.css" //placeholder

//Creates a new goal
const NewGoal=()=>{
    const {setToken} = useContext(UserContext)
    const history = useHistory();
    
    const today = new Date().toISOString().split('T')[0]

    const [formData,handleChange, resetFormData] = useFields(
        {goal:"", 
        start_day:today,
        user_def1:"",
        user_def2:"",
        user_def3:""})
        //default start day as today
    const endDay = dayjs(formData.start_day).add(100, 'day').format('MMMM D, YYYY');
    
    const handleCreateGoal = async (evt) =>{
        evt.preventDefault();
        const {goal, start_day, user_def1, user_def2, user_def3} = formData;
        let res = await ApiHelper.createGoal(goal, start_day, user_def1, user_def2, user_def3);
        console.log("Goal created! Token:", res._token)
        setToken(res._token);
        resetFormData();
        history.push("/profile");
    }


    return(<>
        <form onSubmit={handleCreateGoal} className="border-box">
            <h2>Create a Goal</h2>
            <div>
                <p> Are you ready to chart your next 100-day journey? 
                    We suggest taking a couple minutes to think about something you want to commit to 
                    that will be right at the edge of your comfort zone. </p> 
                <p>There should be more information about making goals. Just a SMART tip or something</p>
            </div>
            <div>
                <label htmlFor="goal">Goal </label>
                <input 
                id='goal' 
                type='textarea'
                name='goal'
                value={formData.goal}
                onChange={handleChange} 
                required/>
            </div>
            <div>
                <label htmlFor="start_day">Start day </label>
                <input 
                id='start_day' 
                type='date'
                name='start_day'
                value={formData.start_day}
                onChange={handleChange} 
                required/> 
            </div>
            <p>Note: 100 days from that start date is: {endDay}</p>
        <h4>Optional: User Defined Metric</h4>
        <p>For each night of your journey, you'll be asked to rate how __ and __ you were. If you want to track your own 
            unique values, this is where you can define that. If you can't think of something right now, 
            you can always come back to it. Keep in mind that order *does* matter.</p>
            <p>If you're tracking something that isn't on an obvious scale, 
                it might be helpful to add the units you're measuring
                (e.g. Sleep (hrs))
            </p>
            <div>
                <label htmlFor="user_def1">Unique metric (1)</label>
                <input 
                id='user_def1' 
                type='text'
                name='user_def1'
                value={formData.user_def1}
                onChange={handleChange} /> 
            </div>
            <div>
                <label htmlFor="user_def2">Unique metric (2)</label>
                <input 
                id='user_def2' 
                type='text'
                name='user_def2'
                value={formData.user_def2}
                onChange={handleChange} /> 
            </div>
            <div>
                <label htmlFor="user_def3">Unique metric (3)</label>
                <input 
                id='user_def3' 
                type='text'
                name='user_def3'
                value={formData.user_def3}
                onChange={handleChange} /> 
            </div>     
            <button>Create Goal!</button>
        </form>
                
    </>)
}

export default NewGoal;