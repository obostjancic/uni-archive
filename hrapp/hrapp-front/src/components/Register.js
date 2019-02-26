import React, {Component} from 'react';
import {Button, Form, Input, Radio, Segment, TextArea} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import axios from 'axios/index';
import {DateTimePicker} from 'react-widgets';

import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

import 'react-widgets/dist/css/react-widgets.css';
import 'react-datepicker/dist/react-datepicker.css';
import {LOGIN_ROUTE} from '../util/routes';

momentLocalizer(moment);

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: new Date(),
            placeOfBirth: '',
            telephone: '',
            gender: 'Male',
            registerSuccess: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleDateChange(newDate) {
        this.setState({ birthday: newDate });
    }
    handleRadioChange(event, { value }) {
        this.setState({ gender: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const {
            username, password, firstName, lastName, placeOfBirth, birthdayDate, telephone, gender, description
        } = this.state;
        const birthday = moment(birthdayDate).format('x');
        const requestBody = {
            username,
            password,
            person: {
                firstName, lastName, placeOfBirth, birthday, telephone, gender, description
            }
        };
        console.log(requestBody);
        axios.post('/user/register', requestBody)
            .then(this.setState({ registerSuccess: true }))
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.registerSuccess) return <Redirect to={LOGIN_ROUTE} />;
        return (
            <Segment raised>
                <h3 className="ui dividing header">Account info</h3>
                <Form>
                    <Form.Field>
                        <label htmlFor="username">Username: </label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password">Password: </label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                    </Form.Field>
                    <h3 className="ui dividing header">Personal info</h3>
                    <div className="three fields">
                        <Form.Field>
                            <label htmlFor="firstName">First name: </label>
                            <Input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                onChange={this.handleInputChange}
                                value={this.state.firstName}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="lastName">Last name: </label>
                            <Input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                onChange={this.handleInputChange}
                                value={this.state.lastName}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="genderRadioGroup">Gender:</label>
                            <Radio
                                label="Male"
                                name="genderRadioGroup"
                                value="Male"
                                checked={this.state.gender === 'Male'}
                                onChange={this.handleRadioChange}
                            />
                            <br />
                            <Radio
                                label="Female"
                                name="genderRadioGroup"
                                value="Female"
                                checked={this.state.gender === 'Female'}
                                onChange={this.handleRadioChange}
                            />
                        </Form.Field>
                    </div>
                    <div className="three fields">
                        <Form.Field>
                            <label htmlFor="birthday">Birthday: </label>
                            <DateTimePicker
                                name="birthday"
                                format="DD.MM.YYYY."
                                time={false}
                                onChange={this.handleDateChange}
                                value={this.state.birthday}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="placeOfBirth">Place of birth: </label>
                            <Input
                                type="text"
                                name="placeOfBirth"
                                placeholder="Place of birth"
                                onChange={this.handleInputChange}
                                value={this.state.placeOfBirth}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="telephone">Telephone: </label>
                            <Input
                                type="text"
                                name="telephone"
                                placeholder="Telephone"
                                onChange={this.handleInputChange}
                                value={this.state.telephone}
                            />
                        </Form.Field>
                    </div>
                    <Form.Field>
                        <label htmlFor="description">Short description: </label>
                        <TextArea
                            name="description"
                            placeholder="Tell us more"
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                    <Button
                        className="ui button"
                        type="button"
                        onClick={this.handleSubmit}
                    >Submit
                    </Button>
                </Form>
            </Segment>
        );
    }
}

export default Register;
