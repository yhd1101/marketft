import React from 'react';
import {Col, Container, Navbar, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <div className="jumbotron text-center mt-5 mb-0">
            <h3 className="text-secondary">Korean Market</h3>
            <p>
                RedVelvet’s Homepage is powered by <span className="text-primary">Korean Market</span> / Designed by <span
                className="text-primary">Korean Market</span>
            </p>
        </div>
        // <footer style={{bottom:0, left:0, width:"100%", position: "fixed"}}>
        //
        //         <Container>
        //             <Row className={{width:"100%", bg:"white"}}>
        //                 <Col className={'text-center py-3'}>Copyright &copy; Korean Market</Col>
        //             </Row>
        //         </Container>
        // </footer>
    );
};

export default Footer;