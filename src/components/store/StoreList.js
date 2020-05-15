import React, {useEffect, useState} from "react";
import {Button, Input, message, Modal, Space, Table} from "antd";
import axios from "axios";
import {useStore} from "react-redux"
import {BASE_URL} from "../../config/constants";
import StoreForm from "./StoreForm";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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

    const deleteStore = (record) => {
        const url = BASE_URL+'/api/store/'+record.id;
        axios({
            method: 'delete',
            url: url,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                getStores();
                message.success('Delete Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
                message.error(error.response.data.message);
            });
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
            title: 'Store ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            ...getColumnSearchProps('street'),
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            ...getColumnSearchProps('city'),
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            ...getColumnSearchProps('state'),
        },
        {
            title: 'ZIP',
            dataIndex: 'zip',
            key: 'zip',
            ...getColumnSearchProps('zip'),
        },
        {
            title: 'Action',
            key: 'action',
            render : (text, record) => (
                <div>
                    <Button type='link' onClick={()=>edit(record)}>Edit</Button> |
                    <Button type='link' onClick={()=>deleteStore(record)}>Delete</Button>
                </div>
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