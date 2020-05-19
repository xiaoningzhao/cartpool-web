import React from "react";
import {Menu} from "antd";
import {AppstoreOutlined, MailOutlined, BankOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const AdminMenu = () => {

    return (
        <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" icon={<BankOutlined />}>
                <Link to="/store">Store</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
                <Link to="/productmanage">Product</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<MailOutlined />}>
                <Link to="/sendmessage">Message</Link>
            </Menu.Item>
        </Menu>
    );
}

export default AdminMenu;