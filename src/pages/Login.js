import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Container, Form, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../actions/userActions";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            navigate("/")
        }
    }, [navigate, userInfo])

    const loginHandler = async (e) => {
        e.preventDefault() //안하면 무한반복
        dispatch(login(email, password))
    }
    return (
        <>
            <FormContainer title={"Login"}>
                <Form className={"mt-5"} onSubmit={loginHandler}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Submit
                    </Button>
                </Form>
            </FormContainer>
            <Container>
                <Row className={"justify-content-md-center mt-5"}>
                    <Col xs lg="2">
                        <Button variant={"link"} onClick={() => navigate("/find/password")}>
                            find password?
                        </Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant={"link"} onClick={() => navigate("/signup")}>
                            signup
                        </Button>
                    </Col>
                </Row>
            </Container>
       </>

    );
};

export default Login;