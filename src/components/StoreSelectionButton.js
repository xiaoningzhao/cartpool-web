import React, {useState} from 'react';
import {Button, Form, Modal, Select} from 'antd';
import 'antd/dist/antd.css'
import axios from "axios";
import {setShopStore} from "../actions/user";
import {useStore} from "react-redux";
import {BASE_URL} from "../config/constants";

const { Option } = Select;

const StoreSelectionButton = () => {

    const store = useStore();

    const [visible, setVisible] = useState(false);
    const [shopStoreList, SetShopStoreList] = useState([]);

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
                setVisible(true);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const selectStore = (value, key) => {
        store.dispatch(setShopStore({id: value, name: key.children}));
    }

    return (
        <span>
            <Button type="primary" onClick={loadStore}>
                {store.getState().user.shopStore===''? <p>Select Store</p> : <p>{store.getState().user.storeName}</p> }
            </Button>
            <Modal
                title="Select a store"
                visible={visible}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={() => setVisible(false)}>
                        OK
                    </Button>
                ]}
            >
                <Form
                    name="selectStore"
                    onFinish={selectStore}
                    scrollToFirstError
                >
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
                </Form>
            </Modal>
        </span>
    );
};

export default StoreSelectionButton