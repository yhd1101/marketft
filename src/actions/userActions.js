import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS
} from "../constants/userConstants";
import axios from "axios";
const userBaseURL ="http://localhost:9000/user/"

//로그인 함수
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const {data, status} = await axios.post(userBaseURL + "login", {email, password})
        if(status === 200){
            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data.user
            })
            localStorage.setItem("userInfo",JSON.stringify(data.user))
            localStorage.setItem("token", JSON.stringify(data.token))
        }

    } catch (err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        })
    }
}

//로그아웃
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    dispatch({type: USER_LOGOUT})

    document.location.href="/login"
}

//회원가입
export const signup = (name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type : USER_SIGNUP_REQUEST
        })
        const { status} = await axios.post(userBaseURL + "signup", {name, email, password})
        if(status === 200) {
            dispatch({
                type : USER_SIGNUP_SUCCESS,
                payload : true
            })
        }

    } catch (err){
        dispatch({
            type : USER_SIGNUP_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        })

    }
}