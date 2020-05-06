import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Table, Button, InputNumber} from 'antd';
import {connect} from "react-redux";
import {deleteProduct, editQuantity} from "../../actions/shoppingCart";

const MyShoppingCart = ({products, deleteItem, editQuantity}) => {

    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
            render : (text, record) => (
                <InputNumber  min={1} value={record.quantity} onChange={(value)=>editQuantity(value, record)} />
            ),
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render : (text, record) => (
                <Button type='link' onClick={()=>deleteItem(record)} >DELETE</Button>
            ),
        },
    ];


    return (
            <Table columns={columns}
                   dataSource={products}
                   rowKey="productId"
                   pagination={false}
                   footer={(pageData) => {

                           let amount = 0;
                           let tax = 0;
                           let fee = 0;

                           pageData.forEach(({quantity, price}) => {
                               amount += quantity * price;
                           });

                           tax = amount * 0.0925;
                           fee = amount * 0.005;

                           let total = amount + tax + fee;

                       return <p> Amount: {total.toFixed(2)}  |   Tax:  {tax.toFixed(2)}   |   Fee: {fee.toFixed(2)}</p>
                   }}
            />
        );
}

const mapStateToProps = state => {
    return {
        products: state.shoppingCart.products.filter(p => p.store === state.user.shopStore)
    }
}

const mapDispatchToProps = dispatch => ({
    deleteItem(record){
        dispatch(deleteProduct({productId: record.productId, store: record.store }));
    },
    editQuantity(value,record){
        dispatch(editQuantity({productId: record.productId, storeId: record.store, quantity: value }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyShoppingCart)