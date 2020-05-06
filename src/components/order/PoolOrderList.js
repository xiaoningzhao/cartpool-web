import React, {useEffect, useState} from "react";
import {Button, message, Modal, notification, Space, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux"
import OrderDetailsForm from "./OrderDetailsForm";
import {BASE_URL} from "../../config/constants";

const PoolOrderList = () => {

    const store = useStore();

    useEffect(() => {getOrder();}, []);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const getOrder = () => {
        const url = BASE_URL+'/api/order/pickup/pool?userId='+store.getState().user.id+'&poolId='+store.getState().user.pool;
        axios({
            method: 'get',
            url: url,
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
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

    const showDetail = (record) => {
        console.log(record.orderDetails);
        setProducts(record.orderDetails);
        //setSelectedOrder(record.id);
        setVisible(true);
    }

    const confirm = () => {
        console.log(selectedRowKeys);
        const url = BASE_URL+'/api/order/pickup/pickupuser/batch/'+store.getState().user.id;
        axios({
            method: 'put',
            url: url,
            data:selectedRowKeys,
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
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
            sorter: (a, b) => a.id - b.id,
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
            title: 'Detail',
            key: 'detail',
            render : (text, record) => (
                <Button type='link' onClick={()=>showDetail(record)}>Details</Button>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys)=> setSelectedRowKeys(selectedRowKeys),
    };

    const selectOrders = () =>{
        let o = orders.filter(order => order.storeId === store.getState().user.shopStore);
        if(selectedRowKeys.length>10){
            notification.warn({
                message: 'Too Many Orders',
                description:
                    'Please select less than 10 orders',
            });
        }else{
            let isOk = true;
            o.sort((a, b)=> a.id-b.id);
            //console.log(o);
            selectedRowKeys.sort((a,b)=>a-b);
            //console.log(selectedRowKeys);
            for(let i=0,len=selectedRowKeys.length;i<len;i++){
                if(o[i].id !== selectedRowKeys[i]){
                    isOk = false;
                    break;
                }
            }
            if(isOk){
                console.log('success');
                setSelectedOrder(selectedRowKeys);
                confirm();
            }else{
                notification.warn({
                    message: 'Please Pick Order Sequentially',
                    description:
                        'Please Pick Order Sequentially',
                });
            }

        }
    }

    return (

        <div>
            <span style={{ marginLeft: 8 }}>
                {`Selected ${selectedRowKeys.length} items`}
            </span>
            <Table columns={columns}
                   rowSelection={rowSelection}
                   dataSource={store.getState().user.shopStore === ''? orders : orders.filter(order => order.storeId === store.getState().user.shopStore)}
                   rowKey="id"
                   pagination={false}
            />
            <span><Button type='primary' onClick={selectOrders}>Help to Pick Up</Button></span>

            <Modal
                title="Order Details"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
                width={800}
            >
                <OrderDetailsForm products={products}/>
                {/*<Space/>*/}
                {/*<Button type={"primary"} onClick={confirm}>Confirm</Button>*/}
            </Modal>
        </div>
    );
}

export default PoolOrderList;