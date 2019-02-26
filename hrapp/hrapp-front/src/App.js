import React, {Component} from 'react';
import {BrowserRouter, IndexRoute, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/profile/Profile';
import './App.css';
import {HOME_ROUTE, LOGIN_OR_REGISTER_ROUTE, LOGOUT_ROUTE, PROFILE_ROUTE} from './util/routes';
import Logout from './components/Logout';
import LoginOrRegister from './components/LoginOrRegister';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path={HOME_ROUTE} component={Navbar} />
                    <Route path={LOGOUT_ROUTE} component={Logout} />
                    <Route path={LOGIN_OR_REGISTER_ROUTE} component={LoginOrRegister} />
                    <Route path={PROFILE_ROUTE} component={Profile} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
