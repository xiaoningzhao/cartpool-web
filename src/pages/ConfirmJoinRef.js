import React from "react";
import {useHistory, useLocation} from "react-router";
import axios from "axios";
import {BASE_URL} from "../config/constants";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ConfirmJoinRef = () => {

    let history = useHistory();
    let query = useQuery();

    let userId = query.get('userId');
    let poolId = query.get('poolId');
    let join = query.get('join');

    axios({
        method: 'get',
        url: BASE_URL+ '/api/user/verifyjoinpoolref?userId='+userId+'&poolId='+poolId+'&join='+join,
    })
        .then(function (response) {
            console.log(response);
            let message = '';
            if(join ==='true'){
                message = {status: 'success', title: 'Support Successful', subTitle: '', content: 'You support this request.'};
            }else{
                message = {status: 'success', title: 'Not Support Successful', subTitle: '', content: 'Your do not support this request'};
            }
            history.push('/result', message);
        })
        .catch(function (error) {
            console.log(error);
            const message = {status: 'error', title: 'Support Failed', subTitle: 'Failed', content: 'Support failed, please try again'};
            history.push('/result', message);
        });

    return <></>;
}

export default ConfirmJoinRef;