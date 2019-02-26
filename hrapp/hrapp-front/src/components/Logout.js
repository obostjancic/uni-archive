import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {clearUserInfo} from '../util/UserInfo';
import {LOGIN_OR_REGISTER_ROUTE} from '../util/routes';

class Logout extends Component {
    render() {
        clearUserInfo();
        return <Redirect to={LOGIN_OR_REGISTER_ROUTE} />;
    }
}

export default Logout;
