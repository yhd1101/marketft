import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormContainer from "../components/FormContainer";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Column} from "primereact/column";
import {useDispatch, useSelector} from "react-redux";

const Profile = () => {
    const dispatch = useDispatch()
    // const [userInfo, setUserInfo] = useState({})
    const token = localStorage.getItem("token")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [reservations, setReservations] = useState([])

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    // const getProfileInfo = async () => {
    //     try {
    //
    //         const config = {
    //             headers : {
    //                 Authorization : "Bearer " + JSON.parse(token)
    //             }
    //         }
    //         const {data, status} = await axios.get("http://localhost:9000/user", config)
    //         if (status === 200) {
    //             setUserInfo(data.user)
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const getReservationList = async () => {
        try {
            const config = {
                headers : {
                    Authorization : "Bearer " + JSON.parse(token)
                }
            }
            const result = await axios.get("http://localhost:9000/reservation", config)
            console.log(result)
            if( result.status === 200 ) {
                setReservations(result.data.reservations)
            }

        } catch (err){

        }
    }

    useEffect(() => {
        // getProfileInfo()
        getReservationList()
    }, [])

    return (
        <FormContainer title={`${userInfo.name} 반갑습니다.`}>
            <Form className={"mt-5"} >
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={userInfo.email}
                        onChange={e => setEmail(e.target.value)}
                        disabled
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className={"mt-3"}>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="User Name"
                        value={userInfo.name}
                        onChange={e => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className={"mt-3"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder=""
                        value={userInfo.password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Row className={"mt-5"}>
                    <Col md={"auto"}>
                        <Button variant="primary">프로필 수정</Button>{' '}
                    </Col>
                    <Col md={"auto"}>
                        <Button variant="danger">회원탈퇴</Button>{' '}
                    </Col>
                </Row>
            </Form>
            <Container className={"mt-5"}>
                <hr/>
                <h1>예약리스트</h1>
                <Table striped bordered hover className={"mt-3"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>예약제품</th>
                        <th>예약날짜</th>
                        <th>예약장소</th>
                        <th>구매여부</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations && reservations?.map(r => (
                        <tr key={r._id}>
                            <td>{r._id.slice(20, 25)}</td>
                            <td>{r.product && r.product.name}</td>
                            <td>{r.promise.slice(1, 11)}</td>
                            <td>{r.location}</td>
                            <td>구매</td>
                        </tr>
                    ))}

                    {/*<tr>*/}
                    {/*    <td>2</td>*/}
                    {/*    <td>Jacob</td>*/}
                    {/*    <td>Thornton</td>*/}
                    {/*    <td>@fat</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td>3</td>*/}
                    {/*    <td colSpan={2}>Larry the Bird</td>*/}
                    {/*    <td>@twitter</td>*/}
                    {/*</tr>*/}
                    </tbody>
                </Table>
            </Container>

        </FormContainer>
    );
};

export default Profile;