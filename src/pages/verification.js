import React from "react";
import {useHistory, useLocation} from "react-router";
import axios from "axios";
import {BASE_URL} from "../config/constants";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Verification = () => {

    let history = useHistory();
    let query = useQuery();

    let token = query.get('token');

    console.log(token);

    axios({
        method: 'get',
        url: BASE_URL+ '/api/user/verification?token='+token,
    })
        .then(function (response) {
            console.log(response);
            const message = {status: 'success', title: 'Verify Successful', subTitle: 'Welcome', content: 'Your email has been verified, please login to enjoy your shopping.'};
            history.push('/result', message);
        })
        .catch(function (error) {
            console.log(error);
            const message = {status: 'error', title: 'Verify Failed', subTitle: 'Failed', content: 'Verify email failed, please try again'};
            history.push('/result', message);
        });

    return <></>;
}

export default Verification;