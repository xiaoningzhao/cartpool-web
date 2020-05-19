import React from "react";
import {Menu} from "antd";
import {FileTextOutlined, AppstoreOutlined, MailOutlined, ShoppingCartOutlined, TeamOutlined, ShoppingOutlined, CarOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const UserMenu = () => {

    return (
        <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" icon={<AppstoreOutlined />}>
                <Link to="/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
                <Link to="/cartpool">CartPool</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
                <Link to="/shoppingcart">ShoppingCart</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<FileTextOutlined />}>
                <Link to="/order">Order</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<ShoppingOutlined />}>
                <Link to="/pickup">Pick Up</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<CarOutlined />}>
                <Link to="/delivery">Delivery</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<MailOutlined />}>
                <Link to="/sendmessage">Message</Link>
            </Menu.Item>
        </Menu>
    );
}

export default UserMenu;