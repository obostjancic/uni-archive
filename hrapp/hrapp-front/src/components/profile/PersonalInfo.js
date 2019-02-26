import React, { Component } from 'react';
import { Divider, Dropdown, Input, Segment, Table } from 'semantic-ui-react';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DateTimePicker } from 'react-widgets';
import HeaderEditMode from './HeaderEditMode';

momentLocalizer(moment);

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { mode: 'VIEW' };
        this.onModeChange = this.onModeChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }
    onInputChange(event) {
        this.props.onPersonalInfoDataUpdate('personalInfo', event);
    }
    onSubmit() {
        this.setState({ mode: 'VIEW' });
        this.props.onEditSubmit('personalInfo');
    }
    onModeChange() {
        if (this.state.mode === 'VIEW') {
            this.setState({ mode: 'EDIT' });
        } else if (this.state.mode === 'EDIT') {
            this.setState({ mode: 'VIEW' });
        }
    }
    onDropdownChange(event, valueWrapper) {
        const newEvent = { target: { name: valueWrapper.name, value: valueWrapper.value } };
        this.props.onPersonalInfoDataUpdate('personalInfo', newEvent);
    }
    render() {
        return (
            <Segment>
                <HeaderEditMode
                    title="Personal info"
                    mode={this.state.mode}
                    onModeChange={this.onModeChange}
                    onEditSubmit={this.onSubmit}
                />
                <Divider />
                <Table id="personalInfoTable" basic="very" compact="very" stackable>
                    {this.state.mode === 'EDIT'
                        ? <PersonalInfoEdit
                            personalInfo={this.props.personalInfo}
                            onInputChange={this.onInputChange}
                            onDropdownChange={this.onDropdownChange}
                            onDateChange={this.props.onDateChange}
                        />
                        : <PersonalInfoPreview personalInfo={this.props.personalInfo} />}
                </Table>
            </Segment>
        );
    }
}

const PersonalInfoPreview = (props) => {
    const formattedBirthday = moment.unix(props.personalInfo.birthday / 1000).format('DD.MM.YYYY.');
    return (
        <Table.Body>
            <PersonalInfoPreviewRow label="First name" value={props.personalInfo.firstName} />
            <PersonalInfoPreviewRow label="Last name" value={props.personalInfo.lastName} />
            <PersonalInfoPreviewRow label="Gender" value={props.personalInfo.gender} />
            <PersonalInfoPreviewRow label="Birthday" value={formattedBirthday} />
            <PersonalInfoPreviewRow label="Place of birth" value={props.personalInfo.placeOfBirth} />
            <PersonalInfoPreviewRow label="Telephone number" value={props.personalInfo.telephone} />
        </Table.Body>
    );
};

const PersonalInfoPreviewRow = (props) => (
    <Table.Row>
        <Table.Cell className="right aligned">{props.label}</Table.Cell>
        <Table.Cell>{props.value}</Table.Cell>
    </Table.Row>
);

const PersonalInfoEdit = (props) => {
    const {
        firstName, lastName, birthday, placeOfBirth, telephone, gender
    } = props.personalInfo;
    const genderOptions = [{ text: 'Male', value: 'Male' }, { text: 'Female', value: 'Female' }];
    return (
        <Table.Body>
            <Table.Row>
                <Table.Cell className="right aligned">First name:</Table.Cell>
                <Table.Cell>
                    <Input
                        fluid
                        name="firstName"
                        value={firstName}
                        onChange={props.onInputChange}
                    />
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell className="right aligned">Last name:</Table.Cell>
                <Table.Cell>
                    <Input
                        fluid
                        name="lastName"
                        value={lastName}
                        onChange={props.onInputChange}
                    />
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell className="right aligned">Gender:</Table.Cell>
                <Table.Cell>
                    <Dropdown
                        fluid
                        selection
                        name="gender"
                        options={genderOptions}
                        value={gender}
                        onChange={props.onDropdownChange}
                    />
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell className="right aligned">Birthday:</Table.Cell>
                <Table.Cell>
                    <DateTimePicker
                        name="birthday"
                        format="DD.MM.YYYY."
                        style={{ width: '100%' }}
                        time={false}
                        onChange={props.onDateChange}
                        defaultValue={moment.unix(birthday / 1000).toDate()}
                    />
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell className="right aligned">Place of birth:</Table.Cell>
                <Table.Cell>
                    <Input
                        fluid
                        name="placeOfBirth"
                        value={placeOfBirth}
                        onChange={props.onInputChange}
                    />
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell className="right aligned">Telephone number:</Table.Cell>
                <Table.Cell>
                    <Input
                        fluid
                        name="telephone"
                        value={telephone}
                        onChange={props.onInputChange}
                    />
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    );
};

export default PersonalInfo;
