import React, {useEffect, useState} from "react";
import {Button, message, Modal, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux"
import {BASE_URL} from "../../config/constants";
import ProductForm from "./ProductForm";

const ProductManageList = () => {

    const store = useStore();

    useEffect(() => {getProducts();}, []);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [visible, setVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);

    const getProducts = () => {
        const url = BASE_URL+'/api/product/';
        axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                setProducts(response.data);
                message.success('Load Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const edit = (record) => {
        console.log(record);
        setSelectedProduct(record);
        setVisible(true);
    }

    const create = () => {
        setCreateVisible(true);
    }

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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                <Button type='link' onClick={()=>edit(record)}>Edit</Button>
            ),
        },
    ];


    return (

        <div>
            <Button type='primary' onClick={()=>create()}>Create Product</Button>
            <Table columns={columns} dataSource={products} rowKey="id" pagination={false} />

            <Modal
                title="Edit Product"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => {
                    setVisible(false);
                    getProducts();
                }}
                width={800}
            >
                <ProductForm type={'edit'} productData={selectedProduct}/>
            </Modal>

            <Modal
                title="Create Product"
                visible={createVisible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => {
                    setCreateVisible(false);
                    getProducts();
                }}
                width={800}
            >
                <ProductForm type={'create'} productData={{}}/>
            </Modal>

        </div>
    );
}

export default ProductManageList;