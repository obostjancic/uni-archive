import React, { Component } from 'react';
import { Grid, Header, Icon, Image, Input, Segment } from 'semantic-ui-react';


class PhotoDescription extends Component {
    constructor(props) {
        super(props);
        this.state = { mode: 'VIEW' };
        this.onModeChange = this.onModeChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }
    onInputChange(event) {
        this.props.onDescriptionDataUpdate('descriptionData', event);
    }
    onEditSubmit() {
        this.setState({ mode: 'VIEW' });
        this.props.onEditSubmit('descriptionData');
    }
    onModeChange() {
        if (this.state.mode === 'VIEW') {
            this.setState({ mode: 'EDIT' });
        } else if (this.state.mode === 'EDIT') {
            this.setState({ mode: 'VIEW' });
        }
    }
    render() {
        const {
            gender, firstName, lastName, description
        } = this.props.descriptionData;
        const imageSrc = (gender === 'Male')
            ? 'http://1.semantic-ui.com/images/avatar/large/elliot.jpg'
            : 'http://1.semantic-ui.com/images/avatar/large/stevie.jpg';
        const renderEditMode = () => (
            <div>
                <Icon
                    name="close"
                    color="red"
                    onClick={() => this.setState({ mode: 'VIEW' })}
                />
                <Icon
                    name="check"
                    color="green"
                    onClick={() => this.onEditSubmit()}
                />
                <Input fluid name="description" value={description} onChange={this.onInputChange} />
            </div>
        );
        const renderViewMode = () => (
            <p>
                {description}
                <Icon
                    name="pencil"
                    color="orange"
                    onClick={() => this.setState({ mode: 'EDIT' })}
                />
            </p>
        );
        return (
            <Segment>
                <Grid columns={2} className="stackable">
                    <Grid.Column width={4}>
                        <Image src={imageSrc} size="small" floated="left" />
                    </Grid.Column>
                    <Grid.Column width={12} textAlign="center" verticalAlign="middle">
                        <Header as="h2">{firstName} {lastName}</Header>
                        {this.state.mode === 'EDIT'
                            ? renderEditMode()
                            : renderViewMode()
                        }
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

export default PhotoDescription;
