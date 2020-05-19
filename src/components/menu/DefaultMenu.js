import React from "react";
import {Menu} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const DefaultMenu = () => {

    return (
        <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" icon={<AppstoreOutlined />}>
                <Link to="/product">Product</Link>
            </Menu.Item>
            {/*<Menu.Item key="2" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/cartpool">CartPool</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="3" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/shoppingcart">ShoppingCart</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="5" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/order">Order</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="6" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/pickup">Pick Up</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="7" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/delivery">Delivery</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="8" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/store">Store</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="9" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/poolorder">Pool Order</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="10" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/store">Store</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="11" icon={<PieChartOutlined />}>*/}
            {/*    <Link to="/productmanage">Product</Link>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );
}

export default DefaultMenu;