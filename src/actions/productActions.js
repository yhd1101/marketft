
//네트워킹 관리
import {
    PRODUCT_DETAIL_BY_ID_FAIL,
    PRODUCT_DETAIL_BY_ID_SUCCESS,
    PRODUCT_DETAIL_BY_ID_REQUEST,
    PRODUCTS_GET_ALL_SUCCESS,
    PRODUCT_GET_ALL_FAIL,
    PRODUCTS_GET_ALL_REQUEST
} from "../constants/productsConstants"
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST} from "../constants/userConstants";
import axios from "axios";

const baseURL = "http://localhost:9000/"


export const getProductById = (id) => async (dispatch) => {
    try{
        dispatch({
            type:PRODUCT_DETAIL_BY_ID_REQUEST
        })
        const { data, status } = await axios.get(baseURL+`product/${id}`)
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
        const {status, data} = await axios.get("http://localhost:9000/product/")
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


