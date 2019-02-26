import React, { Component } from 'react';
import { Header, Container, Segment, Divider } from 'semantic-ui-react';
import moment from 'moment';

class PreviousJobs extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        const jobs = this.props.jobs.map(job => <PreviousJob key={job.id} jobInfo={job} />);
        return (
            <Segment>
                <h3 className="ui dividing header">Previous jobs</h3>
                {jobs}
            </Segment>
        );
    }
}

const PreviousJob = (props) => (
    <Container>
        <Header as="h4"> {props.jobInfo.position.name} at {props.jobInfo.employer.name} </Header>
        <p>{moment(props.jobInfo.startDate, 'YYYY-MM-DD').format('DD.MM.YYYY.')} - {(props.jobInfo.endDate) ? moment(props.jobInfo.endDate, 'YYYY-MM-DD').format('DD.MM.YYYY.') : 'Current'}
        </p>
        <Divider />
    </Container>
);

export default PreviousJobs;
