import React,{useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles/AmPost.css'
import EditAmPost from './EditAmPost'
import ApiHelper from './helpers/ApiHelper';

const AmPost = ({post, setPostInfo})=>{
    
    const {gratitude_am, big_goal, task1, task2, task3, goal_id, day} = post

    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => {
        setShowEdit(false);
    }

    const deletePost = async () => {
      let res = await ApiHelper.deletePost(post.goal_id, day,"am")
      console.log("Delete post", res)
      //update AM Post/ today?
      const {gratitude_am, big_goal, task1, task2, task3,...keepVals} =post

      setPostInfo(keepVals)
    }
    const handleShow = () => setShowEdit(true);

    return (<div>   
        <h3>AM</h3> 

        <Button variant="primary" onClick={handleShow}>
        Edit Post <i className="fas fa-edit"></i>
        </Button>
        <Button  variant="danger" onClick = {deletePost}><i className="far  fa-trash-alt"></i></Button>

        <Modal show={showEdit} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditAmPost postInfo={post} edit={true} goalId ={goal_id} day={day} closeModal = {handleClose} setPostInfo={setPostInfo}/>
        </Modal.Body>
      </Modal>


        <div className="border-box">

        <h5>Today, I am grateful for: </h5>
        <p>{gratitude_am}</p>
        <h5>My 100-day goal is: </h5>
        <p>{big_goal}</p>
        <h5>Today's tasks:</h5>
            <ol>
              {task1 && <li>{task1}</li>}
              {task2 && <li>{task2}</li>}
              {task3 && <li>{task3}</li>}
            </ol>
           
        </div>
        
    </div>)
}

export default AmPost;
