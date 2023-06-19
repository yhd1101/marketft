import {
    PRODUCT_DETAIL_BY_ID_FAIL,
    PRODUCT_DETAIL_BY_ID_SUCCESS,
    PRODUCT_DETAIL_BY_ID_REQUEST
} from "../constants/productsConstants"
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST} from "../constants/userConstants";
import axios from "axios";


export const getProductById = (id) => async (dispatch) => {
    try{
        dispatch({
            type:PRODUCT_DETAIL_BY_ID_REQUEST
        })
        const { data, status } = await axios.get(`http://localhost:9000/product/${id}`)
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