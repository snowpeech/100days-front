import React from 'react';
import useFields from "./hooks/useFields";
import ApiHelper from './ApiHelper';
import Button from 'react-bootstrap/Button'

const EditAmPost = ({postInfo, edit, goalId, closeModal, setPostInfo})=>{
    const {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day, user_def1, user_def2, user_def3, reflect, goal_id, day, ...amPost} = postInfo;
   
    const [formData, setFormData, resetFormData] = useFields(amPost);

    console.log("all the edit things",postInfo, edit, goalId, day)
    const handleAmSubmit = async (evt)=>{
        evt.preventDefault();
        if(edit){
            const {gratitude_am, big_goal, task1, task2, task3} = formData; //formData may have additional fields from other posttypes from API
            const postObj = {gratitude_am, big_goal, task1, task2, task3}; //removing goal_id and day from postObj?
            console.log("AM POST EDIT", postObj, "GOAL ID",+postInfo.goal_id, "PASSED IN?", goalId)
            // console.log("DAY DIFF", dayDiff, "DAY", day)
            await ApiHelper.editPost(+postInfo.goal_id, day, "am", postObj);
            // pass state up to parent so it updates..
            setPostInfo({...postInfo, goalId, day, gratitude_am, big_goal, task1, task2, task3});

            closeModal();
        } else {
            console.log("AM POST SUBMIT", formData, "GO_ID & D",goalId, day)
            await ApiHelper.createPost(goalId, day, "am",formData);
            postInfo= {...postInfo,...formData};
            console.log("New post info", postInfo);
            // console.log("DAY DIFF", dayDiff, "DAY", day)
            setPostInfo(postInfo)
        }
            
        resetFormData();
    }

    return (<div>
        <form onSubmit={handleAmSubmit} className="border-box">
            <div>
                <label htmlFor="gratitude_am">Today, I am grateful for: </label>
                <input 
                    type="text"
                    name = "gratitude_am"
                    value ={formData.gratitude_am}
                    onChange = {setFormData}
                    required
                />
            </div>
            <div>
                <label htmlFor="big_goal">My 100-day goal is: </label>
                <input 
                    type="text"
                    name = "big_goal"
                    value ={formData.big_goal}
                    onChange = {setFormData}
                    required
                />
            </div>
            <div>By completing these tasks, I will be closer to my goal:</div>
            <div>
                <input 
                    type="text"
                    name = "task1"
                    placeholder="1."
                    value ={formData.task1}
                    onChange = {setFormData}
                    required
                />
            </div>
            <div>
                <input 
                    type="text"
                    name = "task2"
                    placeholder="2."
                    value ={formData.task2}
                    onChange = {setFormData}
                />
            </div>
            <div>
                <input 
                    type="text"
                    name = "task3"
                    placeholder="3."
                    value ={formData.task3}
                    onChange = {setFormData}
                />
            </div>
            <button>Sieze this day!</button>
        </form>
    </div>)
}

export default EditAmPost;
