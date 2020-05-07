import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/home.css';
import {connect} from "react-redux";
import LogoutButton from "./LogoutButton";
import {Alert, Avatar, Card} from "antd";
import LoginButton from "./LoginButton";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

const Profile = ({userInfo}) => {

    return (
        <div>
            <Card title={userInfo.isLogin?'My Profile': 'Not Login' }>
                <span><Avatar size="large" icon={<UserOutlined />} /></span>
                <p>Name: {userInfo.screenName}</p>
                <p>Nickname: {userInfo.nickname}</p>
                <p>Email: {userInfo.username}</p>
                <p>Role: {userInfo.role}</p>
                <p>Cart Pool: {userInfo.pool}</p>
                <p>Contribution Score:
                    {userInfo.contribution>-4 && <Alert message={userInfo.contribution} type="success" showIcon />}
                    {userInfo.contribution<=-6 && <Alert message={userInfo.contribution} type="error" showIcon />}
                    {(userInfo.contribution>-6 && userInfo.contribution<=-4) && <Alert message={userInfo.contribution} type="warning" showIcon />}
                </p>
            </Card>
            {userInfo.isLogin ? (
                <LogoutButton />
            ) : (
                <LoginButton />
            )}
        </div>

    );
};

const mapStateToProps = state => {
    return {
        userInfo: state.user
    }
}

export default connect(mapStateToProps)(Profile)