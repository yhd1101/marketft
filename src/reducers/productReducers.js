import {
    PRODUCT_DETAIL_BY_ID_REQUEST,
    PRODUCT_DETAIL_BY_ID_FAIL,
    PRODUCT_DETAIL_BY_ID_SUCCESS,
    PRODUCT_GET_ALL_FAIL,
    PRODUCTS_GET_ALL_SUCCESS,
    PRODUCTS_GET_ALL_REQUEST
} from "../constants/productsConstants";

export const getProductByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_BY_ID_REQUEST:
            return { loading : true}
        case PRODUCT_DETAIL_BY_ID_SUCCESS:
            return { loading: false, product : action.payload}
        case PRODUCT_DETAIL_BY_ID_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const getProductsReducer = (state = {products : []}, action) => {
    switch (action.type) {
        case PRODUCTS_GET_ALL_REQUEST:
            return {loading : true, products: []}
        case PRODUCTS_GET_ALL_SUCCESS:
            return { loading: false, products : action.payload.products}
        case PRODUCT_GET_ALL_FAIL:
            return {loading: false, error : action.payload}

        default:
            return state
    }
}