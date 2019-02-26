import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PersonalInfo from './PersonalInfo';
import '../../stylesheets/Profile.css';
import Education from './Education';
import PreviousJobs from './PreviousJobs';
import CurrentTasks from './CurrentTasks';
import PhotoDescription from './PhotoDescription';
import * as ProfileActions from '../../actions/profileActions';

const desctructureProps = (props) => {
    console.log(props);
    const {
        id, firstName, lastName, gender, description, birthday, placeOfBirth, tasks, telephone, education
    } = props.profileInfo;
    return {
        personalInfo: {
            id, firstName, lastName, gender, birthday, telephone, placeOfBirth
        },
        descriptionData: {
            id, firstName, lastName, gender, description
        },
        educationData: {
            id,
            education,

        },
        institutionOptions: props.institutionOptions,
        previousJobs: props.previousJobs,
        tasks
    };
};

class Profile extends Component {
    constructor(props) {
        super(props);
        const destructuredProps = desctructureProps(this.props.data);
        this.state = { ...destructuredProps };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onProfileStateUpdate = this.onProfileStateUpdate.bind(this);
        this.onEducationDataUpdate = this.onEducationDataUpdate.bind(this);
        this.fetchInstitutions = this.fetchInstitutions.bind(this);
    }
    componentDidMount() {
        this.props.action.fetchPersonalInfo();
        this.props.action.fetchPreviousJobs();
    }
    componentWillReceiveProps(newProps) {
        const destructuredProps = desctructureProps(newProps.data);
        this.setState({ ...destructuredProps });
    }
    onProfileStateUpdate(propsPart, event) {
        this.setState({
            [propsPart]: { ...this.state[propsPart], [event.target.name]: event.target.value }
        });
    }
    onEducationDataUpdate(event) {
        const oldEduData = this.state.educationData;
        this.setState({
            educationData: { ...oldEduData, education: { ...oldEduData.education, [event.target.name]: event.target.value } }
        });
    }
    onDateChange(newDate) {
        this.setState({ personalInfo: { ...this.state.personalInfo, birthday: newDate } });
    }
    onUpdate(propsPart) {
        if (propsPart === 'educationData') {
            const { id, ...requestData } = this.state.educationData.education;
            this.props.action.updateEducation(requestData);
        } else {
            this.props.action.updatePersonalInfo({ ...this.state[propsPart] });
        }
    }
    fetchInstitutions() {
        this.props.action.fetchInstitutions();
    }
    render() {
        return (
            <Grid columns={3} className="stackable">
                <Grid.Column width={6}>
                    <PhotoDescription
                        onEditSubmit={this.onUpdate}
                        onDescriptionDataUpdate={this.onProfileStateUpdate}
                        descriptionData={this.state.descriptionData}
                    />
                    <PersonalInfo
                        onEditSubmit={this.onUpdate}
                        onDateChange={this.onDateChange}
                        onPersonalInfoDataUpdate={this.onProfileStateUpdate}
                        personalInfo={this.state.personalInfo}
                    />
                    <Education
                        onEditSubmit={this.onUpdate}
                        onEducationDataUpdate={this.onEducationDataUpdate}
                        onEducationEdit={this.fetchInstitutions}
                        educationData={this.state.educationData}
                        institutionOptions={this.state.institutionOptions}
                    />
                </Grid.Column>
                <Grid.Column width={5}>
                    <PreviousJobs jobs={this.state.previousJobs} />
                </Grid.Column>
                <Grid.Column width={5}>
                    <CurrentTasks />
                </Grid.Column>
            </Grid>
        );
    }
}

function mapStateToProps(store) {
    return {
        data: { ...store.profile, ...store.institutionOptions }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
