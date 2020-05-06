import React from "react";
import MyShoppingCart from "../components/order/MyShoppingCart";
import {Link} from "react-router-dom";
import {Button, Divider} from "antd";

const ShoppingCart = () => {

    return (
        <div>
            <MyShoppingCart/>
            <Divider orientation="left"> </Divider>
            <Button type="primary"><Link to='/checkout'>Check Out >></Link></Button>
        </div>
    );
}

export default ShoppingCart;