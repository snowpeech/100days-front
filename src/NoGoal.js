import React from "react";
import {Link} from 'react-router-dom'

const NoGoal =()=>{
    return(<div>No goal started? Let's fix that --> <Link to="/goals">Create a new goal</Link></div>)
}

export default NoGoal;
