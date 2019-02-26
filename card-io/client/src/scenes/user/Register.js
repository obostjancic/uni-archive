import React, { Component } from 'react';
import { Form, Header, Loader, Segment } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authActions from '../../redux/auth';
import * as ROUTE from '../../common/routes';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onInputChange(event, data) {
        this.setState({ [data.name]: data.value });
    }
    onSubmit(event, data) {
        this.props.actions.auth.register(this.state);
    }
    render() {
        if (this.props.auth.isLoggedIn) return (<Redirect to={ROUTE.BOARDS} />);
        return (
            <Segment>
                {this.props.auth.fetching && <Loader active />}
                <Header>Create a new account</Header>
                <Form>
                    <Form.Field>
                        <Form.Input
                            name="email"
                            label="E-mail address"
                            onChange={this.onInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            name="firstName"
                            label="First name"
                            onChange={this.onInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            name="lastName"
                            label="Last name"
                            onChange={this.onInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.onInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            onChange={this.onInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Button onClick={this.onSubmit}>Sign up</Form.Button>
                    </Form.Field>
                </Form>
            </Segment>
        );
    }
}

function mapStateToProps(store) {
    return {
        auth: { ...store.auth },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            auth: bindActionCreators(authActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

