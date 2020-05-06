import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import 'antd/dist/antd.css'
import CartPoolCreationForm from "./CartPoolCreationForm";

const CartPoolCreationButton = () => {

    const [visible, setVisible] = useState(false);

    return (
        <span>
            <Button type="primary" onClick={() => setVisible(true)}>
                Create Cart Pool
            </Button>
            <Modal
                title="Create Cart Pool"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
            >
                <CartPoolCreationForm/>
            </Modal>
        </span>
    );
};

export default CartPoolCreationButton