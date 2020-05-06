import React, {useEffect, useState} from "react";
import {message, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux";
import {BASE_URL} from "../../config/constants";

const OrderList = ({OrderInfo}) => {

    const store = useStore();

    useEffect(() => {getOrder();}, []);
    const [orders, setOrders] = useState([]);

    const getOrder = () => {
        const url = BASE_URL+'/api/order/user/'+store.getState().user.id;
        axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                setOrders(response.data);
                message.success('Load Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }


    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'category',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: 'PickUp',
            dataIndex: 'pickupMethod',
            key: 'pickupMethod',
        },
        {
            title: 'CreationTime',
            dataIndex: 'creationTime',
            key: 'creationTime',
        },
        {
            title: 'PickupTime',
            dataIndex: 'pickupTime',
            key: 'pickupTime',
        },
        {
            title: 'DeliveredTime',
            dataIndex: 'deliveredTime',
            key: 'deliveredTime',
        },
    ];


    return <Table columns={columns} dataSource={orders} rowKey="id" pagination={false} />;
}

export default OrderList;