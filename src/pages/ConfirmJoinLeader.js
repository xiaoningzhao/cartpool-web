import React from "react";
import {useHistory, useParams} from "react-router";
import axios from "axios";
import {BASE_URL} from "../config/constants";

const ConfirmJoinLeader = () => {

    let { userId, poolId, join } = useParams();
    let history = useHistory();

    axios({
        method: 'get',
        url: BASE_URL+ '/api/user/verifyjoinpoolleader?userId='+userId+'&poolId='+poolId+'&join='+join,
    })
        .then(function (response) {
            console.log(response);
            let message = '';
            if(join === 'true'){
                message = {status: 'success', title: 'Approved Successful', subTitle: '', content: 'You approved this request.'};
            }else{
                message = {status: 'success', title: 'Not Approved Successful', subTitle: '', content: 'Your did not approve this request'};
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

export default ConfirmJoinLeader;