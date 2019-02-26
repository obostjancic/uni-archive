import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class CurrentTasks extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Segment>
                <h3 className="ui dividing header">Current tasks</h3>
            </Segment>
        );
    }
}

export default CurrentTasks;
