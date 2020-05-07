import React, {useEffect, useState} from "react";
import ProductInfo from "./ProductInfo";
import {Col, Row} from "antd";
import axios from "axios";
import {connect} from "react-redux";
import {BASE_URL} from "../../config/constants";

const ProductList = ({userInfo}) => {

    // const store = useStore();

    const initialState = [
        {
            name: '',
            description: '',
            image_url:'',
            brand: '',
            category:'',
            unit:'',
            price:0.0
        }
    ];

    const [products, setProducts] = useState(initialState);

    useEffect(() => {getProducts();}, [userInfo.shopStore]);

    const getProducts = () =>{
        let url = '';
        //let storeId = store.getState().user.shopStore;
        if(userInfo.shopStore === ''){
            url = BASE_URL+'/api/product';
        }else{
            url = BASE_URL+'/api/product/store/'+ userInfo.shopStore;
        }

        axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': userInfo.token
            }
        })
            .then(function (response) {
                console.log(response);
                setProducts(response.data);
                //message.success('Load Successful!');
                // return response.data;
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    return (
        // <div>
        //     <Button onClick={getProducts}>load</Button>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>

            {
                products.map((product, idx) => (
                    <Col className="gutter-row" span={6} key={idx} >
                        <div><ProductInfo productInfo={product}/></div>
                    </Col>
                ))
            }

        </Row>
        // </div>
    );
}

const mapStateToProps = state => {
    return {
        userInfo: state.user
    }
}

export default connect(mapStateToProps)(ProductList);