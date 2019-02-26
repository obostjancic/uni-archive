import React, { Component } from 'react';
import { Form, Header, Loader, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authActions from '../../redux/auth';
import * as ROUTE from '../../common/routes';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onInputChange(event, data) {
        this.setState({ [data.name]: data.value });
    }
    onSubmit(event, data) {
        this.props.actions.auth.login(this.state);
    }
    render() {
        if (this.props.auth.isLoggedIn) return (<Redirect to={ROUTE.BOARDS} />);
        return (
            <Segment>
                {this.props.auth.fetching && <Loader active />}
                <Header>Sign in to your account</Header>
                <Form>
                    <Form.Field>
                        <Form.Input
                            name="email"
                            label="E-Mail"
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
                        <Form.Button onClick={this.onSubmit}>Sign in</Form.Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
