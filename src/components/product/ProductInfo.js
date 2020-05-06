import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {Button, Card, message,notification} from "antd";
import {useStore} from "react-redux";
import {addProduct} from "../../actions/shoppingCart";

const { Meta } = Card;

const ProductInfo = ({productInfo}) => {

    const store = useStore();

    const addShoppingCart = () => {
        if(store.getState().user.isLogin){
            if(store.getState().user.pool !== '' && store.getState().user.pool !== null) {
                if (store.getState().user.shopStore !== '' && store.getState().user.shopStore !== null) {
                    productInfo.quantity = 1;
                    productInfo.store = store.getState().user.shopStore;
                    store.dispatch(addProduct({product: productInfo}));
                    message.success('Added to your shopping cart');
                } else {
                    notification.info({
                        message: 'Please Select Store',
                        description:
                            'Please select a store to shopping.',
                    });
                }
            }else{
                notification.info({
                    message: 'Please Join Pool',
                    description:
                        'Please join a pool first to shopping.',
                });
            }
        }else{
            notification.info({
                message: 'Please Login',
                description:
                    'Please Login to enjoy your shopping trip.',
            });
        }

    }

    return (
        <Card
            cover={
                <img
                    alt="pic"
                    src={productInfo.imageUrl}
                />
            }
            actions={
                [<Button onClick={addShoppingCart}>add to cart</Button>]
            }
        >
            <Meta
                title={productInfo.name}
            />
            <p>{productInfo.description}</p>
            <p>${productInfo.price}</p>
        </Card>
    );
};

export default ProductInfo