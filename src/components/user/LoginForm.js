import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Form, Input, Button, Checkbox, message, Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios";
import {setLogin, setProfile, setToken} from "../../actions/user";
import {useStore} from "react-redux";
import {useHistory} from "react-router";
import {BASE_URL} from "../../config/constants";

const LoginForm = () => {

    const store = useStore();

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');

    const login = (values) =>{
        axios({
            method: 'post',
            url: BASE_URL+'/login',
            data: {
                username: values.username,
                password: values.password
            },
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function (response) {
                console.log(response);
                const token = response.headers['token'];
                store.dispatch(setLogin(true));
                store.dispatch(setToken(token));
                fetchUserInfo(values.username);
                history.push('/product');
                message.success('Login Successful!');
            })
            .catch(function (error) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.message);
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

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={login}
        >
            {errorMessage.length > 0 && <Alert message={errorMessage} type="error" showIcon /> }

            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};



export default LoginForm