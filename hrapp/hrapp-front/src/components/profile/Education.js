import React, { Component } from 'react';
import { Container, Divider, Dropdown, Grid, Header, Input, Segment } from 'semantic-ui-react';
import _ from 'lodash';
import HeaderEditMode from './HeaderEditMode';


class Education extends Component {
    constructor(props) {
        super(props);
        this.state = { mode: 'VIEW' };
        this.onModeChange = this.onModeChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }
    onModeChange() {
        if (this.state.mode === 'VIEW') {
            this.setState({ mode: 'EDIT' });
            this.props.onEducationEdit();
        } else if (this.state.mode === 'EDIT') {
            this.setState({ mode: 'VIEW' });
        }
    }
    onEditSubmit() {
        this.setState({ mode: 'VIEW' });
        this.props.onEditSubmit('educationData');
    }
    onInputChange(event) {
        this.props.onEducationDataUpdate(event);
    }
    onDropdownChange(event, valueWrapper) {
        const selected = this.props.institutionOptions.find(item => item.id === valueWrapper.value);
        const newEvent = { target: { name: valueWrapper.name, value: selected } };
        this.props.onEducationDataUpdate(newEvent);
    }
    render() {
        const data = this.props.educationData;
        const institutionOptions = this.props.institutionOptions.map(item => ({ value: item.id, text: `${item.name}, ${item.place}` }));
        const renderViewMode = () => (
            <Container textAlign="center">
                <Header as="h3">{data.education.title}</Header>
                <p>{data.education.institution.name}, {data.education.institution.place}</p>
            </Container>
        );
        const renderEditMode = () => (
            <Container textAlign="center">
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Input name="title" label="Title:" fluid value={data.education.title} onChange={this.onInputChange} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column width={10}>
                            <Dropdown
                                fluid
                                selection
                                name="institution"
                                options={institutionOptions}
                                value={data.education.institution.id}
                                onChange={this.onDropdownChange}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Input name="place" label="Place:" fluid value={data.education.institution.place} onChange={this.onInputChange} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
        return (
            <Segment>
                <HeaderEditMode
                    title="Education"
                    mode={this.state.mode}
                    onModeChange={this.onModeChange}
                    onEditSubmit={this.onEditSubmit}
                />
                <Divider />
                {this.state.mode === 'EDIT'
                    ? renderEditMode()
                    : renderViewMode()
                }
            </Segment>
        );
    }
}

export default Education;
