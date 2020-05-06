import {Button, Result} from "antd";
import React from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";

const ResultMessage = () => {

    const location = useLocation();

    console.log(location);

    return (
        <Result
            status={location.state.status}
            title={location.state.title}
            subTitle={location.state.subTitle}
            extra={[
                <Button type="primary">
                    <Link to={'/product'}>Home</Link>
                </Button>,
            ]}
        >
            {location.state.content}
        </Result>
    );
}

export default ResultMessage;