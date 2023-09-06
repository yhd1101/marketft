import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Badge, Button, Card, Col, Container, Form, Image, ListGroup, Modal, Row, Stack} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "../lang/i18n";
import LocaleContext from "../LocaleContext";
import MapContainer from "../components/Map";
import { Calendar } from "primereact/calendar";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../actions/productActions";


const ProductDetail = () => {
    const navigate = useNavigate()


    const { t } = useTranslation()
    const { productId } = useParams()
    console.log(productId)
    const [productInfo, setProductInfo] = useState({})
    const [relatedProducts, setRelatedProducts ] = useState([])
    const [dateTime, setDateTime] = useState("")
    const [promise, setPromise] = useState("")
    const [memo, setMemo] = useState("")
    const [location, setLocation] = useState("")
    const [resShow, setResShow] = useState(false)
    const [moneyInfo, setMoneyInfo] = useState({})
    // console.log(dateTime)
    // const dispatch = useDispatch()

    // const productById = useSelector((state) => state.productById)
    // const { loading, error, product} = productById
    // console.log(resShow)


    const getMoneyInfo = async () => {
        try{
            const result = await axios.get("https://api.currencyfreaks.com/latest?apikey=13c39624b2be49dcae2e987f4200390e")
            if( result.status === 200){
                setMoneyInfo(result.data)
            }
        } catch (err){
            console.log(err)
        }
    }


    const getToday = () => {
        let today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth() + 1 //월
        let date = today.getDate() //날짜
        let day = today.getDay() //요일

        return year + '/' + month + '/' + date
    }

    const getProductInfo = async ()=> {
        try{
            const {data, status} = await axios.get(`http://localhost:8000/api/product/${productId}`)
            console.log(data)
            if (status === 200) {
                setProductInfo(data)
            }

            // console.log(typeof data.product.category[0])
            // console.log(productInfo?.category[0])
            // const result = await axios.get(`http://localhost:8000/api/product/category/${data.product.category[0]}`)
            // const filteredData = await result.data.product.filter(f => f._id !== productId) //자기자신 제외한 상품 정렬
            // console.log(filteredData,"----------")
            // const resultData = await filteredData.slice(0,4)
            //  setRelatedProducts(resultData)
            // console.log(relatedProducts)


        } catch (err){
            console.log(err)
        }
    }

    const reservationPost = async (e) => {
        e.preventDefault()
        try {
            const userInput ={
                memo, promise: JSON.stringify(dateTime),location
            }
            const token = JSON.parse(localStorage.getItem("token"))
            // console.log(token)
            const config = {
                headers : {
                    // Authorization : "Bearer " + localStorage.getItem("token")
                    Authorization : "Bearer " + token
                    // Authorization : "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGRjZDdhZWMyODQzZDI5ZWYxNWU5ZCIsImlhdCI6MTY4Njk4MTQ4OSwiZXhwIjoxNjg2OTg1MDg5fQ.Z6c5AbwQccducXeJP9j-DMkUBNEULTj0c-Yjg_zXmO4"
                }
            }
            console.log(userInput)
            const { status } = await axios.post(`http://localhost:9000/reservation/${productId}`, userInput, config)
            if(status === 200){
                setResShow(true)
                alert("예약되었습니다.")
            }

        } catch (err){
            console.log(err)
        }
    }

    // const getRelatedProduct = async (category) => {
    //     try{
    //         const reuslt = await axios.get(`http://localhost:9000/product/category/${category}`)
    //         console.log("++++++++++++++++", reuslt)
    //     } catch (err){
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        getProductInfo()
        getMoneyInfo();

    },[])





    return (
        <>
            <Container>
                <Link className={"btn btn-light my-3"} to="/">
                    Go Back
                </Link>
            </Container>
            <Container>
                <Row>
                    {resShow ?? <h1>{dateTime}</h1>}
                    <Col md={6}>
                        <Image style={{width: "500px", height: "400px"}} src={productInfo.productImg} alt={productInfo.name} fluid/>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant={"flush"}>
                            <ListGroup.Item>
                                <h5>{productInfo.name}</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>{t("Price")} :${productInfo.price}

                                        <Container>
                                            <h5>korea is {productInfo.price * moneyInfo?.rates?.KRW.slice(0,5)}원</h5>
                                            <h5>Japan is {productInfo.price * moneyInfo?.rates?.JPY.slice(0,5)}엔</h5>
                                        </Container>
                                </h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>{t("Brand")}: {productInfo.brand  ? productInfo.brand : "내용없음"}</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>{t("Category")}: {productInfo.category}</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p>{t("updated")}: {productInfo.updatedAt}</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Row style={{height: "720px"}}>
                        <Col md={6}>
                            <Container className={"mt-5 mb-2"}>
                                <h3>{t("product Description")}</h3>
                            </Container>
                            {productInfo.desc}
                        {/*    {productInfo.desc.map(i => (*/}
                        {/*        <p>{i}</p>*/}
                        {/*    ))}*/}
                            <h3>{t("region")} {productInfo.region}</h3>
                            <MapContainer/>
                        </Col>
                        <Col md={4}>

                            <Card style={{ width: '22rem' }}>
                                <Card.Header>판매자 정보</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>지역: 뉴저지 11번가</ListGroup.Item>
                                    <ListGroup.Item>판매중인 상품: 5EA</ListGroup.Item>
                                    <Button variant={"dark"} onClick={() => navigate(`/user/${productInfo.seller}`)}>
                                        {t("Go to the store")}
                                    </Button>
                                </ListGroup>
                            </Card>

                            <Card style={{ width: '22rem', marginTop:'25px' }}>
                                <Card.Header>예약하기</Card.Header>


                                        <ListGroup>
                                            <Calendar
                                                showTime
                                                hourFormat="24"
                                                value={dateTime}
                                                onChange={e => setDateTime(e.target.value)}
                                                placeholder={getToday()} //현재 시간 가이드 오늘날짜로 보여줌
                                            />
                                            <Form>
                                                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>메모</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder={"memo"}
                                                        value={memo}
                                                        onChange={e => setMemo(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>약속장소</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder={"location"}
                                                        value={location}
                                                        onChange={e => setLocation(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Form>
                                            <Button
                                                onClick={reservationPost}
                                                style={{width: "350px", marginBottom: "30px"}}
                                                variant={"dark"}
                                                disabled={resShow ? true : false}
                                            >
                                                {t("Reservation")}
                                            </Button>



                                        </ListGroup>

                            </Card>


                        </Col>
                    </Row>
                </Row>
                <Container>
                    <h3>관련상품</h3>
                    <Row className={"mt-4"}>
                        {relatedProducts && relatedProducts.map(product => (
                            <Col md={"auto"}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" style={{height: '250px', width: '100%'}} src={product.productImg} />
                                    <Card.Body>
                                        <Card.Title>{product.name.slice(0,12)}</Card.Title>
                                        <Card.Text>
                                            {product.desc.slice(0,15)}...
                                        </Card.Text>
                                        {/*<Button onClick={() => navigate(`/product/${product._id}`)}>Go Detail</Button>*/}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

            </Container>
        </>

    );
};

export default ProductDetail;