import React, { Component } from 'react';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import * as ROUTE from '../common/routes';

class LandingPage extends Component {
    render() {
        return (
            <Container>
                <Segment.Group>
                    <Segment>
                        <Header as="h1">Welcome to card.io</Header>
                    </Segment>
                    <Segment.Group horizontal>
                        <Segment>
                            <Header as="h3">If you have an account you can log in here</Header>
                            <RedirectButton route={ROUTE.LOGIN} title="Sign in" />
                        </Segment>
                        <Segment>
                            <Header as="h3">You can create new account here</Header>
                            <RedirectButton route={ROUTE.REGISTER} title="Sign up" />
                        </Segment>
                    </Segment.Group>
                </Segment.Group>
            </Container>
        );
    }
}

const RedirectButton = ({ route, color, title }) => (
    <Route render={({ history }) => (
        <Button
            onClick={() => { history.push(route); }}
        >
            {title}
        </Button>
    )}
    />
);

export default LandingPage;

