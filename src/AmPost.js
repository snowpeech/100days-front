import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles/AmPost.css'
import EditAmPost from './EditAmPost'
import ApiHelper from './ApiHelper';

const AmPost = ({post, setPostInfo})=>{
    const {gratitude_am, big_goal, task1, task2, task3, goalid, day} = post

    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => {
        setShowEdit(false);
    }

    const deletePost = async (goalid, day) => {
      console.log("DELETE POST INPUT",goalid, day) //dunno why goalId s undefined...
      let res = await ApiHelper.deletePost(goalid, day,"am")
      console.log("Delete post", res)
    }
    const handleShow = () => setShowEdit(true);

    return (<div>
        <h2>AM</h2> 
        {/* <h4>Day {day} /100</h4> */}

        <Button variant="primary" onClick={handleShow}>
        Edit Post <i className="fas fa-edit"></i>
        </Button>
        <Button  variant="danger" onClick = {()=>deletePost(goalid,day)}>Delete Post</Button>

        <Modal show={showEdit} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditAmPost postInfo={post} edit={true} goalId ={goalid} day={day} closeModal = {handleClose} setPostInfo={setPostInfo}/>
        </Modal.Body>
      </Modal>


        <div className="border-box">
            {/* <Link>Edit AM post</Link> */}
        <h4>Today, I am grateful for: </h4>
        <p>{gratitude_am}</p>
        <h4>My 100-day goal is: </h4>
        <p>{big_goal}</p>
        <h4>Today's tasks:</h4>
            <ol>
                {task1 ? <li>{task1}</li>: ""}
                {task2 ? <li>{task2}</li>: ""}
                {task3 ? <li>{task3}</li>: ""}
            </ol>
           
        </div>
        
    </div>)
}

export default AmPost;
