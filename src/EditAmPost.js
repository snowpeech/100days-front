import React from 'react';
import useFields from "./hooks/useFields";
import ApiHelper from './ApiHelper';

const EditAmPost = ({postInfo, edit, goalId, day, closeModal, setPostInfo})=>{

    const [formData, setFormData, resetFormData] = useFields(postInfo);

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        if(edit){
            const {gratitude_am, big_goal, task1, task2, task3} = formData; //formData may have additional fields from other posttypes from API
            const postObj = {gratitude_am, big_goal, task1, task2, task3};
            console.log("AM POST EDIT", postObj, "GO ID",+postInfo.goal_id)
            await ApiHelper.editAmPost(+postInfo.goal_id, day, postObj);
            // pass state up to parent so it updates..
            setPostInfo(postObj);

            closeModal();
        } else {
            console.log("AM POST SUBMIT", formData, "GO_ID & D",goalId, day)
            await ApiHelper.createAmPost(goalId, day, formData);
            setPostInfo(formData)
        }
            
        resetFormData();
        //ideally on submit, it would come back to this page with everything all filled out and pretty.
    }
    // const {gratitude_am, big_goal, task1, task2, task3} = formData;
    // for(let key in INITIAL_STATE){
    //     if(INITIAL_STATE[key] == null){
    //         INITIAL_STATE[key] = ""
    //     } 
    //     if(key==='start_day'){
    //         INITIAL_STATE.start_day = INITIAL_STATE.start_day.split('T')[0] 
    //     }
    // }
    // const startDay = dayjs(storedUser["start_days"][0])
    // console.log("GOAL ONE", dayjs().diff(startDay,'day'))
    // const dayDiff =  dayjs().diff(startDay,'day')
    return (<div>
        <h2>Today is a good day</h2>
        <form onSubmit={handleSubmit} className="border-box">
            <div>
                <label htmlFor="gratitude_am">Today, I am grateful for: </label>
                <input 
                    type="text"
                    name = "gratitude_am"
                    value ={formData.gratitude_am}
                    onChange = {setFormData}
                />
            </div>
            <div>
                <label htmlFor="big_goal">My 100-day goal is: </label>
                <input 
                    type="text"
                    name = "big_goal"
                    value ={formData.big_goal}
                    onChange = {setFormData}
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
