import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Alert, message, InputNumber, Select} from 'antd';
import axios from "axios";
import {BASE_URL} from "../../config/constants";
import {useStore} from "react-redux";
const { Option } = Select;

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};




const ProductForm = ({type, productData}) => {
    const [form] = Form.useForm();

    const store = useStore();

    const [shopStoreList, SetShopStoreList] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    const [pickStore, setPickStore] = useState('');

    useEffect(() => {loadStore();}, []);

    console.log(productData);

    const loadStore = () => {
        axios({
            method: 'get',
            url: BASE_URL+'/api/store',
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                SetShopStoreList(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const selectStore = (value, key) => {
        setPickStore(key);
    }


    const submit = (values) =>{

        setErrorMessage('');

        let url, method = '';
        if(type === 'edit'){
            url = BASE_URL+'/api/product';
            method = 'put';
        }else{
            url = BASE_URL+'/api/product';
            method = 'post';
        }

        axios({
            method: method,
            url: url,
            data: {
                productId: values.productId,
                name: values.name,
                description: values.description,
                brand: values.brand,
                category: values.category,
                imageUrl: values.imageUrl,
                unit: values.unit,
                price: values.price
            },
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                if(pickStore!==''){
                    assignStore(response.data.productId, pickStore);
                }

                message.success('Successful!');
            })
            .catch(function (error) {
                console.log(error);
                setErrorMessage(error.response.data.message);
            });
    }

    const assignStore = (productId, storeId) =>{

        console.log(storeId);

        let url = BASE_URL+'/api/product/addToStore';

        axios({
            method: 'post',
            url: url,
            data: {
                productId: productId,
                storeId: storeId.key
            },
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                // message.success('Successful!');
            })
            .catch(function (error) {
                console.log(error);
                // setErrorMessage(error.response.data.message);
            });
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="store"
            onFinish={submit}
            scrollToFirstError
        >
            {errorMessage.length > 0 && <Alert message={errorMessage} type="error" showIcon /> }

            {type === 'edit' &&
            <Form.Item
                name='productId'
                label='Product ID'
                initialValue = {productData.productId}
            >
                <Input disabled={true} />
            </Form.Item>
            }

            <Form.Item
                name='name'
                label='Name'
                initialValue = {productData.name}
                rules={[
                    {
                        required: true,
                        whitespace: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='imageUrl'
                label='Image URL'
                initialValue = {productData.imageUrl}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='brand'
                label='Brand'
                initialValue = {productData.brand}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='category'
                label='Category'
                initialValue = {productData.category}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='unit'
                label='Unit'
                initialValue = {productData.unit}
                rules={[
                    {
                        required: true,
                        whitespace: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='price'
                label='Price'
                initialValue = {productData.price}
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        type: 'number'
                    },
                ]}
            >
                <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item
                name='description'
                label='Description'
                initialValue = {productData.description}
            >
                <TextArea/>
            </Form.Item>

            <Form.Item name="store" label="Select a store" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a store"
                    onSelect={selectStore}
                    allowClear
                >
                    {shopStoreList.map(s => (
                        <Option value={s.id} key={s.id}>{s.name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm
