import React, {useState} from 'react';
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signupHandler = async (e) => {
        e.preventDefault() //무한반복 안하게할려구
        try {
            const userInput = {
                name, email, password
            }
            const result = await axios.post("http://localhost:9000/user/signup", userInput)
            console.log("+++++++++++++++", result)

        } catch (err){
            console.log(err)
        }
    }
    return (
        <FormContainer title={"Signup"}>
            <Form className={"mt-5"} onSubmit={signupHandler}>
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

                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-4">
                    Submit
                </Button>
            </Form>
        </FormContainer>

    );
};

export default Signup;