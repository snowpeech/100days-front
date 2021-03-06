import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'

import ApiHelper from './helpers/ApiHelper';
import mergeDay from './helpers/mergeDay'
import NoGoal from './NoGoal';
import Profile from './Profile';
import PostItem from './PostItem';
import './styles/Dashboard.css';

const dayjs = require('dayjs');

const Dashboard = ()=>{
    const goalId = localStorage.getItem("_goalId");
    const startDay = localStorage.getItem("_startDay");

    let dayDiff;
        if(startDay){
            dayDiff =  dayjs().diff(startDay,'day');
        }    
    
    const [recentPosts, setRecentPosts] = useState([]);
    const [tenPost, setTenPost] = useState();
    
    useEffect(()=>{
        async function getRecentPosts(goalId){
            const posts = await ApiHelper.getRecentPosts(goalId);
            console.log("Recent Posts",posts)
            const dayPosts = mergeDay(posts.posts.am,posts.posts.pm)
            console.log("dayPosts",dayPosts,"TEN", posts.posts.tendays[0])
            setRecentPosts(dayPosts)
            setTenPost(posts.posts.tendays[0])
        }

    getRecentPosts(goalId);

    },[goalId])

return(<Container>
            {isNaN(dayDiff) ? "" : <ProgressBar className= "mb-3" variant="info" now={dayDiff} label={`${dayDiff}/100 days`}/> }
    <Row>
        <Col xs={12} md={3} className='r-border'>
            <Profile/>    
        </Col>
        <Col xs={12} md={9}>
            <h2>Recent Posts</h2>

            {tenPost &&  <h5 className="mt-3">Current Microgoal:{tenPost.microgoal}</h5>}
            
            {isNaN(dayDiff) &&<NoGoal /> }
            {recentPosts ? 
                recentPosts.map(day=><PostItem day={day} key={day.day}/>) 
                
                : <div> No  posts yet</div>}
        </Col>
    </Row>
</Container>)
}

export default Dashboard;