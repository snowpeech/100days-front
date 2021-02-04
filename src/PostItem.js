import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import sun from './pics/sun.png'
import moon from './pics/crescent-moon.png'

const dayjs = require('dayjs');

const PostItem = ({day}) =>{
    const startDay = localStorage.getItem("_startDay")
    let curDay = dayjs(startDay).add(+day.day, 'day').format('MMMM D') 

    let amInfo =<Card>
    <Card.Body>
       
            <Container>
                <Row>
                    <Col xs={2}><h5>AM </h5>
    <Card.Img src={sun} alt="sun icon" style={{ width: '2rem' }}/>
    </Col>
                    <Col>
                        <b>Gratitude:</b> {day.gratitude_am}
                        <div><b>Tasks:</b></div>
                        <ol>
                        {day.task1 && <li>{day.task1}</li>}
                        {day.task2 && <li>{day.task2}</li>}
                        {day.task3 && <li>{day.task3}</li>}
                        </ol>
                        </Col>
                    </Row>
                </Container>
       
        </Card.Body>
    </Card>
    
    let pmInfo = <Card>
    <Card.Body>
        <Container>
            <Row>
                <Col xs={2}><h5>PM </h5>
                <Card.Img src={moon} alt="night icon" style={{ width: '2rem' }}/>
                </Col>
                <Col>
                    <div>
                        <b>Reflection:</b> {day.reflect}
                    </div>
                    <div><b>Discipline:</b> {day.discipline} / 10 </div>
                    <div><b>Overall Day:</b> {day.overall_day} / 10</div>
                </Col>
            </Row>
        </Container>
    </Card.Body>
  </Card>

    // let amInfo = "am"
    // let pmInfo = "pm"

    return(<Container>
        <h4>Day {day.day} :: {curDay}</h4>    
        <Row>
           <Col xs={12} md={6}> {day.gratitude_am && amInfo }</Col>

           <Col xs={12} md={6}>{day.gratitude_pm && pmInfo}</Col>
        </Row>
    </Container>)
}


export default PostItem;

{/* <ol>
        {day.task1 && <li>{day.task1}</li>}
        {day.task2 && <li>{day.task2}</li>}
        {day.task3 && <li>{day.task3}</li>}
    </ol>  */}
