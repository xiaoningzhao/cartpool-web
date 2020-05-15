import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Button, Card, message} from "antd";
import axios from "axios";
import {useStore} from "react-redux";
import {BASE_URL} from "../../config/constants";
import {setCartPool} from "../../actions/user";

const CartPoolDetailForm = () => {

    const [myCartPool, setMyCartPool] = useState({});
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
                setMyCartPool(response.data);
                message.success('Load Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const deletePool = () =>{
        const url = BASE_URL+'/api/cartpool/'+ store.getState().user.pool;

        axios({
            method: 'delete',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                //setCartPool(response.data);
                store.dispatch(setCartPool(null, "INIT"));
                message.success('Delete Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
                message.error(error.response.data.message);
            });
    }

    const leavePool = () =>{
        const url = BASE_URL+'/api/user/'+ store.getState().user.id +'/pool/'+ store.getState().user.pool;

        axios({
            method: 'put',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                //setCartPool(response.data);
                store.dispatch(setCartPool(null, "INIT"));
                message.success('Leave Pool Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
                message.error(error.response.data.message);
            });
    }


    return (
        <div>
            <Card title={myCartPool.name }>
                <p>Name: {myCartPool.name}</p>
                <p>Neighborhood: {myCartPool.neighborhood}</p>
                <p>Description: {myCartPool.description}</p>
                <p>Zip: {myCartPool.zip}</p>
                <p>Pool Leader: {myCartPool.leader}</p>
            </Card>
            {myCartPool.leader === store.getState().user.id ? <Button type="primary" onClick={()=>{deletePool()}}>Delete</Button>:
            <Button type="primary" onClick={()=>{leavePool()}}>Leave</Button>}
        </div>

    );
};

export default CartPoolDetailForm