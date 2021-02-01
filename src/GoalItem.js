import React,{useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFields from "./hooks/useFields"
import ApiHelper from './ApiHelper';
import UserContext from "./UserContext";

const GoalItem = ({goalObj, setUserGoals, userGoals}) =>{
    const {setToken, setGoalId} = useContext(UserContext)

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleClick =()=>{
        setShowEdit(!showEdit)
    }
    const handleModalClose = () => {
        setShowDelete(false);
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
        let newUserGoals = userGoals.filter(g => g.goal_id !== goalObj.goal_id )
        console.log("NEW USERGOALS after delete", newUserGoals)
        setUserGoals(newUserGoals);
        setToken(res._token);
        localStorage.removeItem('_goalId');
        localStorage.removeItem('_startDay');
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

        <Button onClick={()=>setShowDelete(true)} variant="danger" >Delete Goal</Button>

        {showEdit ? editGoalForm : ""}

        {/* Modal for confirm delete */}
        <Modal show={showDelete} onHide={handleModalClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this goal?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Once you've deleted a goal, all the associated posts with it are gone. Forever.
            <Button onClick={deleteGoal} variant="danger">Delete Goal</Button>
            <Button>Keep Goal</Button>
        </Modal.Body>
      </Modal>

    </div>
    
    </>)
}


export default GoalItem;