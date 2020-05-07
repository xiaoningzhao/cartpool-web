import React, {useEffect, useState} from "react";
import {Button, message, Modal, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux"
import {BASE_URL} from "../../config/constants";
import StoreForm from "./StoreForm";

const StoreList = () => {

    const store = useStore();

    useEffect(() => {getStores();}, []);
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [visible, setVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);

    const getStores = () => {
        const url = BASE_URL+'/api/store/';
        axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                setStores(response.data);
                message.success('Load Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const edit = (record) => {
        console.log(record);
        setSelectedStore(record);
        setVisible(true);
    }

    const create = () => {
        setCreateVisible(true);
    }

    const columns = [
        {
            title: 'Store ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
        },
        {
            title: 'city',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'ZIP',
            dataIndex: 'zip',
            key: 'zip',
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
            <Button type='primary' onClick={()=>create()}>Create Store</Button>
            <Table columns={columns} dataSource={stores} rowKey="id" pagination={false} />

            <Modal
                title="Edit Store"
                visible={visible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => {
                    setVisible(false);
                    getStores();
                }}
                width={800}
            >
                <StoreForm type={'edit'} storeData={selectedStore}/>
            </Modal>

            <Modal
                title="Create Store"
                visible={createVisible}
                footer={null}
                destroyOnClose={true}
                onCancel={() => {
                    setCreateVisible(false);
                    getStores();
                }}
                width={800}
            >
                <StoreForm type={'create'} storeData={{}}/>
            </Modal>

        </div>
    );
}

export default StoreList;