import React, {useContext, useEffect} from 'react';
import {Badge, Button, Card, Carousel, Col, Container, Row, Spinner, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import i18n from "../lang/i18n";
import LocaleContext from "../LocaleContext";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import { getProducts } from "../actions/productActions";

const Main = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { locale } = useContext(LocaleContext)
    const navigate = useNavigate()

    const productList = useSelector((state) => state.productList)
    const { loading, products, error } = productList

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const changeLocale = (l) => {
        if (locale !== l){
            i18n.changeLanguage(l)
        }
    }
    const displayLanguage = (l) => {
        switch (l){
            case "ko-KR":
                return "한국어"
            case "en-US" :
                return "English"
            case "jp-JP" :
                return "日本語"
            case "cn-CN" :
                return "中国话"
            default:
                return ""
        }
    }

    // const carouselData = [
    //     {
    //         "id" : 1,
    //         "title" : "중고거래",
    //         "desc" : "당신의 중고물품, 새로운 주인을 찾습니다.",
    //         "img" : "https://cdn.discordapp.com/attachments/965926129246556200/1102610841804734484/dress-2583113_1920.jpg"
    //
    //     },
    //
    //     {
    //         "id" : 2,
    //         "title" : "부동산",
    //         "desc" : "당신의 꿈을 코리아 마켓에서 만나보세요!",
    //         "img" : "https://cdn.discordapp.com/attachments/965926129246556200/1102611482073640981/house-2469110.jpg"
    //     },
    //     {
    //         "id" : 3,
    //         "title" : "구인구직",
    //         "desc" : "새로운 일터를 코리아 마켓에서 쉽고 빠르게 찾아보세요.",
    //         "img" : "https://cdn.discordapp.com/attachments/965926129246556200/1102611933435273367/neckties-210347.jpg"
    //     }
    // ]








    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.discordapp.com/attachments/965926129246556200/1102610841804734484/dress-2583113_1920.jpg"
                        alt="First slide"
                        style={{ height : "530px"}}
                    />
                    <Carousel.Caption>
                        <h1 style={{color: 'white', fontWeight: 'bold', fontSize: '64px', position: 'absolute',left: '50px', bottom: '100px'}}>{t("Selling")}</h1>
                        <br/>
                        <h3 style={{color: 'white', fontWeight: 'bold', fontSize: '25px', position: 'absolute', left: '50px', bottom: '60px'}}>{t("Looking for a new owner, your used item.")}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.discordapp.com/attachments/965926129246556200/1102611482073640981/house-2469110.jpg"
                        alt="Second slide"
                        style={{ height : "530px"}}
                    />

                    <Carousel.Caption>
                        <h1 style={{color: 'white', fontWeight: 'bold', fontSize: '64px', position: 'absolute',left: '50px', bottom: '100px'}}>{t("real estate")}</h1>
                        <br/>
                        <h3 style={{color: 'white', fontWeight: 'bold', fontSize: '25px', position: 'absolute', left: '50px', bottom: '60px'}}>{t("Meet your dream at the Korean Market!")}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.discordapp.com/attachments/965926129246556200/1102611933435273367/neckties-210347.jpg"
                        alt="Third slide"
                        style={{ height : "530px"}}
                    />

                    <Carousel.Caption>
                        <h1 style={{color: 'white', fontWeight: 'bold', fontSize: '64px', position: 'absolute',left: '50px', bottom: '100px'}}>{t("Job")}</h1>
                        <br/>
                        <h3 style={{color: 'white', fontWeight: 'bold', fontSize: '25px', position: 'absolute', left: '50px', bottom: '60px'}}>{t("Find a new workplace in Korea Market easily and quickly.")}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            {/*<Carousel nextLabel={""} prevLabel={""}>*/}
            {/*    {carouselData && carouselData.map(item => (*/}
            {/*        <Carousel.Item key={item.id}>*/}
            {/*            <img*/}
            {/*                className="d-block w-100"*/}
            {/*                src={item.img}*/}
            {/*                alt="First slide"*/}
            {/*                style={{ height : "530px"}}*/}
            {/*            />*/}
            {/*            <Carousel.Caption>*/}
            {/*                <h1 style={{color: 'white', fontWeight: 'bold', fontSize: '64px', position: 'absolute',left: '50px', bottom: '100px'}}>{item.title}</h1>*/}
            {/*                <br/>*/}
            {/*                <h3 style={{color: 'white', fontWeight: 'bold', fontSize: '25px', position: 'absolute', left: '50px', bottom: '60px'}}>{item.desc}</h3>*/}
            {/*            </Carousel.Caption>*/}
            {/*        </Carousel.Item>*/}
            {/*    ))}*/}

            {/*</Carousel>*/}
        <Container className={"mt-5"}>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            <Row>
                {products && products.map(product => (
                    <Col className={"mt-5"}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" style={{height: '250px', width: '100%'}} src={product.picture} />
                            <Card.Body>
                                <Card.Title>{product.name.slice(0,15)}</Card.Title>
                                <Card.Text>
                                    {product.desc1.slice(0,15)}...
                                </Card.Text>
                                <Stack direction="horizontal" className={"me-lg-2"}>
                                    {product?.category?.map(c => (
                                        <div style={{margin: "3px"}}>
                                            <h4>
                                                <Badge pill bg="secondary">{c}</Badge>
                                            </h4>
                                        </div>
                                    ))}
                                </Stack>
                                <Button onClick={() => navigate(`/product/${product._id}`)}>Go Detail</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>

        </>


    );
};

export default Main;
