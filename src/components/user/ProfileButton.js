import React, {useState} from 'react';
import {Button, Drawer} from 'antd';
import 'antd/dist/antd.css'
import LoginStatus from "./Profile";

const ProfileButton = () => {

    const [visible, setVisible] = useState(false);

    return (
        <span>
            <Button type="link" onClick={() => setVisible(true)}>
                My Profile
            </Button>
            <Drawer
                title="My Profile"
                placement="right"
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                <LoginStatus />
            </Drawer>
        </span>
    );
};

export default ProfileButton