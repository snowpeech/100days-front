import React,{useEffect,useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import AmPost from './AmPost'
import PmPost from './PmPost'
import EditAmPost from './EditAmPost'
import EditPmPost from './EditPmPost'
import ApiHelper from './helpers/ApiHelper';
import './styles/Today.css'
import NoGoal from './NoGoal';
import EditTenPost from './EditTenPost';
import TenPost from './TenPost';
import BrokenLink from './BrokenLink'

const dayjs = require('dayjs');

const Today = ()=>{
    // const {goalId,start_day} = useContext(UserContext); //not sure why this works on refresh?? I'm not exporting the values...
    const goalId = localStorage.getItem("_goalId");
    const start_day = localStorage.getItem("_startDay")
    let { day } = useParams();

    const regex = new RegExp('^[0-9]*$')
    
    
    //change curday to startday + day from params using dayjs
    let curDay = dayjs(start_day).add(+day, 'day').format('MMMM D, YYYY') 
    
    //if today has posted info, then show it, else. show form
    const [postInfo, setPostInfo] = useState({});
    
    const [isAm, setIsAm] = useState(dayjs().hour() < 13); //is a Bool

    const blankAm = {gratitude_am:"", big_goal:"", task1:"", task2:"", task3:""}
    const blankPm = {gratitude_pm:"",  obstacle1:"", obstacle2:"", obstacle3:"", solution1:"", solution2:"", solution3:"", discipline:"", overall_day:"", reflect:""}
    const blankTen = {accomplished:"", win1:"", win2:"", win3:"", win_plan1:"", win_plan2:"", win_plan3:"", bad1:"", bad2:"", bad3:"", solution1:"", solution2:"", solution3:"", microgoal:"" }
    
    useEffect(()=>{
        if(goalId){
            console.log("TODAY USEEFFECT", goalId)
            fetchPosts();
        }

        async function fetchPosts(){
            const res = await ApiHelper.getDayPosts(goalId, day)
            console.log("TODAYJS RES USEFFECT fetchPOSTS ", res) 
            setPostInfo(res) //could be blank, need to check not goalid or day to get info
        }
    },[day, goalId])
    if(!regex.test(day) || +day >100 || +day < 0){
        return(<BrokenLink />)   
       }
    if(!goalId){
        return(<NoGoal/>)
    } else{
        return(<>
        <h2>{curDay}</h2>
        <h4>Today is a good day</h4>
        <div>
            {day >= 1 ? <Link to={`/journal/${day-1}`} ><i className="fas fa-chevron-left"></i>Prev Day  </Link> : <div className="inactive">You're at the first day</div>}
            <span>| Day {day} |</span>
            {day < 100 ? <Link to={`/journal/${+day+1}`} > Next Day <i className="fas fa-chevron-right"></i> </Link> : <div className="inactive">You're at the last day!</div>}
        </div>
        
        { postInfo["gratitude_am"]  ? <AmPost post={postInfo} setPostInfo={setPostInfo}/> : <EditAmPost edit={false} postInfo={{...postInfo, ...blankAm}} goalId ={goalId}  setPostInfo={setPostInfo}/> }
        
        { postInfo["gratitude_pm"]  ? <PmPost post={postInfo} setPostInfo={setPostInfo}/> : <EditPmPost edit={false} postInfo={{...postInfo, ...blankPm}} goalId ={goalId} setPostInfo={setPostInfo}/> }
        
        { (+day%10 === 0 && +day !==0) && postInfo["ten"] ? <TenPost post={postInfo} setPostInfo={setPostInfo}/> : ""}
        
        {(+day%10 === 0 && +day !==0) && !postInfo["ten"] ? <EditTenPost edit={false} postInfo={{...postInfo, ten:blankTen}} goalId ={goalId} setPostInfo={setPostInfo}/> :"" }
        
        </>)
    }
}

export default Today;