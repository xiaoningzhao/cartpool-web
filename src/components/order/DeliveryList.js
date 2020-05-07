import React, {useEffect, useState} from "react";
import {Button, message, Modal, Space, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux"
import OrderDetailsForm from "./OrderDetailsForm";
import {BASE_URL} from "../../config/constants";
import {setProfile} from "../../actions/user";

const DeliveryList = () => {

    const store = useStore();

    useEffect(() => {getOrder();}, []);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [visible, setVisible] = useState(false);

    const getOrder = () => {
        const url = BASE_URL+'/api/order/deliver/user/'+store.getState().user.id;
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

    const deliver = (record) => {
        console.log(record.orderDetails);
        setProducts(record.orderDetails);
        setSelectedOrder(record.id);
        setVisible(true);
    }

    const confirm = () => {
        const url = BASE_URL+'/api/order/deliver/' + selectedOrder;
        axios({
            method: 'put',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                message.success('Confirm Successful!');
                setVisible(false);
                getOrder();
                fetchUserInfo(store.getState().user.username);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const fetchUserInfo = (username) =>{
        axios({
            method: 'get',
            url: BASE_URL+'/api/user/search?email='+ username,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                store.dispatch(setProfile(response.data));
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
            key: 'amount',
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
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
        },
        {
            title: 'city',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'ZIP',
            dataIndex: 'zip',
            key: 'zip',
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
            title: 'Action',
            key: 'action',
            render : (text, record) => (
                <Button type='link' onClick={()=>deliver(record)}>Deliver</Button>
            ),
        },
    ];


    return (

        <div>
            <Table columns={columns} dataSource={orders} rowKey="id" pagination={false} />

            <Modal
                title="Order Details"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
                width={800}
            >
                <OrderDetailsForm products={products}/>
                <Space/>
                <Button type={"primary"} onClick={confirm}>Confirm</Button>
            </Modal>
        </div>
    );
}

export default DeliveryList;