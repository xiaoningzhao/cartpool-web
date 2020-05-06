import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Form, Table} from 'antd';

const OrderDetailsForm = ({products}) => {

    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Name',
            key: 'name',
            render: (record) => record.product.name
        },
        {
            title: 'Image',
            key: 'image',
            render: (record) => (<img alt="pic" width={50} height={50} src={record.product.imageUrl}/>)
        },
        {
            title: 'Brand',
            key: 'brand',
            render: (record) => record.product.brand
        },
        {
            title: 'Category',
            key: 'category',
            render: (record) => record.product.category
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Unit',
            key: 'unit',
            render: (record) => record.product.unit
        },
        {
            title: 'Price',
            key: 'price',
            render: (record) => record.product.price
        },
    ];


    return <Form><Table columns={columns} dataSource={products} rowKey="productId" pagination={false}/></Form>;
}

export default OrderDetailsForm