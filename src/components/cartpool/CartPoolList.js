import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Table, Input, Button, Space, message, Modal, Form, Alert, Checkbox, Divider, Tooltip} from 'antd';
import Highlighter from 'react-highlight-words';
import {LockOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons';
import axios from "axios";
import {connect} from "react-redux";
import {setCartPool} from "../../actions/user";
import {BASE_URL} from "../../config/constants";
import LoginForm from "../user/LoginForm";
import FirebaseLogin from "../user/FirebaseLogin";

class CartPoolList extends React.Component {

    state = {
        searchText: '',
        searchedColumn: '',
        cartPools: null,
        refMember:'',
        poolLeader:'',
        poolId: 0,
        visible: false,
    };

    componentDidMount() {
        //console.log(this.context);
        axios({
            method: 'get',
            url: BASE_URL+ '/api/cartpool',
            headers: {
                'Authorization': this.props.user.token
            }
        })
            .then(function (response) {
                console.log(response);
                message.success('Load Successful!');
                 this.setState({cartPools: response.data});
                //this.setState({cartPools: response.data});
                //return response.data;
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    setRef = (values) => {
        console.log(values.leader);
        if(values.leader===true){
            axios({
                method: 'get',
                url: BASE_URL+'/api/user/joinpoolleader?userId='+this.props.user.id+'&poolId='+ this.state.poolId,
                headers: {
                    'Authorization': this.props.user.token
                }
            })
                .then(function (response) {
                    console.log(response);
                    message.success('Sent Successful!');
                    const {setCartPool} = this.props
                    setCartPool(response.data.poolId, response.data.poolStatus);
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            if(values.refMember === '' || values.refMember === undefined || values.refMember === null){
                message.error('Please fill a reference member name.');
                return;
            }else{
                axios({
                    method: 'get',
                    url: BASE_URL+'/api/user/joinpoolref?userId='+this.props.user.id+'&poolId='+ this.state.poolId + '&refScreenName=' + values.refMember,
                    headers: {
                        'Authorization': this.props.user.token
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        message.success('Sent Successful!');
                        const {setCartPool} = this.props
                        setCartPool(response.data.poolId, response.data.poolStatus);
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error.response.data.message);
                        message.error(error.response.data.message);
                    });
            }
        }
    }

    join = record => {
        console.log(record.id);

        this.setState({ poolId: record.id })
        this.setState({ visible: true })

    };

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Pool ID',
                dataIndex: 'poolId',
                key: 'poolId',
                ...this.getColumnSearchProps('poolId'),
            },
            {
                title: 'Pool Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Neighborhood',
                dataIndex: 'neighborhood',
                key: 'neighborhood',
                ...this.getColumnSearchProps('neighborhood'),
            },
            {
                title: 'Zipcode',
                dataIndex: 'zip',
                key: 'zip',
                ...this.getColumnSearchProps('zip'),
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                ...this.getColumnSearchProps('description'),
            },
            {
                title: 'Action',
                key: 'action',
                render : (text, record) => (
                    <Button type='link' onClick={this.join.bind(this, record)}>Join</Button>
                ),
            },
        ];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.cartPools} rowKey="id"/>
                <Modal
                    title="Login"
                    visible={this.state.visible}
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <div>
                        <Form
                            name="form"
                            className="form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={(values) => this.setRef(values)}
                        >
                            <Form.Item
                                name="refMember"
                                label="Reference Member Name"
                                rules={[
                                    {
                                        message: 'Please input your reference member name!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="leader" valuePropName="checked" noStyle>
                                    <Checkbox>Send to pool leader</Checkbox>
                                </Form.Item>

                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    OK
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>

            );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        setCartPool: (poolId, poolStatus) => dispatch(setCartPool(poolId, poolStatus)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPoolList)