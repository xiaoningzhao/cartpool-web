import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Table, Input, Button, Space, message} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import {connect} from "react-redux";
import {setCartPool} from "../../actions/user";
import {BASE_URL} from "../../config/constants";

class CartPoolList extends React.Component {

    state = {
        searchText: '',
        searchedColumn: '',
        cartPools: null
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

    join = record => {
        console.log(record.id);

        axios({
            method: 'put',
            url: BASE_URL+'/api/user/'+this.props.user.id+'/joinpool/'+ record.id,
            headers: {
                'Authorization': this.props.user.token
            }
        })
            .then(function (response) {
                console.log(response);
                message.success('Load Successful!');
                const {setCartPool} = this.props
                setCartPool(response.data.poolId);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });



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
        return <Table columns={columns} dataSource={this.state.cartPools} rowKey="id"/>;
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
        setCartPool: (poolId) => dispatch(setCartPool(poolId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPoolList)