import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

const HeaderEditMode = (props) => (
    <Grid columns={2}>
        <Grid.Column className="headerGrid">
            <Header as="h3">{props.title}</Header>
        </Grid.Column>
        <Grid.Column className="headerGrid" textAlign="right">
            {props.mode === 'VIEW' &&
            <Icon
                name="pencil"
                color="orange"
                size="large"
                onClick={() => props.onModeChange()}
            />}
            {props.mode === 'EDIT' &&
            <div>
                <Icon
                    name="close"
                    color="red"
                    size="large"
                    onClick={() => props.onModeChange()}
                />
                <Icon
                    name="check"
                    color="green"
                    size="large"
                    onClick={() => props.onEditSubmit()}
                />
            </div>}
        </Grid.Column>
    </Grid>
);

export default HeaderEditMode;
