
//네트워킹 관리
import {
    PRODUCT_DETAIL_BY_ID_FAIL,
    PRODUCT_DETAIL_BY_ID_SUCCESS,
    PRODUCT_DETAIL_BY_ID_REQUEST,
    PRODUCTS_GET_ALL_SUCCESS,
    PRODUCT_GET_ALL_FAIL,
    PRODUCTS_GET_ALL_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST
} from "../constants/productsConstants"
import axios from "axios";
import {logout} from "./userActions";

const baseURL = "http://localhost:8000/api/product"

const token = localStorage.getItem("token")




export const getProductById = (id) => async (dispatch) => {
    try{
        dispatch({
            type:PRODUCT_DETAIL_BY_ID_REQUEST
        })
        const { data, status } = await axios.get(baseURL+`${id}`)
        if (status === 200) {
            dispatch({
                type : PRODUCT_DETAIL_BY_ID_SUCCESS,
                payload: data.product
            })
        }


    } catch (err){
        dispatch({
            type: PRODUCT_DETAIL_BY_ID_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        })
    }
}

export const getProducts = () => async (dispatch) => {
    try {

        dispatch({
            type : PRODUCTS_GET_ALL_REQUEST
        })
        const {status, data} = await axios.get("http://localhost:8000/api/product")
        if(status === 200){
            dispatch({
                type : PRODUCTS_GET_ALL_SUCCESS,
                payload : data
            })
        }

    } catch (err){
        dispatch({
            type : PRODUCT_GET_ALL_FAIL,
            payload :
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        })
    }
}

export const createProduct = (newProduct) => async (dispatch) =>{
    try {
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        dispatch({
            type : PRODUCT_CREATE_REQUEST
        })
        const { status } = await  axios.post(`${baseURL}/create`, newProduct, config)
        console.log(newProduct)
        if( status === 201) {
            dispatch({
                type : PRODUCT_CREATE_SUCCESS,
                payload : true
            })
        }
    } catch (err){
        console.log(err)
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        //인증이 안될때
        if( message === 'Not authorized, token failed'){
            dispatch(logout())
        }
        dispatch({
            type : PRODUCT_CREATE_FAIL,
            payload: message

        })

    }
}










