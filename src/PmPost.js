import React,{useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import './styles/AmPost.css'
import EditPmPost from './EditPmPost'
import ApiHelper from './ApiHelper';

const PmPost = ({post, setPostInfo})=>{

    const {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day, reflect, goal_id, day} = post //user_def1, user_def2, user_def3,

    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => {
        setShowEdit(false);
    }

    const deletePost = async () => {
      let res = await ApiHelper.deletePost(post.goal_id, day,"pm")
      console.log("delete post res", res)
      const {gratitude_pm, obstacle1,obstacle2,obstacle3, solution1, solution2, solution3, discipline, overall_day, reflect, ...keepVals} = post //user_def1, user_def2, user_def3,
      
      setPostInfo(keepVals) 
    }
    const handleShow = () => setShowEdit(true);

    return (<div>   
        <h2>PM</h2> 
        <Button variant="primary" onClick={handleShow}>
        Edit Post <i className="fas fa-edit"></i>
        </Button>
        <Button  variant="danger" onClick = {deletePost}><i className="far fa-trash-alt"></i></Button>

        <Modal show={showEdit} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditPmPost postInfo={post} edit={true} goalId ={goal_id} day={day} closePmModal = {handleClose} setPostInfo={setPostInfo}/>
        </Modal.Body>
      </Modal>


        <div className="border-box">
            <h5>I am glad this happened: </h5>
            <p>{gratitude_pm}</p>
            <h5>I had these struggles: </h5>
            <ol>
                {obstacle1 && <li>{obstacle1}</li>}
                {obstacle2 && <li>{obstacle2}</li>}
                {obstacle3 && <li>{obstacle3}</li>}
            </ol> 
            <h5>My solutions to overcome those struggles: </h5>
            <ol>
                {solution1 && <li>{solution1}</li>}
                {solution2 && <li>{solution2}</li>}
                {solution3 && <li>{solution3}</li>}
            </ol>
            <h5>Overall, I'd rate my discipline for today as a {discipline} / 10</h5>
            <h5>Overall, I'd rate my day as a {overall_day} / 10</h5>
            
            <h5>Reflections</h5>
            <p>{reflect}</p>
                
        </div>
        
    </div>)
}

export default PmPost;
