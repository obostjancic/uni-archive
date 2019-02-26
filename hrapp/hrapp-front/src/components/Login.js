import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Form, Input, Segment} from 'semantic-ui-react';
import axios from 'axios';
import {setUserInfo} from '../util/UserInfo';
import {PROFILE_ROUTE} from '../util/routes';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', loginSuccess: false };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value;

        this.setState({
            [event.target.name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        axios.post('/login', { username, password })
            .then(res => {
                setUserInfo(res.data, true);
                this.setState({ loginSuccess: true });
            })
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.loginSuccess) return <Redirect to={PROFILE_ROUTE} />;
        return (
            <Segment raised>
                <h3 className="ui dividing header">Login info</h3>
                <Form>
                    <Form.Field>
                        <label htmlFor="username-input">Username: </label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password-input">Password: </label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                    </Form.Field>
                    <Button className="ui button" type="button" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </Segment>
        );
    }
}

export default Login;
