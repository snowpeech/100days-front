import React,{useEffect, useState} from 'react';
import ApiHelper from '../helpers/ApiHelper';
import LineGraph from '../LineGraph'
import transformMetrics from '../helpers/transformMetrics';


const TenMetrics = ({goalId, day})=>{
    //the day that is passed in rounded up to 10
    const [metrics, setMetrics] = useState([]);
    
    useEffect(()=>{
        
        async function getMetrics(){
            let res = await ApiHelper.getMetrics(goalId, day);
            if(res.metrics){
                //FYI transformMetrics needs goalId and startDay, aka Roundday -10
                let graphData = transformMetrics(res.metrics,(day-10))                
                setMetrics(graphData)
            }
        }

        getMetrics();
    },[goalId,day])

    return (<div>   
        {metrics && <div className="graph-container"><LineGraph data={metrics}/></div>}
    </div>)
}

export default TenMetrics;

