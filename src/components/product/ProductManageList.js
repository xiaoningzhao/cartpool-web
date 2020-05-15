import React, {useEffect, useState} from "react";
import {Button, Input, message, Modal, Space, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux"
import {BASE_URL} from "../../config/constants";
import ProductForm from "./ProductForm";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

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
                message.error(error.response.data.message);
            });
    }

    const edit = (record) => {
        console.log(record);
        setSelectedProduct(record);
        setVisible(true);
    }

    const deleteProduct = (record) => {
        const url = BASE_URL+'/api/product/'+record.productId;
        axios({
            method: 'delete',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                getProducts();
                message.success('Delete Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
                message.error(error.response.data.message);
            });
    }

    const create = () => {
        setCreateVisible(true);
    }

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchInput, setSearchInput] = useState();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        // this.setState({
        //     searchText: selectedKeys[0],
        //     searchedColumn: dataIndex,
        // });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
        // this.setState({ searchText: '' });
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        setSearchInput(node);
                        // this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>{
            if(record[dataIndex] !== null) {
                return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
            }},
        // onFilterDropdownVisibleChange: visible => {
        //     if (visible) {
        //         setTimeout(() => searchInput.select());
        //     }
        // },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text}
                />
            ) : (
                text
            ),
    });


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
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            ...getColumnSearchProps('brand'),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps('category'),
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            ...getColumnSearchProps('unit'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            ...getColumnSearchProps('price'),
        },
        {
            title: 'Action',
            key: 'action',
            render : (text, record) => (
                <div>
                    <Button type='link' onClick={()=>edit(record)}>Edit</Button> |
                    <Button type='link' onClick={()=>deleteProduct(record)}>Delete</Button>
                </div>
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