import React from 'react';
import {Button, message} from 'antd';
import {useStore} from "react-redux";
import {logout} from "../../actions/user";
import 'antd/dist/antd.css'
import {clearShoppingCart} from "../../actions/shoppingCart";
import {useHistory} from "react-router";
import firebase from "firebase";

const LogoutButton = () => {

    const store = useStore();
    const history = useHistory();

    const onClick = () => {
        firebase.auth().signOut()
        store.dispatch(logout());
        store.dispatch(clearShoppingCart());
        message.success('Logout Successful!');
        history.push('/product');
    }

    return (
        <Button type="link" onClick={onClick}>Logout</Button>
    );
};

export default LogoutButton
