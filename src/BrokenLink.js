import React from "react";
import {Link} from 'react-router-dom'

const BrokenLink =()=>{
    return(<>
    <h1>Oops.</h1>
    <div> Nothing to see here. Let's get back <Link to="/profile">home</Link></div>
</>)}

export default BrokenLink;
