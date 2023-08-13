import React, {useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const FindPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const findPasswordHandler = async (e) => {
        e.preventDefault()
        try {
            const {data, status} = await axios.post("http://localhost:8000/api/auth/forgot/password", {email})
            if(status === 201) {
                alert("please check your email")
                navigate("/login")
            }

        } catch (err) {
            console.log(err)
        }

    }
    return (

            <FormContainer title={"FindPassword"}>
                <Form className={"mt-5"} onSubmit={findPasswordHandler}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>가입한 이메일 주소를 입력해주세요.</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Find Password
                    </Button>
                </Form>
            </FormContainer>

    );
};

export default FindPassword;