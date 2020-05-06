import {Button, DatePicker, version} from "antd";
import React from "react";
import {Link, useHistory} from "react-router-dom";

function Store() {


    const history = useHistory();

    const c = () =>{
        let data = {title: 'hello', subTitle: 'jfdsklfjdskljfslk'};
        history.push('/success', data);
    }

    return (
        <div>
            <h1>antd version: {version}</h1>
            <DatePicker />
            <Button type="primary" style={{ marginLeft: 8 }} onClick={c}>
                Primary Button
            </Button>
        </div>
    );
}

export default Store;