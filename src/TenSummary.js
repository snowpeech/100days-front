import React,{useEffect,useState} from 'react';
import TenMetrics from './TenMetrics';
import {Link, useParams} from 'react-router-dom'
import ApiHelper from './helpers/ApiHelper';
import EditTenPost from './EditTenPost';
import TenPost from './TenPost';
import NoGoal from './NoGoal';
import BrokenLink from './BrokenLink'
import './styles/Today.css'

const dayjs = require('dayjs');

const TenSummary = ()=>{
    const goalId = localStorage.getItem("_goalId");
    const start_day = localStorage.getItem("_startDay")
    const { day } = useParams();
    const roundDay = Math.ceil(+day / 10) * 10; //round up to nearest 10. 
    console.log("ROUNDDAY",roundDay, "DAY",day)
    const blankTen = {accomplished:"", win1:"", win2:"", win3:"", win_plan1:"", win_plan2:"", win_plan3:"", bad1:"", bad2:"", bad3:"", solution1:"", solution2:"", solution3:"", microgoal:"" }
    //needs goalId and day for metrics

    let curTenDay = dayjs(start_day).add(+roundDay, 'day').format('MMMM D, YYYY') 
    let prevTenDay = dayjs(start_day).add((+roundDay-10), 'day').format('MMMM D') 

    const [tenPost,setTenPost]= useState({})
    
    useEffect(()=>{
        if(goalId && day){
            console.log("TEN USEEFFECT G & rounddays", goalId, roundDay)
            fetchPost();
        }
        
        async function fetchPost(){
            const res = await ApiHelper.getTenDay(goalId, roundDay-10)
            console.log("tenSumm RES USEFFECT fetchPOSTS ", res) 
            setTenPost(res) //could be blank, need to check not goalid or day to get info
        }
    },[day, goalId])
    
    const regex = new RegExp('^[0-9]*$')

    if(!regex.test(day) || +day >100 || +day < 0){
        return(<BrokenLink />)   
       }
    if(!goalId){
        return(<NoGoal/>)
    } else{
    return(<>
    <h2>{prevTenDay} - {curTenDay}</h2>        
        <div>
            {roundDay >= 1 ? <Link to={`/ten/${roundDay-10}`} className="day-nav" ><i className="fas fa-chevron-left"></i>Prev 10-Day  </Link> : <div className="inactive">You're at the first day</div>}
            <span>| Day {roundDay} |</span>
            {roundDay< 100 ? <Link to={`/ten/${+roundDay+10}`} className="day-nav"> Next 10-Day <i className="fas fa-chevron-right"></i> </Link> : <div className="inactive">You're at the last day!</div>}
        </div>
        <TenMetrics goalId = {goalId} day={roundDay}/>

        { tenPost ? <TenPost post={tenPost} setPostInfo={setTenPost}/> : <EditTenPost edit={false} postInfo={blankTen} goalId ={goalId} setPostInfo={setTenPost}/> }

    </>)
}
}


export default TenSummary;