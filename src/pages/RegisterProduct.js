import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {InputGroup, Form, DropdownButton, Dropdown, Container, Row, Col, Modal} from "react-bootstrap";
import {MultiSelect} from "primereact/multiselect"; //category
import FormContainer from "../components/FormContainer";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {createProduct} from "../actions/productActions";

const RegisterProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [name, setName] =useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [region, setRegion] = useState("")
    const [desc1, setDesc1] = useState([])
    const [categories, setCategories] = useState([])
    const [picture, setPicture] = useState([])
    const [moneyInfo, setMoneyInfo] = useState({})
    // console.log(price)

    // const productCreate = useSelector((state) => state.productCreate)
    // const { loading, success, error } = productCreate




    console.log(typeof price)

    const categoryList = [
        { name: 'digital', code: 'digital' },
        { name: 'top', code: 'top' },
        { name: 'bottom', code: 'bottom' },
        { name: 'shoes', code: 'shoes' },
        { name: 'caps', code: 'caps' },
        { name: 'sports', code: 'sports'},
        { name: 'socks', code: 'socks'},
        {name: 'beauty', code: 'beauty'},
        {name: 'onepiece', code: 'onepiece'}
    ];

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


    const productPost = async (e) => {
        e.preventDefault();
        console.log("++++++++++++++++++++++")
        const userInput = {
            name, price, brand, region,
            desc:[desc1], productImg:[picture],
            category: categories.map(item => item.name)
        }
        console.log("++++++",userInput)



        try{
            const config = {
                headers : {
                    Authorization : "Bearer " + token
                }
            }

            console.log("-----------------",config)



            const {status } = await axios.post("http://localhost:8000/api/product/create", userInput, config)
             if (status === 201){
                navigate("/")
            }

        } catch (err){
            console.log(err)
            console.log("+++++++++",e.message)
        }
    }

    // useEffect(() => {
    //     getMoneyInfo();
    //     if(success){
    //         navigate("/")
    //     }
    // }, [dispatch, navigate, success])



    return (
        <FormContainer title={"Create Product"}>
            <Form className={"mt-5"} onSubmit={productPost}>
                <div className={"grid p-fluid mb-3"}>
                    <div className={"field col-12 md:col-4"}>
                        <label htmlFor={"inputtext"}>Name</label>
                        <InputText
                            id={"inputtext"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={"grid p-fluid mb-3"}>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="currency-us">Price</label>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <InputNumber
                            inputId="currency-us"
                            value={price}
                            onValueChange={(e) => setPrice(e.value)}
                            mode="currency"
                            currency="USD"
                            locale="en-US"

                        />
                    </div>
                    {price
                        ? (
                            <Container>
                                <h3>korea is {price * moneyInfo?.rates?.KRW.slice(0,5)}원</h3>
                                <h3>Japan is {price * moneyInfo?.rates?.JPY.slice(0,5)}엔</h3>
                            </Container>
                        )
                         : null}

                </div>
                <div className={"grid p-fluid mb-3"}>
                    <div className={"field col-12 md:col-4"}>
                        <label htmlFor={"inputtext"}>Brand</label>
                        <InputText
                            id={"inputtext"}
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        />
                    </div>
                </div>
                <div className={"grid p-fluid mb-3"}>
                    <div className={"field col-12 md:col-4"}>
                        <label htmlFor={"inputtext"}>Region</label>
                        <InputText
                            id={"inputtext"}
                            value={region}
                            onChange={e => setRegion(e.target.value)}
                        />
                    </div>
                </div>
                <div className={"grid p-fluid mb-3"}>
                    <label>Description</label>
                    <InputTextarea value={desc1} onChange={(e) => setDesc1(e.target.value)} rows={5} cols={30} autoResize />

                </div>
                <div className={"grid p-fluid mb-3"}>
                    <label>Select Categories</label>
                    <MultiSelect
                        value={categories}
                        onChange={(e) => setCategories(e.value)}
                        options={categoryList}
                        optionLabel="name"
                        placeholder="Select Categories"
                        display={"chip"}
                    />
                </div>
                <div className={"grid p-fluid mb-5"}>
                    <div className={"field col-12 md:col-4"}>
                        <label htmlFor={"inputtext"}>Picture</label>
                        <InputText
                            id={"inputtext"}
                            value={picture}
                            onChange={e => setPicture(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"grid p-fluid mb-3"}>
                    <div className={"field col-12 md:col-4"}>
                        <Button  label={"Posting"} icon={"pi pi-check"}/>
                    </div>
                </div>




            </Form>
        </FormContainer>

    );
};

export default RegisterProduct;