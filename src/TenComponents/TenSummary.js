import React,{useEffect,useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import ApiHelper from '../helpers/ApiHelper';
import EditTenPost from './EditTenPost';
import TenMetrics from './TenMetrics';
import TenPost from './TenPost';
import NoGoal from '../NoGoal';
import BrokenLink from '../BrokenLink'
import '../styles/Today.css'

const dayjs = require('dayjs');

const TenSummary = ()=>{
    const goalId = localStorage.getItem("_goalId");
    const start_day = localStorage.getItem("_startDay") //used to get displayed date range
    const { day } = useParams(); //only used to get roundDay
    const roundDay = Math.ceil(+day / 10) * 10; //round up to nearest 10. 
    
    const blankTen = {accomplished:"", win1:"", win2:"", win3:"", win_plan1:"", win_plan2:"", win_plan3:"", bad1:"", bad2:"", bad3:"", solution1:"", solution2:"", solution3:"", microgoal:"" }
    
    let prevTenDay = dayjs(start_day).add((+roundDay-10), 'day').format('MMMM D') 
    let curTenDay = dayjs(start_day).add(+roundDay, 'day').format('MMMM D, YYYY') 
    
    const [tenPost,setTenPost]= useState({})
    //tenPost should be empty when params changes
    console.log("IS there tenPost?",tenPost)

    // if(tenPost.day < day){
    //     tenPost.day = day;
    // }

    useEffect(()=>{

        if(goalId && roundDay){
            console.log("TEN USEEFFECT G & rounddays", goalId, roundDay)
            fetchPost();
            console.log("AFTER fetchPost")
        }
        
        async function fetchPost(){
            //FYI transformMetrics needs goalId and startDay, aka Roundday -10
            console.log('THIS IS FETCHpOST@@@@@@@@@@@@@@@@@@@')
            const res = await ApiHelper.getTenDay(goalId, roundDay)
            console.log("TENSUMM fetchPOSTS ", res) 
            // if(res.data.error ){
            //     res = blankTen
            // }
            setTenPost(res) //could be blank, need to check not goalid or day to get info
        }
    },[day, goalId, roundDay])

    if(isNaN(roundDay) || roundDay >100 || roundDay < 0){
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
        {roundDay >0 && <TenMetrics goalId = {goalId} day={roundDay}/>}

        { tenPost.win1 ? <TenPost post={tenPost} setPostInfo={setTenPost} goalId = {goalId} day ={roundDay} blankTen={blankTen}/> : <EditTenPost edit={false} postInfo={blankTen} goalId ={goalId} dayNum ={roundDay} setPostInfo={setTenPost}/> }

    </>)
}
}


export default TenSummary;