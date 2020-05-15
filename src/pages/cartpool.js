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
            if(userInfo.poolStatus==='ACTIVE'){
                return <div><CartPoolDetailForm /></div>;
            }else if(userInfo.poolStatus==='REF'){
                return <div><p>Your joining pool request has been sent to reference member, please wait for support.</p></div>;
            }else if(userInfo.poolStatus==='LEADER'){
                return <div><p>Your joining pool request has been sent to leader, please wait for approval.</p></div>;
            }else{
                return <div><CartPoolCreationButton/><CartPoolList/></div>;
            }
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