import React from 'react';
import { Segment, Icon, Header, Feed } from 'semantic-ui-react';

const activityMapper = e => {
    const pastTense = {
        add: { verb: 'added', adverb: 'to' },
        change: { verb: 'changed', adverb: 'on' },
        move: { verb: 'moved', adverb: 'to' },
        remove: { verb: 'removed', adverb: 'from' },
    };
    return (
        <Feed.Event>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>{e.user.firstName} {e.user.lastName}</Feed.User>
                    {' ' + pastTense[e.type].verb} {e.value} {pastTense[e.type].adverb} {e.target}
                    <Feed.Date>{e.time.fromNow()}</Feed.Date>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    );
};

const Activity = (props) => {
    const activity = props.activity.map(activityMapper);
    return (
        <Segment className="activityScroll">
            <Header as="h4">
                <Icon name="feed" className="headerIcon" />
                <Header.Content>Activity</Header.Content>
            </Header>
            <Feed>
                {activity}
            </Feed>
        </Segment>
    );
};

export default Activity;
