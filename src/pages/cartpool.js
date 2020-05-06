import React from "react";
import CartPoolList from "../components/cartpool/CartPoolList";
import CartPoolCreationButton from "../components/cartpool/CartPoolCreationButton";
import {connect} from "react-redux";
import CartPoolDetailForm from "../components/cartpool/CartPoolDetailForm";

const CartPool = ({userInfo}) => {

    if (userInfo.isLogin) {
        if(userInfo.pool==='' || userInfo.pool === null){
            return <div><CartPoolCreationButton/><CartPoolList/></div>;
        }else{
            return <div><CartPoolDetailForm /></div>;
        }
    }else{
        return <div><p>Please Login to View Cart Pool</p></div>;
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user
    }
}

export default connect(mapStateToProps)(CartPool);