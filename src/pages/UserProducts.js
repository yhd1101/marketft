import React from 'react';
import FormContainer from "../components/FormContainer";
import {useSelector} from "react-redux";

const UserProducts = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    return (
        <FormContainer title={`${userInfo.name}님은 몇개의 제품을 판매하였습니다.` }>

        </FormContainer>
    );
};

export default UserProducts;