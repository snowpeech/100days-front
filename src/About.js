import React from 'react';

const About = () => {
    return( <div className ="About m-3 text-left">
        <div className='m-3'>
        <h2 className="text-center">How this works</h2>
            <h4 >1.Set a goal</h4>
            <p>Think of a goal you’re excited about achieving in the next three months to 100-days.
                It should be Specific, Measurable, Achievable, Realistic, & Timely. There are a lot 
                of <a href="https://www.atlassian.com/blog/productivity/how-to-write-smart-goals"> great resources </a>
                on how to set such a goal. Spend some time here and think about it… While it’s exciting to start something 
                fresh and new, it’s better to take a moment to create a strong goal you have resolve 
                to complete.
            </p>
            <h4>2.Check in every day</h4>
            <p>In the morning, you can set specific tasks to complete and get you closer to your goal</p>
            <p>In the evening, you can reflect on how well you did in accomplishing your tasks
                and how your day went altogether.</p>
            <h4>3.Every ten days, reflect on your progress and set a new microgoal</h4>
            <p>This should take a few more minutes than your usual check in as you reflect on 
                how the past ten days went. You can reflect on what worked and what didn't and set a new 
                goal for the next ten days.
            </p>
        </div>
        <div className='m-3'>
            <h2 className="text-center"> FAQ</h2>
            <h4>Can I change my goal?</h4>
            <p>Yes! Feel free to add/change details to your goal and your recorded posts will be unaffected.
            However if you want to go in an entirely different direction, it may be more helpful to delete your
            goal and start over.
            </p>

            <p><b>Note:</b> Posts are saved in relation to your start day. For example if you start a goal on 
            January 1 and write a few posts for Day 1 and Day 2 but later change the start date to January 15th, 
            your posts will show up for Jan 16th & Jan 17th.
            </p>

            <h4>I can only have one goal?</h4>
            <p>Yep. Rather than spreading oneself thin over multiple (good!) goals, it's better to pick one and 
                give it 100% If you achieve your goal early, you can start something new!</p>

        </div>
        <div className='m-3'>
            <h2 className="text-center">About</h2>
            <p>This project was created as a mix of a short-term goal keeper and a habit tracker inspired by 
                <a href="https://www.amazon.com/100-Day-Goal-Journal-Accomplish-Matters/dp/1454930748"> this book</a>.
            The creator of this project has found she works better with daily goal setting & evening reflections 
            and thought it might be fun to share such a tool with others. </p>

            <h5 className="mt-5">Credits</h5>
            <p>Technologies: NodeJS, ExpressJS, React, Bootstrap, Nivo</p>
            <p>Images: Font Awesome, images by 
                <a href="https://www.freepik.com" title="Freepik"> Freepik</a> from  
                <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> </p>
        </div>
     </div>)
}

export default About;