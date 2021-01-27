import React,{useEffect,useState, useContext} from 'react';
import {useParams} from 'react-router-dom'
import UserContext from "./UserContext"
import AmPostForm from './AmPostForm';
import AmPost from './AmPost'
import EditAmPost from './EditAmPost'
import ApiHelper from './ApiHelper';
const dayjs = require('dayjs');

const Today = ({goalId})=>{
    let { day } = useParams();

    const curDay = new dayjs().format('MMMM D, YYYY')
    //if today has posted info, then show it, else. show form
    const [postInfo, setPostInfo] = useState({});

    const blankAm = {gratitude_am:"", big_goal:"", task1:"", task2:"", task3:""}

    useEffect(()=>{
        async function fetchPosts(){

            const res = await ApiHelper.getDayPosts(goalId, day)
            console.log("RES USEFFECT TODAY",res) 
            setPostInfo(res) //could be blank, need to check not goalid or day to get info
        }
        
        fetchPosts();
    },[day])

    return(<>
    <h1>{curDay}</h1>
    { postInfo["gratitude_am"] || postInfo["ten"] ? <AmPost post={postInfo} setPostInfo={setPostInfo}/> : <EditAmPost edit={false} postInfo={blankAm} goalId ={goalId} day={day}/> }
    {/* { postInfo ? <AmPost post={postInfo}/> : <AmPostForm edit={false} goalId ={goalId} day={day}/> } */}
    </>)
}

export default Today;