import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import 'antd/dist/antd.css'
import RegistrationForm from "./RegistrationForm";

const RegisterButton = () => {

    const [visible, setVisible] = useState(false);

    return (
        <span>
            <Button type="link" onClick={() => setVisible(true)}>
                Register
            </Button>
            <Modal
                title="Registration"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
            >
                <RegistrationForm/>
            </Modal>
        </span>
    );
};

export default RegisterButton