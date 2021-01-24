import React,{useState} from 'react';
import EditGoal from './EditGoal'

const GoalItem = ({goalObj}) =>{
    const [showEdit, setShowEdit] = useState(false);

    const handleClick =()=>{
        setShowEdit(!showEdit)
    }

    return(<>
    <div>
        "{goalObj.goal}" started on {goalObj.start_day.slice(0,10)}

        <button onClick={handleClick}>Edit Goal</button>

        {showEdit ? <EditGoal goalObj={goalObj}/> : ""}
    </div>
    
    </>)
}

export default GoalItem;