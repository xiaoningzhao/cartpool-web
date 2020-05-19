import React from "react";
import {Button, Form, Input, message} from "antd";
import axios from "axios";
import {BASE_URL} from "../config/constants";
import {useStore} from "react-redux";
const { TextArea } = Input;

const SendMessageForm = ()=> {
    const store = useStore();

    const sendMessage = (values) =>{

        axios({
            method: 'post',
            url: BASE_URL + '/api/user/email',
            data: {
                userId: store.getState().user.id,
                toUserScreenName: values.recipient,
                subject: values.subject,
                content: values.content
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
                message.success('Sent Message Successful!');
            })
            .catch(function (error) {
                console.log(error.response.data);
                message.error(error.response.data.message);
            });
    }

    return (

        <Form
            name="sendMessage"
            onFinish={sendMessage}
            scrollToFirstError
        >
            <Form.Item
                name="recipient"
                label="Recipient Screen Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input Recipient Name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="subject"
                label="Subject"
                rules={[
                    {
                        required: true,
                        message: 'Please input subject',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="content"
                label="Content"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SendMessageForm