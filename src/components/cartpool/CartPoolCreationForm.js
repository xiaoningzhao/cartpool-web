import React, {useState} from 'react';
import {
    Form,
    Input,
    Tooltip,
    Button, Alert, message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import {useStore} from "react-redux";
import {setCartPool} from "../../actions/user";
import {BASE_URL} from "../../config/constants";

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

const CartPoolCreationForm = () => {
    const [form] = Form.useForm();

    const store = useStore();

    const [errorMessage, setErrorMessage] = useState('');

    const createCartPool = (values) =>{
        axios({
            method: 'post',
            url: BASE_URL + '/api/cartpool/',
            data: {
                pool_id: values.pool_id,
                name: values.name,
                neighborhood: values.neighborhood,
                description: values.description,
                zip: values.zip,
                leader: store.getState().user.id
            },
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                store.dispatch(setCartPool(response.data.id))
                message.success('Create Cart Pool Successful!');
            })
            .catch(function (error) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.message);
            });
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={createCartPool}
            scrollToFirstError
        >
            {errorMessage.length > 0 && <Alert message={errorMessage} type="error" showIcon /> }

            <Form.Item
                name='pool_id'
                label={
                    <span>
            Pool ID&nbsp;
                        <Tooltip title="Must be unique">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input pool id',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='name'
                label='Pool Name'
                rules={[
                    {
                        required: true,
                        message: 'Please input pool name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='neighborhood'
                label='Neighborhood'
                rules={[
                    {
                        required: true,
                        message: 'Please input neighborhood!',
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

            <Form.Item
                name='description'
                label='Description'
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Create Pool
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CartPoolCreationForm
