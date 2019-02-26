import React, { Component } from 'react';
import { Segment, Icon, Label, Popup, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../../../redux/card/card';
import DateLabel from './../DateLabel';
import AllLabels from './AllLabels';
import AllMembers from './AllMembers';
import './card-detail.css';

class Labels extends Component {
    render() {
        const { cardId, boardMembers } = this.props;
        const { labels, date, members } = this.props.card;
        const {
            addLabel, removeLabel, addMember, removeMember
        } = this.props.actions.card;
        return (
            <Segment>
                Labels:&nbsp;
                {labels && labels.map(e => (
                    <Popup
                        key={e.id}
                        trigger={<Label className="hand marginBottom" key={e.id} color={e.color}>{e.text}</Label>}
                        on="click"
                        position="bottom center"
                        hideOnScroll
                        content={
                            <PopupForm
                                item={e}
                                cardId={cardId}
                                change={this.props.actions.card.changeLabel}
                                remove={this.props.actions.card.removeLabel}
                            />}
                    />))}

                <Popup
                    trigger={<Label className="hand"><Icon name="plus" className="addIconLabel" /></Label>}
                    on="click"
                    position="bottom center"
                    hideOnScroll
                    content={<AllLabels addLabel={addLabel} removeLabel={removeLabel} labels={labels} cardId={cardId} />}
                />
                Members:&nbsp;
                {members && members.map(e => <Label className="hand" color={e.color}>{e.user.firstName}</Label>)}
                <Popup
                    trigger={<Label className="hand"><Icon name="plus" className="addIconLabel" /></Label>}
                    on="click"
                    position="bottom center"
                    hideOnScroll
                    content={<AllMembers addMember={addMember} removeMember={removeMember} cardMembers={members} boardMembers={boardMembers} cardId={cardId} />}
                />
                Due date:&nbsp;
                {date && <DateLabel cardId={cardId} className="dateLabel hand" enableClick="true" />}
            </Segment>
        );
    }
}

class PopupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { text: this.props.item.text };
        this.onTextChange = this.onTextChange.bind(this);
    }
    onTextChange(event, { value }) {
        this.setState({ text: value });
    }
    render() {
        const { change, remove, cardId } = this.props;
        return (
            <Form>
                <Form.Input fluid onChange={this.onTextChange} value={this.state.text} size="small" maxLength="15" />
                <Form.Group widths="equal" className="zeroBottomMargin">
                    <Form.Button fluid positive onClick={() => change(cardId, this.props.item.color, this.state.text)}>
                        Save
                    </Form.Button>
                    <Form.Button fluid negative onClick={() => remove(cardId, this.props.item.color)}>
                        Remove
                    </Form.Button>
                </Form.Group>
            </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Labels);

