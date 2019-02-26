import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import Login from './Login';
import Register from './Register';
import '../stylesheets/LoginOrRegister.css';

class LoginOrRegister extends Component {
    render() {
        return (
            <Grid columns="equal">
                <Grid.Column>
                    <Login />
                </Grid.Column>
                <Grid.Column>
                    <Register />
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginOrRegister;
