import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Card, message} from "antd";
import axios from "axios";
import {useStore} from "react-redux";
import {BASE_URL} from "../../config/constants";

const CartPoolDetailForm = () => {

    const [cartPool, setCartPool] = useState({});
    const store = useStore();

    useEffect(() => {getCartPool();}, []);

    const getCartPool = () =>{
        const url = BASE_URL+'/api/cartpool/'+ store.getState().user.pool;

        axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                setCartPool(response.data);
                message.success('Load Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    return (
        <div>
            <Card title={cartPool.name }>
                <p>Name: {cartPool.name}</p>
                <p>Neighborhood: {cartPool.neighborhood}</p>
                <p>Description: {cartPool.description}</p>
                <p>Zip: {cartPool.zip}</p>
                <p>Pool Leader: {cartPool.leader}</p>
            </Card>
        </div>

    );
};

export default CartPoolDetailForm