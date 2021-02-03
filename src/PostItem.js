import React from 'react';
const dayjs = require('dayjs');

const PostItem = ({day}) =>{
    const startDay = localStorage.getItem("_startDay")
    let curDay = dayjs(startDay).add(+day.day, 'day').format('MMMM D') 
    
    console.log("grat day", typeof day.gratitude_am, day.gratitude_am)

    let amInfo = <div>
            <h5>AM </h5>
            <div><b>Morning gratitude:</b> {day.gratitude_am}</div>
            <div><b>Tasks:</b>
            <ol>
                {day.task1 && <li>{day.task1}</li>}
                {day.task2 && <li>{day.task2}</li>}
                {day.task3 && <li>{day.task3}</li>}
            </ol> 

            </div>            
        </div>
    
    let pmInfo = <div>
            <h5>PM</h5>
            <div><b>Discipline:</b> {day.discipline} / 10 </div>
            <div><b>Overall Day:</b> {day.overall_day} / 10</div>
            <div><b>Reflection:</b> {day.reflect}</div>
        </div>

    // let amInfo = "am"
    // let pmInfo = "pm"

    return(<>
        <h4>Day {day.day} :: {curDay}</h4>    
            {day.gratitude_am && amInfo }

            {day.gratitude_pm && pmInfo}    
    </>)
}


export default PostItem;

{/* <ol>
        {day.task1 && <li>{day.task1}</li>}
        {day.task2 && <li>{day.task2}</li>}
        {day.task3 && <li>{day.task3}</li>}
    </ol>  */}
