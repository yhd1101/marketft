import {
    PRODUCT_DETAIL_BY_ID_REQUEST,
    PRODUCT_DETAIL_BY_ID_FAIL,
    PRODUCT_DETAIL_BY_ID_SUCCESS
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