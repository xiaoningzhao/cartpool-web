import React from "react";
import CheckoutForm from "../components/order/CheckoutForm";
import {Button, Divider} from "antd";
import {Link} from "react-router-dom";

const Checkout = () => {

    return (
        <div>
            <CheckoutForm />
            <Divider orientation="left"> </Divider>
            <Button type="primary"><Link to='/shoppingcart'>  &lt;&lt; Shopping Cart </Link></Button>
        </div>
    );
}

export default Checkout;