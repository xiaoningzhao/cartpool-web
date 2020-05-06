import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import 'antd/dist/antd.css'
import LoginForm from "./LoginForm";

const LoginButton = () => {

    const [visible, setVisible] = useState(false);

    return (
        <span>
            <Button type="link" onClick={() => setVisible(true)}>
                Login
            </Button>
            <Modal
                title="Login"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
            >
                <LoginForm/>
            </Modal>
        </span>
    );
};

export default LoginButton