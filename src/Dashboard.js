import React, { useEffect, useState } from 'react';
import ApiHelper from './helpers/ApiHelper';
import NoGoal from './NoGoal';
import Profile from './Profile';
import './styles/Dashboard.css';
import mergeDay from './helpers/mergeDay'
import PostItem from './PostItem';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Dashboard = ()=>{
    const goalId = localStorage.getItem("_goalId")
    const [recentPosts, setRecentPosts] = useState([]);
    
    useEffect(()=>{
        async function getRecentPosts(goalId){
            const posts = await ApiHelper.getRecentPosts(goalId);
            console.log("Recent Posts",posts)
            const dayPosts = mergeDay(posts.posts.am,posts.posts.pm)
            setRecentPosts(dayPosts)
        }
    getRecentPosts(goalId);

    },[goalId])

return(<Container>
    <Row>
        <Col xs={12} m={3}>
            <Profile/>    
        </Col>
        <Col xs={12} m={9}>
            <h2>Recent Posts</h2>
            {!goalId ? <NoGoal /> :""}
            {recentPosts ? 
                recentPosts.map(day=><PostItem day={day} key={day.day}/>) 
                
                : <div> No  posts yet</div>}
        </Col>
    </Row>
</Container>)
}

export default Dashboard;