import React, {useEffect, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signup} from "../actions/userActions";


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userSignup = useSelector( (state) => state.userSignup)
    const { loading, error, success } = userSignup

    const signupHandler = async (e) => {
        e.preventDefault() //무한반복 안하게할려구
        dispatch(signup(name, email, password))
        //redux 글로벌 상태관리, 에러 잡기 및 데이터의 흐름을 보기위해서(운영)
        // try {
        //     const userInput = {
        //         name, email, password
        //     }
        //     const result = await axios.post("http://localhost:9000/user/signup", userInput)
        //     console.log("+++++++++++++++", result)
        //
        // } catch (err){
        //     console.log(err)
        // }

    }

    useEffect(() => {
        if(success){
            navigate("/login")
        }
    },  [navigate, success])
    return (
        <>
            {/*{error && (*/}
            {/*    <Alert variant={"danger"}>*/}
            {/*        {error}*/}
            {/*    </Alert>*/}
            {/*)}*/}
        <FormContainer title={"Signup"}>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
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
        </>
    );
};

export default Signup;