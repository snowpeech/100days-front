// incoming data: [{day:, discipline:, overall_day:,},{},{},...]
// transform to [{id: discipline, data:[{"x": day, "y":value}, {id:overall_day, ...}, ]}]
function transformMetrics(metrics, startDay=0) {
    let data=[]; 
    let disc ={"id":"Discipline",
                "data":[]
            }; 
    let overall ={"id":"Overall Day",
                "data":[]
            }; 
    let i = 0;

    if (startDay >  metrics[i].day) {return "ERROR. INVALID DATA & RANGE"}

    for(let d=0; d<=10; d++){
        let curDay = startDay + d;
        if(i<metrics.length){
            //look for array values to add
            if(metrics[i].day === curDay){
                //add values from metrics
                disc.data.push({"x":curDay, "y":metrics[i].discipline})
                overall.data.push({"x":curDay, "y":metrics[i].overall_day});
                i++;
            } else if(metrics[i].day > curDay){
                //discontinuity in metrics data. increase date, keep i the same. add null
                disc.data.push({"x":curDay, "y":null})
                overall.data.push({"x":curDay, "y":null});
            }

        } else {
            //reached the end of metrics, add null values to end of day range
            disc.data.push({"x":curDay, "y":null})
            overall.data.push({"x":curDay, "y":null});
        }

        
    }
    data.push(disc,overall)
    console.log("returning transformed metrics",data)
    return data;
}

export default transformMetrics;