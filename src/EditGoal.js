import React from 'react';
import useFields from "./hooks/useFields"
import ApiHelper from './ApiHelper';


//I'd like to import this as a Modal...
const EditGoal = ({goalObj}) => {
//goal, start_day, user_def1, user_def2, user_def3
    console.log("EDIT GOAL OBJ", goalObj);
//     const goalObj = { a: 1, b: 2, c: 3 };

    const { goal_id, ...INITIAL_STATE } = goalObj;
// console.log(a); // 1
// console.log(rest); // { b: 2, c: 3 }

    // const INITIAL_STATE = {};
    for(let key in INITIAL_STATE){
        if(INITIAL_STATE[key] == null){
            INITIAL_STATE[key] = ""
        } 
        if(key==='start_day'){
            INITIAL_STATE.start_day = INITIAL_STATE.start_day.split('T')[0] 
        }
    }
    
    console.log("THE INITIAL_STATE", INITIAL_STATE)
    // const [formData, setFormData] = useFields({goal:goalObj.goal, start_day:goalObj.start_day, user_def1:goalObj.user_def1, user_def2:goalObj.user_def2, user_def3:goalObj.user_def3})
    const [formData, setFormData] = useFields(INITIAL_STATE)
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // const {goal, start_day, user_def1, user_def2, user_def3} = formData;
        // let res = await ApiHelper.updateGoal(goal, start_day, user_def1, user_def2, user_def3);
        //close modal and go back to goals?
        let res = await ApiHelper.updateGoal(goalObj.goal_id, formData);
        console.log("EDIT GOAL JS RES", res)
    }

    return(
        <form onSubmit = {handleSubmit}>
            <div>
                <label htmlFor="goal">Goal </label>
                <input 
                    type="textarea"
                    name = "goal"
                    value ={formData.goal}
                    onChange = {setFormData}
                />
            </div>
            <div>
                <label htmlFor="start_day">Start Date </label>
                <input 
                    type="date"
                    name = "start_day"
                    value ={formData.start_day}
                    onChange = {setFormData}
                />
            </div>
            <div>
                <label htmlFor="user_def1">Unique metric (1)</label>
                <input 
                    type="text"
                    name = "user_def1"
                    value ={formData.user_def1}
                    onChange = {setFormData}
                />
            </div>
            <div>
                <label htmlFor="user_def2">Unique metric (2)</label>
                <input 
                    type="text"
                    name = "user_def2"
                    value ={formData.user_def2}
                    onChange = {setFormData}
                />
            </div>
            <div>
                <label htmlFor="user_def3">Unique metric (3)</label>
                <input 
                    type="text"
                    name = "user_def3"
                    value ={formData.user_def3}
                    onChange = {setFormData}
                />
            </div>
            <button>Update Goal</button>
        </form>
    )
}

export default EditGoal;