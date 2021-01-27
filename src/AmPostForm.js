// import React,{useContext} from 'react';
// import {useHistory, userParams} from 'react-router-dom';
// import useFields from "./hooks/useFields";
// import UserContext from "./UserContext"
// import ApiHelper from './ApiHelper';
// const dayjs = require('dayjs');
// // import {useDispatch} from 'react-redux';
// //import stuff from an actionCreator?


// //import posttype from parameters?
// const AmPostForm = ()=>{
//     // const dispatch = userDispatch();
//     const {storedUser} = useContext(UserContext);
//     console.log("AM POST STOREDUSER", storedUser)
//     const history = useHistory();

//     let INITIAL_STATE = {gratitude_am:"",     big_goal:"",     task1:"",     task2:"",    task3:""}//a bunch of text?
//     const [formData, setFormData, resetFormData] = useFields(INITIAL_STATE);

//     const handleSubmit = async (evt)=>{
//         evt.preventDefault();
//         let response = await ApiHelper.createAmPost(storedUser["goals"][0], dayDiff, formData) // <<this one
//         resetFormData();
//         //ideally on submit, it would come back to this page with everything all filled out and pretty.
//     }

//     const startDay = dayjs(storedUser["start_days"][0])
//     console.log("GOAL ONE", dayjs().diff(startDay,'day'))
//     const dayDiff =  dayjs().diff(startDay,'day')
//     return (<div>
//         <h2>Today is a good day</h2>
//         <form onSubmit={handleSubmit} className="border-box">
//             <div>
//                 <label htmlFor="gratitude_am">Today, I am grateful for: </label>
//                 <input 
//                     type="text"
//                     name = "gratitude_am"
//                     value ={formData.gratitude_am}
//                     onChange = {setFormData}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="big_goal">My 100-day goal is: </label>
//                 <input 
//                     type="text"
//                     name = "big_goal"
//                     value ={formData.big_goal}
//                     onChange = {setFormData}
//                 />
//             </div>
//             <div>By completing these tasks, I will be closer to my goal:</div>
//             <div>
//                 <input 
//                     type="text"
//                     name = "task1"
//                     placeholder="1."
//                     value ={formData.task1}
//                     onChange = {setFormData}
//                 />
//             </div>
//             <div>
//                 <input 
//                     type="text"
//                     name = "task2"
//                     placeholder="2."
//                     value ={formData.task2}
//                     onChange = {setFormData}
//                 />
//             </div>
//             <div>
//                 <input 
//                     type="text"
//                     name = "task3"
//                     placeholder="3."
//                     value ={formData.task3}
//                     onChange = {setFormData}
//                 />
//             </div>
//             <button>Sieze this day!</button>
//         </form>
//     </div>)
// }

// export default AmPostForm;

// // const AMPrompts = {
// //     // goal_id,day, 
// //     gratitude_am:"Today, I am grateful for:", 
// //     big_goal:"My 100-day goal is:", 
// //     task1, 
// //     task2,
// //     task3
// // }