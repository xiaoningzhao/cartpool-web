import React, {useState} from 'react';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css'
import '../styles/home.css'
import {Affix, Button, Layout} from 'antd';
import LogoutButton from "../components/user/LogoutButton";
import LoginButton from "../components/user/LoginButton";
import ProfileButton from "../components/user/ProfileButton";
import {connect} from "react-redux";
import StoreSelectionButton from "../components/StoreSelectionButton";
import Routing from "../config/routing";
import DefaultMenu from "../components/menu/DefaultMenu";
import AdminMenu from "../components/menu/AdminMenu";
import UserMenu from "../components/menu/UserMenu";

const { Header, Sider, Content, Footer } = Layout;

const Home = ({userInfo}) => {
    const [collapsed, setCollapsed] = useState(false);

    let menu;
    switch (userInfo.role){
        case 'ROLE_USER':
            menu = <UserMenu/>
            break;
        case 'ROLE_ADMIN':
            menu = <AdminMenu/>
            break;
        default:
            menu = <DefaultMenu/>;
    }

    return(
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={()=>{setCollapsed(!collapsed)}}>
                <div className="logo" >CartPool</div>
                {menu}
            </Sider>
            <Layout className="site-layout">
                <Affix offsetTop={0}>
                    <Header className="site-layout-background" style={{ padding: 0}} >

                        <span style={{ marginLeft: 50 }}>
                        <span>Welcome {userInfo.screenName}</span>
                        {userInfo.isLogin ? <LogoutButton /> :(<span><Button type='link'><Link to="/register">Register</Link></Button><LoginButton /></span>)}
                        <ProfileButton/>
                        <StoreSelectionButton/>
                        </span>

                    </Header>
                </Affix>
                <Content style={{ margin: '0 16px'}}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Routing />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Xiaoning Zhao</Footer>
            </Layout>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        userInfo: state.user
    }
}

export default connect(mapStateToProps)(Home);