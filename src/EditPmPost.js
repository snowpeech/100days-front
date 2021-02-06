import React from 'react';
import useFields from "./hooks/useFields";
import ApiHelper from './helpers/ApiHelper';
import './styles/EditPost.css'

const EditPmPost = ({postInfo, edit, goalId, closePmModal, setPostInfo})=>{ //not bringing in day/getting it passed down
    const {gratitude_am, big_goal, task1, task2, task3, goal_id, day, ...pmPost} = postInfo // remove AM vars from form.

    const [pmFormData, setPmFormData, resetPmFormData] = useFields(pmPost);

    const handlePmSubmit = async (evt)=>{
        evt.preventDefault();
        if(edit){
            const {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day} = pmFormData; //formData may have additional fields from other posttypes from API
            const postObj = {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline:parseInt(discipline), overall_day:parseInt(overall_day)};
            
            await ApiHelper.editPost(+postInfo.goal_id, day, "pm",postObj);
            setPostInfo({...postInfo, gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day});

            closePmModal();
        } else {
            pmFormData.discipline = +pmFormData.discipline;
            pmFormData.overall_day= +pmFormData.overall_day;
            await ApiHelper.createPost(goalId, day, "pm",pmFormData);
            postInfo= {...postInfo,...pmFormData};
            setPostInfo(postInfo);
        }
            
        resetPmFormData();
    }

    return (<div  className="edit-post-form" >
        <h3>PM</h3>
        <form onSubmit={handlePmSubmit} className="border-boxx">
            <div className="input-label">
                <label htmlFor="gratitude_pm">I am glad this happened: </label>
                <input 
                    type="text"
                    name = "gratitude_pm"
                    value ={pmFormData.gratitude_pm}
                    onChange = {setPmFormData}
                    required
                />
            </div>
            <div className="input-label">
                <div>I had these struggles:</div>
                <input 
                    type="text"
                    name = "obstacle1"
                    placeholder="1."
                    value ={pmFormData.obstacle1}
                    onChange = {setPmFormData}
                    required
                />
                <input 
                    type="text"
                    name = "obstacle2"
                    placeholder="2."
                    value ={pmFormData.obstacle2}
                    onChange = {setPmFormData}
                />
                <input 
                    type="text"
                    name = "obstacle3"
                    placeholder="3."
                    value ={pmFormData.obstacle3}
                    onChange = {setPmFormData}
                />
            </div>
            <div className="input-label">To counter those struggles, I will try these solutions:</div>
            <div>
                <input 
                    type="text"
                    name = "solution1"
                    placeholder="1."
                    value ={pmFormData.solution1}
                    onChange = {setPmFormData}
                    required
                />
            </div>
            <div>
                <input 
                    type="text"
                    name = "solution2"
                    placeholder="2."
                    value ={pmFormData.solution2}
                    onChange = {setPmFormData}
                />
            </div>
            <div>
                <input 
                    type="text"
                    name = "solution3"
                    placeholder="3."
                    value ={pmFormData.solution3}
                    onChange = {setPmFormData}
                />
            </div>
            <div className="input-label">
                <label htmlFor="discipline">Overall, I'd rate my discipline for today as </label>
                <input 
                    type="range"
                    name = "discipline"
                    value ={pmFormData.discipline}
                    onChange = {setPmFormData}
                    min="0" max="10"
                    required
                />
                <span> {pmFormData.discipline}</span>
            </div>
            <div className="input-label">
                <label htmlFor="overall_day">Overall, I'd rate my day as a </label>
                <input 
                    type="range"
                    name = "overall_day"
                    value ={pmFormData.overall_day}
                    onChange = {setPmFormData}
                    min="0" max="10"
                    required
                /> 
                <span> {pmFormData.overall_day} </span>
            </div>
            
            <div className="input-label">
                <label htmlFor="reflect">Final thought(s) for the day:</label>
                <textarea 
                    // type="text"
                    name = "reflect"
                    value ={pmFormData.reflect}
                    onChange = {setPmFormData}
                    cols={50}
                    rows={6}
                    required
                />
            </div>
            <button className="submit-btn">Onward  <i className="fas fa-check"></i> </button>
        </form>
    </div>)
}

export default EditPmPost;
