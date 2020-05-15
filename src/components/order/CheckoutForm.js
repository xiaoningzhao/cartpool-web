import React from 'react';
import {Form, Input, Button, Select, Modal, Divider, message} from 'antd';
import axios from "axios";
import MyShoppingCart from "./MyShoppingCart";
import {useStore} from "react-redux";
import {deleteStoreProducts} from "../../actions/shoppingCart";
import {useHistory} from "react-router";
import {BASE_URL} from "../../config/constants";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};



const CheckoutForm = () => {
    const [form] = Form.useForm();
    const store = useStore();
    const history = useHistory();

    const onFinish = (values) => {
        console.log(values);
        if ((store.getState().user.contribution <= -4) && (values.pickupMethod === 'OTHER')){
            Modal.confirm({
                title: 'Contribution Score',
                content: 'Your contribution score ('+ store.getState().user.contribution +') is low.  Continue proceed order?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                checkout(values);
            },
                onCancel() {
                console.log('cancel');
            },
        });
        }else{
            checkout(values);
        }
    }

    const checkout = (values) =>{
        axios({
            method: 'post',
            url: BASE_URL+'/api/order',
            data: {
                userId: store.getState().user.id,
                poolId: store.getState().user.pool,
                storeId: store.getState().user.shopStore,
                orderDetails: store.getState().shoppingCart.products.filter(p => p.store === store.getState().user.shopStore),
                amount:0,
                pickupMethod: values.pickupMethod,
                pickupUser: (values.pickupMethod === 'SELF'? store.getState().user.id : null),
                street:values.street,
                city:values.city,
                state:values.state,
                zip:values.zip
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                store.dispatch(deleteStoreProducts({store: store.getState().user.shopStore}));
                message.success('Order Placed Successful!');
                if(values.pickupMethod ==='SELF'){
                    history.push('/poolorder');
                }else{
                    history.push('/pickup');
                }
            })
            .catch(function (error) {
                console.log(error);
                message.error(error.response.data.message);
                //setErrorMessage(error.response.data.message);
            });
    }

    const onPickupChange = value => {
        switch (value) {
            case "SELF":
                console.log(value);
                return;
            case "OTHER":

                console.log(value);
                return;
            default:
                return;
        }
    };

    return (
        <Form {...formItemLayout} form={form} name="checkout" onFinish={onFinish} scrollToFirstError >
            <Divider orientation="left">Order Summary</Divider>
            <MyShoppingCart />
            <Divider orientation="left">How to Pickup</Divider>
            <Form.Item name="pickupMethod" label="Pickup Method" rules={[{ required: true }]}>
                <Select
                    placeholder="Select pickup method"
                    onChange={onPickupChange}
                    allowClear
                >
                    <Option value="SELF">Self Pick Up</Option>
                    <Option value="OTHER">Others Pick Up</Option>
                </Select>
            </Form.Item>

            <Divider orientation="left">Shipping Address</Divider>
            <Form.Item
                name='street'
                label='Street'
                rules={[
                    {
                        required: true,
                        message: 'Please input street!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='city'
                label='City'
                rules={[
                    {
                        required: true,
                        message: 'Please input city!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='state'
                label='State'
                rules={[
                    {
                        required: true,
                        message: 'Please input state!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='zip'
                label='Zipcode'
                rules={[
                    {
                        required: true,
                        message: 'Please input zipcode!',
                        whitespace: true,
                        max: 5,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Checkout
                </Button>
            </Form.Item>

        </Form>

    );
};

export default CheckoutForm
