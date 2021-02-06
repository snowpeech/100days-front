import React,{useEffect, useState} from 'react';
import ApiHelper from './helpers/ApiHelper';
import LineGraph from './LineGraph'
import transformMetrics from './helpers/transformMetrics';

const TenMetrics = ({goalId, day})=>{
    //day is passed in rounded up to 10
    console.log("TEN METRICS", goalId, day)
    const [metrics, setMetrics] = useState([]);

    useEffect(()=>{
        
        async function getMetrics(){
            let res = await ApiHelper.getMetrics(goalId, day);
            console.log("GET METRICS RES",res, "RES METRICS", res.metrics)
            if(res.metrics){
                let graphData = transformMetrics(res.metrics,(day-10))
                // let graphData = ["1"]
                console.log(graphData,"GGG")
                setMetrics(graphData)
            }
        }

        getMetrics();
    },[goalId,day])

    return (<div>   
        <h2>The past 10 days:</h2>
        {metrics && <div className="graph-container"><LineGraph data={metrics}/></div>}
    </div>)
}

export default TenMetrics;

