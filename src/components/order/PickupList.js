import React, {useEffect, useState} from "react";
import {Button, Divider, message, Modal, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux"
import OrderDetailsForm from "./OrderDetailsForm";
import {BASE_URL} from "../../config/constants";
import QRCode from 'qrcode.react';

const PickupList = () => {

    const store = useStore();

    useEffect(() => {getOrder();}, []);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [visible, setVisible] = useState(false);

    const getOrder = () => {
        const url = BASE_URL+'/api/order/pickup/user/'+store.getState().user.id;
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

    const pickup = (record) => {
        console.log(record.orderDetails);
        setProducts(record.orderDetails);
        setSelectedOrder(record.id);
        setVisible(true);
    }

    const confirm = () => {
        const url = BASE_URL+'/api/order/pickup/' + selectedOrder;
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
            title: 'creationTime',
            dataIndex: 'creationTime',
            key: 'creationTime',
            // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render : (text, record) => (
                <Button type='link' onClick={()=>pickup(record)}>PickUp</Button>
            ),
        },
    ];


    return (

        <div>
            <Table columns={columns}
                   dataSource={store.getState().user.shopStore === ''? orders : orders.filter(order => order.storeId === store.getState().user.shopStore)}
                   rowKey="id"
                   pagination={false}
            />

            <Modal
                title="Order Details"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
                width={800}
            >
                <OrderDetailsForm products={products}/>
                <Divider orientation="left">QR Code</Divider>
                <QRCode id={selectedOrder} value={selectedOrder}/>
                <Divider orientation="left"> </Divider>
                <Button type={"primary"} onClick={confirm}>Confirm</Button>

            </Modal>
        </div>
        );
}

export default PickupList;