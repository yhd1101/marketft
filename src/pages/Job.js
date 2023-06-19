import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Badge, Button, Card, Carousel, Col, Container, Row, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])


    const getJobs = async () => {
        try {

            const result = await axios.get("http://localhost:9000/job/")
            // console.log(result.data.products)

            setJobs(result.data.jobs)
            console.log(result.data.jobs)
        } catch (err){
            console.log(err)
        }

    }
    useEffect(() => {
        getJobs()
    }, [])




    return (
        <Container className={"mt-5"}>
            <Row xs={1} md={2} className="g-4">

                {Array.from({ length: jobs.length }).map((_, idx) => (
                    <Col key={idx}>
                        {jobs && jobs.map(job => (
                            <Card onClick={() => navigate(`/job/${job._id}`)} style={{width: "400px"}}>
                                <Card.Img variant="top" style={{height: '250px', width: '100%'}} src={job.picture} />
                                <Card.Text>
                                    <h4>경력{job.career}</h4>
                                </Card.Text>
                                <Card.Body>
                                    <Card.Title>{job.title.slice(0,25)})</Card.Title>
                                    <Card.Text>
                                        {job?.job_introduce[0].slice(0,25)}
                                    </Card.Text>
                                    <Card.Text>
                                        <h3>{job.name}</h3>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                ))}

            </Row>
        </Container>

        // <Container className={"mt-5"}>
        //     <Row>
        //         {jobs && jobs.map(job => (
        //             <Col className={"mt-5"}>
        //                 <Card style={{ width: '18rem' }}>
        //                     <Card.Img variant="top" style={{height: '250px', width: '100%'}} src={job.picture} />
        //                     <Card.Body>
        //                         <Card.Title>{job.name.slice(0,15)}</Card.Title>
        //                         <Card.Text>
        //                             Some quick example text to build on the card title and make up the
        //                             bulk of the card's content.
        //                         </Card.Text>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //         ))}
        //     </Row>
        // </Container>


    );
};

export default Main;
