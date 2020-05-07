import React, {useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import firebaseConfig from "../../config/firebaseConfig";
import axios from "axios";
import {BASE_URL} from "../../config/constants";
import {setLogin, setProfile, setToken} from "../../actions/user";
import {message} from "antd";
import {useStore} from "react-redux";
import {useHistory} from "react-router";

// Configure Firebase.
const config = firebaseConfig;
firebase.initializeApp(config);

const FirebaseLogin = () => {

    const store = useStore();
    const history = useHistory();

    useEffect(() => {checkLogin();}, []);

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        // signInSuccessUrl: '/product',
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false
        }
    };
    //
    const login = (user) =>{
        if(user !== null) {
            console.log(user.email);
            axios({
                method: 'post',
                url: BASE_URL + '/api/user/firebaselogin',
                data: {
                    email: user.email,
                    screenName: user.displayName,
                    nickname: user.displayName
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function (response) {
                    console.log(response);
                    const token = response.headers['token'];
                    store.dispatch(setLogin(true));
                    store.dispatch(setToken(token));
                    fetchUserInfo(user.email);
                    history.push('/product');
                    message.success('Login Successful!');
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }

    const fetchUserInfo = (username) =>{
        axios({
            method: 'get',
            url: BASE_URL+'/api/user/search?email='+ username,
            headers: {
                'Authorization': store.getState().user.token
            }
        })
            .then(function (response) {
                console.log(response);
                store.dispatch(setProfile(response.data));
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    const checkLogin = () =>{
        firebase.auth().onAuthStateChanged(
            (user) => {login(user)}
        );
    }


    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    );
}

export default FirebaseLogin