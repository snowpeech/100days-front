import React,{useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import useFields from "./hooks/useFields"
import ApiHelper from './ApiHelper';
import UserContext from "./UserContext";

const GoalItem = ({goalObj, setUserGoals, userGoals}) =>{
    const {setToken} = useContext(UserContext)

    const [showEdit, setShowEdit] = useState(false);

    const handleClick =()=>{
        setShowEdit(!showEdit)
    }

    const { goal_id, ...INITIAL_STATE } = goalObj; //remove goal_id from inital state.

    for(let key in INITIAL_STATE){
        if(INITIAL_STATE[key] == null){
            INITIAL_STATE[key] = ""
        } 
        if(key==='start_day'){
            INITIAL_STATE.start_day = INITIAL_STATE.start_day.split('T')[0] 
        }
    }
    
    // const [formData, setFormData] = useFields({goal:goalObj.goal, start_day:goalObj.start_day, user_def1:goalObj.user_def1, user_def2:goalObj.user_def2, user_def3:goalObj.user_def3})
    const [formData, setFormData] = useFields(INITIAL_STATE)
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let res = await ApiHelper.updateGoal(goalObj.goal_id, formData);
        if(res){
            
            let newUserGoals = userGoals.map(g => g.goal_id === goalObj.goal_id ? {...formData, goal_id:goalObj.goal_id} : g)
            setUserGoals(newUserGoals);
            setShowEdit(!showEdit);
        }
    }

    const deleteGoal =async ()=>{
        let res = await ApiHelper.deleteGoal(goal_id)
        let newUserGoals = userGoals.map(g => g.goal_id === goalObj.goal_id ? "" : g)
        setUserGoals(newUserGoals);
        setToken(res._token)
    }

    const editGoalForm = <form onSubmit = {handleSubmit} className="border-box">
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

    return(<>
    <div>
        "{goalObj.goal}" started on {goalObj.start_day.slice(0,10)}

        <Button onClick={handleClick} variant="secondary" >Edit Goal</Button>

        <Button onClick={deleteGoal} variant="danger" >Delete Goal</Button>

        {showEdit ? editGoalForm : ""}
    </div>
    
    </>)
}


export default GoalItem;