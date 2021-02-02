import React,{useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditTenPost from './EditTenPost'
import ApiHelper from './ApiHelper';

import Form from 'react-bootstrap/Form'
// import './styles/AmPost.css'

const TenPost = ({post, setPostInfo})=>{
    console.log("INCOMING TEN FORM",post, "TEN", post.ten)
    // goal_id,day,progress, win1, win2, win3, win_plan1, bad1, bad2, bad3, solution1,microgoal
    //progress = "Did I accomplish my last microgoal?" //maybe can pull up last micro-goal
    const {accomplished, win1, win2, win3, win_plan1, win_plan2, win_plan3, bad1, bad2, bad3, solution1, solution2, solution3, microgoal, goal_id, day} = post.ten //user_def1, user_def2, user_def3,
    
    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => {
        setShowEdit(false);
    }

    const deletePost = async () => {
        //check ApiHelper & 
      let res = await ApiHelper.deletePost(post.goal_id, day,"tendays")
      //check on what is returned in Postman to see what should be kept.
      const {ten, ...keepVals} = post //user_def1, user_def2, user_def3,
      
      setPostInfo(keepVals) 
    }
    const handleShow = () => setShowEdit(true);

    // useEffect for PM Metrics :) implement later...

    return (<div>   
        <h2>Ten Day Review</h2> 
        <Button variant="primary" onClick={handleShow}>
        Edit Post <i className="fas fa-edit"></i>
        </Button>
        <Button  variant="danger" onClick = {deletePost}><i className="far fa-trash-alt"></i></Button>

        <Modal show={showEdit} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditTenPost postInfo={post} edit={true} goalId ={goal_id} day={day} closeTenModal = {handleClose} setPostInfo={setPostInfo}/>
        </Modal.Body>
      </Modal>

      {/* // goal_id,day,progress, win1, win2, win3, win_plan1, bad1, bad2, bad3, solution1,microgoal */}
        <div className="border-box">
            <h5>I {accomplished ? "did" : "did not"} accomplish my last microgoal </h5>
            <h5>These things worked well over the last 10 days: </h5>
            <ol>
                {win1 && <li>{win1}</li>}
                {win2 && <li>{win2}</li>}
                {win3 && <li>{win3}</li>}
            </ol>
            <h5>To continue those wins, I will: </h5>
            <ol>
                {win_plan1 && <li>{win_plan1}</li>}
                {win_plan2 && <li>{win_plan2}</li>}
                {win_plan3 && <li>{win_plan3}</li>}
            </ol>
            <h5>I had a hard time with these things: </h5>
            <ol>
                {bad1 && <li>{bad1}</li>}
                {bad2 && <li>{bad2}</li>}
                {bad3 && <li>{bad3}</li>}
            </ol>
            <h5>My plan to address those struggles</h5>
            <ol>
                {solution1 && <li>{solution1}</li>}
                {solution2 && <li>{solution2}</li>}
                {solution3 && <li>{solution3}</li>}
            </ol>
            
            <h5>My next 10-day microgoal:</h5>
            <p>{microgoal}</p>
        </div>
        
    </div>)
}

export default TenPost;
