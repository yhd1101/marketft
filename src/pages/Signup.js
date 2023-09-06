import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Spinner, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signup} from "../actions/userActions";
import axios from "axios";


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailVerifyNumber, setEmailVerifyNumber] = useState("")
    const [codeShow, setCodeShow] = useState(false)
    const [goolgeLogin, setGoogleLogin] = useState([])
    const userData = [
        { name: "동의합니다." },
        { name: "동의합니다." },
        { name: "동의합니다." },
        { name: "동의합니다." },
        { name: "동의합니다." }
    ];

    const [users, setUsers] = useState([]);


    const userSignup = useSelector( (state) => state.userSignup)
    const { loading, error, success } = userSignup

    const signupHandler = async (e) => {
        e.preventDefault() //무한반복 안하게할려구
        // dispatch(signup(name, email, password))
        console.log("signup")
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

    const googleLogin = async (e) => {
        e.preventDefault()

        try{
            const { status } = await axios.get("http://localhost:8000/api/auth/google")
            if(status === 201) {
                setGoogleLogin(status)
            }

        } catch (err) {
            console.log(err.message)
        }
    }

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempUser = users.map((user) => {
                return { ...user, isChecked: checked };
            });
            setUsers(tempUser);
        } else {
            let tempUser = users.map((user) =>
                user.name === name ? { ...user, isChecked: checked } : user
            );
            setUsers(tempUser);
        }
    };


    const sendEmailVerifyCode = async (e) => {
        e.preventDefault()
        // setCodeShow(true)
        try{
            const userInput = {
                email
            }
            const {status} = await axios.post("http://localhost:8000/api/auth/send/email", userInput)
            if(status === 201) {
                setCodeShow(true)
            }
        } catch (err) {
            console.log(err.message)
        }
    }


    const confirmEmailVerify = async (e) => {
        e.preventDefault()
        try {
            const userInput = {
                email, code: emailVerifyNumber
            }
            const { status } = await axios.post("http://localhost:8000/api/auth/confirm/email", userInput)
            console.log(status)
            if (status === 201) {
                alert("인증됌")
                setCodeShow(false)
            }
        } catch (err) {
            console.log(err.messsage)
        }

    }

    useEffect(() => {
        if(success){
            navigate("/login")
        }
        setUsers(userData)
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
            <Form className={"mt-5"} >
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Button  variant="primary" onClick={sendEmailVerifyCode} className="w-100 mt-4 mb-3">
                    인증하기
                </Button>

                <Form.Control
                    type="text"
                    placeholder="인증코드"
                    value={emailVerifyNumber}
                    onChange={e => setEmailVerifyNumber(e.target.value)}
                />

                <Button  variant="primary" className="w-100 mt-4 mb-3">
                    인증번호 입력
                </Button>

                {codeShow && (
                    <Container>
                        <Form.Group  className={"p-3" } style={{backgroundColor: "#faf5f5", height: "130px"}} controlId="formPassword">
                            <Row>
                                <Col>
                                    <Form.Label className={"mb-4"}>이메일로 전송된 인증코드를 입력해주세요.</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <Form.Control
                                        type="text"
                                        placeholder="인증코드"
                                        value={emailVerifyNumber}
                                        onChange={e => setEmailVerifyNumber(e.target.value)}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Button  variant="primary" onClick={confirmEmailVerify} className="w-100">
                                        인증하기
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Container>
                )}



                <Form.Group  className={"mt-4"} controlId="formPassword">
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
                <form className="form w-100">
                    <h3>Select Users</h3>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="allSelect"
                            // checked={
                            //   users.filter((user) => user?.isChecked !== true).length < 1
                            // }
                            checked={!users.some((user) => user?.isChecked !== true)}
                            onChange={handleChange}
                        />
                        <label className="form-check-label ms-2">All Select</label>
                    </div>
                        {users.map((user, index) =>(
                            <Container className="form-check" key={index}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={user.name}
                                    checked={user?.isChecked || false}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label ms-2">{user.name}</label>
                            </Container>
                        ))}
                </form>

                <Button  variant="primary" href={"http://localhost:8000/api/auth/google"} className="w-100 mt-4 mb-3">
                    구글로그인
                </Button>

                <Button  variant="primary" onClick={sendEmailVerifyCode} className="w-100 mt-4 mb-3">
                    인증하기
                </Button>

                <Button variant="primary" onClick={signupHandler} className="w-100 mt-4">
                    Submit
                </Button>
            </Form>
        </FormContainer>
        </>
    );
};

export default Signup;