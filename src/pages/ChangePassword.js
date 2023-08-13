import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const queryString = window.location.search
    // console.log(queryString)

    const queryString = location.search
    //console.log(queryString)
    const urlParams = new URLSearchParams(queryString)
    const token = urlParams.get("token")
    console.log(token)


    const changePasswordHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("password do not matched")
            return
        }
        try {
            const userInput = {
                token, newPassword: password
            }
           const {data, status} = await axios.post("http://localhost:8000/api/auth/change/password", userInput)
            if (status === 201) {
                alert("success chagne password")
                navigate("/login")
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <FormContainer title={"Change Password"}>
            <Form className={"mt-5"} onSubmit={changePasswordHandler}>
                <Form.Group controlId="formEmail">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-4">
                    Change Password
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ChangePassword;