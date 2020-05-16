import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Store from "../pages/admin/store";
import Product from "../pages/product";
import LoginForm from "../components/user/LoginForm";
import Register from "../pages/register";
import CartPool from "../pages/cartpool";
import ShoppingCart from "../pages/shoppingcart";
import Checkout from "../pages/checkout";
import Order from "../pages/order";
import Pickup from "../pages/pickup";
import PoolOrder from "../pages/poolorder";
import Delivery from "../pages/delivery";
import ResultMessage from "../pages/resultmessage";
import Verification from "../pages/verification";
import ProductManage from "../pages/admin/productmanage";
import ConfirmJoinRef from "../pages/ConfirmJoinRef";
import ConfirmJoinLeader from "../pages/ConfirmJoinLeader";

const Routing = () => {

    return (
        <Switch>
            <Route path="/store" component={Store} />
            <Route path="/productmanage" component={ProductManage} />
            <Route path="/product" component={Product} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={Register}/>
            <Route path="/cartpool" component={CartPool} />
            <Route path="/shoppingcart" component={ShoppingCart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/order" component={Order} />
            <Route path="/pickup" component={Pickup} />
            <Route path="/poolorder" component={PoolOrder} />
            <Route path="/delivery" component={Delivery} />
            <Route path="/result" component={ResultMessage} />
            <Route path="/verification" component={Verification} />
            <Route path="/verifyjoinpoolref" component={ConfirmJoinRef} />
            <Route path="/verifyjoinpoolleader" component={ConfirmJoinLeader} />
            <Redirect to="/product"/>
        </Switch>
    );
}

export default Routing;