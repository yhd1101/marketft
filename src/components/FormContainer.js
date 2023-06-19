import React from 'react'
import {Col, Container, Row} from "react-bootstrap";

const FormContainer = ({children, title}) => {
    return(
        <Container>
            <Row className={"justify-content-md-center mt-5"}>
                <Col xs={12} md={6}>
                    <h1>{title}</h1>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default FormContainer