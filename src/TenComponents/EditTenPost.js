import React,{useState} from 'react';
import useFields from "../hooks/useFields";
import ApiHelper from '../helpers/ApiHelper'
import '../styles/EditPost.css';

const EditTenPost = ({postInfo, edit, goalId, dayNum, closeTenModal, setPostInfo})=>{ //not bringing in day/getting it passed down
    //set up the form

    const [tenFormData, setTenFormData, resetTenFormData] = useFields(postInfo);
    const [checkbox, setCheckbox] = useState(postInfo.accomplished)
    const handleCheckbox=()=>{
        setCheckbox(!checkbox)
    }
    console.log("INCOMING TEN", postInfo, dayNum) //incoming Ten includes day & goal_id
    console.log("tenForm edit things", tenFormData, "checkbox",checkbox)


    const handleTenSubmit = async (evt)=>{
        evt.preventDefault();
        // const {goal_id, day, accomplished, win1, win2, win3, win_plan1, win_plan2, win_plan3, bad1, bad2, bad3, solution1, solution2, solution3, microgoal} = tenFormData; //formData may have additional fields from other posttypes from API
        if(edit){
            //get variables from passed in post 
            //create postObj with desired variables
            tenFormData.accomplished=checkbox;
            console.log("TEN POST EDIT", tenFormData, "GOAL ID",+postInfo.goal_id, "PASSED IN?", goalId)

            const {goal_id, day, ...postingTen} = tenFormData;
            await ApiHelper.editPost(goalId, dayNum, "tendays",postingTen);
          
            setPostInfo(postingTen)
            closeTenModal();
        } else {
            // console.log("TEN POST SUBMIT II", tenFormData, "GO_ID & D",goalId, day)
            //use checkbox for accomplished
            tenFormData.accomplished=checkbox;
            console.log("tenformdata.accomplished?", tenFormData)
            const {goal_id, day, ...postingTen} = tenFormData;
            await ApiHelper.createPost(goalId, dayNum, "tendays",postingTen);
            
            setPostInfo(tenFormData);
        }
            
        resetTenFormData();
    }

    return (<div  className="edit-post-form">
        <h3>Ten Day Review</h3>
        <form onSubmit={handleTenSubmit} className="border-box">
            <div>
                <label for="yes">I accomplished my microgoal
                </label>
                    <input type="checkbox" id="yes" name="accomplished" value={tenFormData.accomplished} 
                        onChange = {handleCheckbox}
                        checked={checkbox} />
            </div>
            <div>
                <div className="input-label">These things worked well over the last 10 days:</div>
                <input 
                    type="text"
                    name = "win1"
                    placeholder="1."
                    value ={tenFormData.win1}
                    onChange = {setTenFormData}
                    required
                />
                <input 
                    type="text"
                    name = "win2"
                    placeholder="2."
                    value ={tenFormData.win2}
                    onChange = {setTenFormData}
                />
                <input 
                    type="text"
                    name = "win3"
                    placeholder="3."
                    value ={tenFormData.win3}
                    onChange = {setTenFormData}
                />
            </div>
            <div className="input-label">To address those struggles, I plan to do these things:</div>
            <div>
                <input 
                    type="text"
                    name = "win_plan1"
                    placeholder="1."
                    value ={tenFormData.win_plan1}
                    onChange = {setTenFormData}
                    required
                />
                <input 
                    type="text"
                    name = "win_plan2"
                    placeholder="2."
                    value ={tenFormData.win_plan2}
                    onChange = {setTenFormData}
                />
                <input 
                    type="text"
                    name = "win_plan3"
                    placeholder="3."
                    value ={tenFormData.win_plan3}
                    onChange = {setTenFormData}
                />    
            </div>        

            <div className="input-label">I had a hard time with these three things:</div>
            <div>
                <input 
                    type="text"
                    name = "bad1"
                    placeholder="1."
                    value ={tenFormData.bad1}
                    onChange = {setTenFormData}
                    required
                />
                <input 
                    type="text"
                    name = "bad2"
                    placeholder="2."
                    value ={tenFormData.bad2}
                    onChange = {setTenFormData}
                />
                <input 
                    type="text"
                    name = "bad3"
                    placeholder="3."
                    value ={tenFormData.bad3}
                    onChange = {setTenFormData}
                />
            </div>
            <div className="input-label">To address those struggles, I plan to do these things:</div>
            <div>
                <input 
                    type="text"
                    name = "solution1"
                    placeholder="1."
                    value ={tenFormData.solution1}
                    onChange = {setTenFormData}
                    required
                />
                <input 
                    type="text"
                    name = "solution2"
                    placeholder="2."
                    value ={tenFormData.solution2}
                    onChange = {setTenFormData}
                />
                <input 
                    type="text"
                    name = "solution3"
                    placeholder="3."
                    value ={tenFormData.solution3}
                    onChange = {setTenFormData}
                />    
            </div>        
            <div>
                <label htmlFor="reflect">My next 10-day microgoal:</label>
                <input 
                    type="text"
                    name = "microgoal"
                    value ={tenFormData.microgoal}
                    onChange = {setTenFormData}
                    required
                />
            </div>
            <button className="edit-btn">Committed</button>
        </form>

    </div>)
}

export default EditTenPost;
