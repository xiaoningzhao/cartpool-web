import React from "react";
import {Button, Divider} from "antd";
import PoolOrderList from "../components/order/PoolOrderList";
import {Link} from "react-router-dom";

const PoolOrder = () => {

    return (
        <div>
            <Divider orientation="left">Orders Pool</Divider>
            <PoolOrderList/>
            <Divider orientation="left"> </Divider>
            <Button type="primary"><Link to='/pickup'>Skip: Check Pick up List >></Link></Button>
        </div>

    );
}

export default PoolOrder;