import React from "react";
import PickupList from "../components/order/PickupList";
import {Divider} from "antd";

const Pickup = () => {

    return (
        <div>
            <Divider orientation="left">Pickup Orders</Divider>
            <PickupList />
        </div>

    );
}

export default Pickup;