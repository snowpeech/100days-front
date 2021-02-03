import React,{useEffect, useState} from 'react';
import ApiHelper from './helpers/ApiHelper';

const TenMetrics = ({goalId, day})=>{

    const [metrics, setMetrics] = useState([]);

    useEffect(()=>{
        async function getMetrics(){
            let res = await ApiHelper.getMetrics(goalId, day);
            console.log("GET METRICS RES",res, "RES METRICS", res.metrics)
            //setMetrics(res.metrics)
        }
        getMetrics()
    })
    // useEffect for PM Metrics :) implement later with Nivo...

    return (<div>   
        <h2>The past 10 days:</h2>
    </div>)
}

export default TenMetrics;
