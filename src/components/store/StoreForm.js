import React, {useState} from 'react';
import {Form, Input, Button, Alert, message} from 'antd';
import axios from "axios";
import {BASE_URL} from "../../config/constants";
import {useStore} from "react-redux";

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

const StoreForm = ({type, storeData}) => {
    const [form] = Form.useForm();

    const store = useStore();

    const [errorMessage, setErrorMessage] = useState('');

    console.log(storeData);

    const submit = (values) =>{

        setErrorMessage('');
        console.log(values);

        let url, method = '';
        if(type === 'edit'){
            url = BASE_URL+'/api/store';
            method = 'put';
        }else{
            url = BASE_URL+'/api/store';
            method = 'post';
        }

        axios({
            method: method,
            url: url,
            data: {
                id: values.id,
                name: values.name,
                street: values.street,
                city: values.city,
                state: values.state,
                zip: values.zip
            },
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                message.success('Successful!');
            })
            .catch(function (error) {
                console.log(error);
                setErrorMessage(error.response.data.message);
            });
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="store"
            onFinish={submit}
            scrollToFirstError
        >
            {errorMessage.length > 0 && <Alert message={errorMessage} type="error" showIcon /> }

            {type === 'edit' &&
                <Form.Item
                    name='id'
                    label='Store ID'
                    initialValue = {storeData.id}
                >
                    <Input disabled={true} />
                </Form.Item>
            }

            <Form.Item
                name='name'
                label='Name'
                initialValue = {storeData.name}
                rules={[
                    {
                        required: true,
                        message: 'Please input a store name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='street'
                label='Street'
                initialValue = {storeData.street}
                rules={[
                    {
                        required: true,
                        message: 'Please input street!',
                        whitespace: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='city'
                label='City'
                initialValue = {storeData.city}
                rules={[
                    {
                        required: true,
                        message: 'Please input city!',
                        whitespace: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='state'
                label='State'
                initialValue = {storeData.state}
                rules={[
                    {
                        required: true,
                        message: 'Please input state!',
                        whitespace: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='zip'
                label='Zipcode'
                initialValue = {storeData.zip}
                rules={[
                    {
                        required: true,
                        message: 'Please input zipcode!',
                        whitespace: true,
                        max: 5,
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default StoreForm
