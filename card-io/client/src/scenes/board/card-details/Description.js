import React, { Component } from 'react';
import { Segment, Icon, Header, TextArea, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../../../redux/card/card';
import './card-detail.css';

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = { mode: this.props.mode, description: this.props.card.description };
        this.onTextChange = this.onTextChange.bind(this);
    }
    onTextChange(event, { value }) {
        this.setState({ description: value });
        console.log(this.state.description);
    }
    render() {
        const { mode, description } = this.state;
        const { cardId } = this.props;
        const rows = this.props.card.checklist ? Object.keys(this.props.card.checklist).length : 3;
        const viewMode = () => (
            <div>
                <Header as="h4">Description
                    <Icon style={{ float: 'right' }} className="h4Icon hand" name="close" color="red" onClick={() => this.props.actions.card.removeDescription(cardId)} />
                    <Icon style={{ float: 'right' }} className="h4Icon hand" name="pencil" color="orange" onClick={() => this.setState({ mode: 'EDIT' })} />
                </Header>
                <p>{description}</p>
            </div>
        );
        const editMode = () => (
            <div>
                <Header as="h4">Description
                    <Icon style={{ float: 'right' }} className="h4Icon hand" name="close" color="red" onClick={() => this.props.actions.card.removeDescription(cardId)} />
                    <Icon style={{ float: 'right' }} className="h4Icon hand" name="checkmark" color="green" onClick={() => { this.setState({ mode: 'VIEW' }); this.props.actions.card.changeDescription(cardId, description); }} />
                </Header>
                <Form>
                    <TextArea rows={rows} onChange={this.onTextChange} />
                </Form>
            </div>
        );
        return (
            <Segment>
                {mode === 'EDIT' || this.props.card.description === '' ? editMode() : viewMode()}
            </Segment>
        );
    }
}

function mapStateToProps(store, ownProps) {
    return {
        card: { ...store.cards[ownProps.cardId] },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            card: bindActionCreators(cardActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Description);
