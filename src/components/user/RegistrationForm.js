import React, {useState} from 'react';
import {
    Form,
    Input,
    Tooltip,
    Button, Alert,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router";
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

const RegistrationForm = () => {
    const [form] = Form.useForm();

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');

    const register = (values) =>{
        axios({
            method: 'post',
            url: BASE_URL+'/api/user/registration',
            data: {
                email: values.email,
                password: values.password,
                screenName: values.screenName,
                nickname: values.nickname
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
                let link = 'http://localhost:3000/verification/' + response.data.token;
                const message = {status: 'success', title: 'Register Successful', subTitle: 'Please verify your email', content: 'Please check your mailbox to verify your email' };
                history.push('/result', message);
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
            name="register"
            onFinish={register}
            scrollToFirstError
        >
            {errorMessage.length > 0 && <Alert message={errorMessage} type="error" showIcon /> }

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="screenName"
                label={
                    <span>
            Screen Name&nbsp;
                        <Tooltip title="Screen Name">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your screen name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="nickname"
                label={
                    <span>
            Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm
