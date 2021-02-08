import React from 'react';
import useFields from "./hooks/useFields";
import ApiHelper from './helpers/ApiHelper';
import './styles/EditPost.css'

const EditAmPost = ({postInfo, edit, goalId, closeModal, setPostInfo})=>{
   //remove PM post values to start form 
    const {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day, user_def1, user_def2, user_def3, reflect, goal_id, day, ...amPost} = postInfo;
    const [formData, setFormData, resetFormData] = useFields(amPost);

    console.log("all the edit things",postInfo, edit, goalId, day)
    const handleAmSubmit = async (evt)=>{
        evt.preventDefault();
        if(edit){
            const {gratitude_am, big_goal, task1, task2, task3} = formData; //formData may have additional fields from other posttypes from API
            const postObj = {gratitude_am, big_goal, task1, task2, task3}; //removing goal_id and day from postObj?
            
            await ApiHelper.editPost(+postInfo.goal_id, day, "am", postObj);
        
            setPostInfo({...postInfo, goalId, day, gratitude_am, big_goal, task1, task2, task3});
            closeModal();
        } else {
            await ApiHelper.createPost(goalId, day, "am",formData);
            postInfo= {...postInfo,...formData};
            setPostInfo(postInfo)
        }
            
        resetFormData();
    }

    return (<div className="edit-post-form">
        <form onSubmit={handleAmSubmit} className="border-boxx">
            <div className="input-label">
                <label htmlFor="gratitude_am">Today, I am grateful for: </label>
                <input 
                    type="text"
                    name = "gratitude_am"
                    value ={formData.gratitude_am}
                    onChange = {setFormData}
                    required
                />
            </div>
            <div className="input-label">
                <label htmlFor="big_goal">My 100-day goal is: </label>
                <input 
                    type="text"
                    name = "big_goal"
                    value ={formData.big_goal}
                    onChange = {setFormData}
                    required
                />
            </div>
            <div className="input-label">By completing these tasks, I will be closer to my goal:</div>
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
            <button className="submit-btn">  <i className="fas fa-check"></i> </button>
        </form>
    </div>)
}

export default EditAmPost;
