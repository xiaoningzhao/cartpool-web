import React from "react";
import {Menu} from "antd";
import {PieChartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const AdminMenu = () => {

    return (
        <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/store">Store</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
                <Link to="/productmanage">Product</Link>
            </Menu.Item>
        </Menu>
    );
}

export default AdminMenu;