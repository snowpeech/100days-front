import React from 'react';
import useFields from "./hooks/useFields";
import ApiHelper from './ApiHelper';
import './styles/EditTenPost.css'
// import { Form } from 'formik';
// import { useFormikContext, Formik, Form, Field } from 'formik';

const EditTenPost = ({postInfo, edit, goalId, closeTenModal, setPostInfo})=>{ //not bringing in day/getting it passed down
    console.log("INCOMING POST INFO TEN:", postInfo)
    // const {accomplished, win1, win2, win3, win_plan1, win_plan2, win_plan3, bad1, bad2, bad3, solution1, solution2, solution3, microgoal}
    //remove unwanted variables. Or just destructure from post[ten]
    // const {gratitude_am, big_goal, task1, task2, task3, goal_id, day, ...pmPost} = postInfo.ten
    //set up the form
    const [tenFormData, setTenFormData, resetTenFormData] = useFields(postInfo.ten);

    const handleTenSubmit = async (evt)=>{
        evt.preventDefault();
        if(edit){
            //get variables from passed in post 
            const {goal_id, day, accomplished, win1, win2, win3, win_plan1, win_plan2, win_plan3, bad1, bad2, bad3, solution1, solution2, solution3, microgoal} = tenFormData; //formData may have additional fields from other posttypes from API
            //create postObj with desired variables
          
            const postObj = {goal_id, day, accomplished, win1, win2, win3, win_plan1, win_plan2, win_plan3, bad1, bad2, bad3, solution1, solution2, solution3, microgoal};
            console.log("TEN POST EDIT", postObj, "GOAL ID",+postInfo.goal_id, "PASSED IN?", goalId)
            await ApiHelper.editPost(+postInfo.goal_id, day, "tendays",postObj);
          
            // pass state up to parent so it updates..
            // postInfo= {...postInfo, gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day}
            // console.log("New post info", postInfo);
            //!!!!!!CHECK THIS!!
            //use remaining postINfo and add new variables...  setPostInfo(existingPost =>{...existPost, post["ten"]:postObj})
            // setPostInfo({...postInfo, gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day});
            // setPostInfo(postInfo =>{...postInfo, "ten":postObj})
            postInfo= {...postInfo,ten:tenFormData};
            console.log("TRY THIS:",postInfo)
            setPostInfo(postInfo)
            closeTenModal();
        } else {
            // console.log("TEN POST SUBMIT II", tenFormData, "GO_ID & D",goalId, day)
            // await ApiHelper.createPost(goalId, day, "tendays",tenFormData);
            // //issue if we're sending null objects! iterate through and replace?
            // postInfo= {...postInfo,ten:tenFormData};
            // // postInfo= {...postInfo,...tenFormData};
            // console.log("New post info", postInfo);
            
            setPostInfo(postInfo);
        }
            
        resetTenFormData();
    }

    return (<div>
        <h3>Ten Day Review</h3>
        <form onSubmit={handleTenSubmit} className="border-box">
            <div className="input-label">
                <p>Did I accomplish my microgoal? {tenFormData.accomplished}</p>
                <div>
                    <label for="yes">Yes
                        <input type="radio" id="yes" name="accomplished" value={true} 
                            onChange = {setTenFormData}
                            checked={tenFormData.accomplished === true} />
                    </label>
                </div>
                <div>
                    <label for="no"> No
                        <input type="radio" id="no" name="accomplished" value={false} 
                            onChange = {setTenFormData}
                            checked={tenFormData.accomplished === false} />                        
                    </label>
                </div>
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
            <div>To address those struggles, I plan to do these things:</div>
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

            <div>I had a hard time with these three things:</div>
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
            <div>To address those struggles, I plan to do these things:</div>
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
            <button>Committed</button>
        </form>

{/* BOoTS BElow! */}
{/* <Form onSubmit={handleTenSubmit} className="border-box">
            <Form.Group>

                <Form.Label htmlFor="accomplished">I accomplished my last microgoal: </Form.Label>
                <Form.Control 
                    type="text"
                    name = "accomplished"
                    value ={tenFormData.accomplished}
                    onChange = {setTenFormData}
                    required
                    />
            
            </Form.Group>
            <div>
                <div>These things worked well over the last 10 days:</div>
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
            <div>I had a hard time with these three things:</div>
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
            <div>To address those struggles, I plan to do these things:</div>
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
            <button>Committed</button>
        </Form> */}

    </div>)
}

export default EditTenPost;
