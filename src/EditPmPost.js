import React from 'react';
import useFields from "./hooks/useFields";
import ApiHelper from './helpers/ApiHelper';
import Button from 'react-bootstrap/Button'

const EditPmPost = ({postInfo, edit, goalId, closePmModal, setPostInfo})=>{ //not bringing in day/getting it passed down
    const {gratitude_am, big_goal, task1, task2, task3, goal_id, day, ...pmPost} = postInfo // remove AM vars from form.

    const [pmFormData, setPmFormData, resetPmFormData] = useFields(pmPost);

    const handlePmSubmit = async (evt)=>{
        evt.preventDefault();
        if(edit){
            const {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day} = pmFormData; //formData may have additional fields from other posttypes from API
            const postObj = {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline:parseInt(discipline), overall_day:parseInt(overall_day)};
            console.log("PM POST EDIT", postObj, "GOAL ID",+postInfo.goal_id, "PASSED IN?", goalId)
            await ApiHelper.editPost(+postInfo.goal_id, day, "pm",postObj);
            // pass state up to parent so it updates..
            // postInfo= {...postInfo, gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day}
            // console.log("New post info", postInfo);
            setPostInfo({...postInfo, gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day});

            closePmModal();
        } else {
            console.log("PM POST SUBMIT", pmFormData, "GO_ID & D",goalId, day)
            // pmFormData["discipline"] = parseInt(pmFormData["discipline"])
            pmFormData.discipline = +pmFormData.discipline;
            pmFormData.overall_day= +pmFormData.overall_day;
            
            // for(let key in pmFormData){
            //     if (pmFormData[key]===null){
            //         pmFormData[key]="";
            //     }
            // }
            
            console.log("PM POST SUBMIT II", pmFormData, "GO_ID & D",goalId, day, "DATDIFF", day)
            await ApiHelper.createPost(goalId, day, "pm",pmFormData);
            //issue if we're sending null objects! iterate through and replace?
            postInfo= {...postInfo,...pmFormData};
            console.log("New post info", postInfo);
            setPostInfo(postInfo);
        }
            
        resetPmFormData();
    }

    return (<div  className="edit-post-form" >
        <h3>PM</h3>
        <form onSubmit={handlePmSubmit} className="border-box">
            <div>
                <label htmlFor="gratitude_pm">I am glad this happened: </label>
                <input 
                    type="text"
                    name = "gratitude_pm"
                    value ={pmFormData.gratitude_pm}
                    onChange = {setPmFormData}
                    required
                />
            </div>
            <div>
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
            <div>To counter those struggles, I will try these solutions:</div>
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
            <div>
                <label htmlFor="discipline">Overall, I'd rate my discipline for today as </label>
                <input 
                    type="range"
                    name = "discipline"
                    value ={pmFormData.discipline}
                    onChange = {setPmFormData}
                    min="0" max="10"
                    required
                />
                <span>{pmFormData.discipline}</span>
            </div>
            <div>
                <label htmlFor="overall_day">Overall, I'd rate my day as a </label>
                <input 
                    type="range"
                    name = "overall_day"
                    value ={pmFormData.overall_day}
                    onChange = {setPmFormData}
                    min="0" max="10"
                    required
                /> 
                <span>{pmFormData.overall_day}</span>
            </div>
            
            <div>
                <label htmlFor="reflect">Final thought(s) for the day:</label>
                <input 
                    type="text"
                    name = "reflect"
                    value ={pmFormData.reflect}
                    onChange = {setPmFormData}
                    required
                />
            </div>
            <Button>Onward</Button>
        </form>
    </div>)
}

export default EditPmPost;
