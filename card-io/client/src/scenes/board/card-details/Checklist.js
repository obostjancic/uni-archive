import React, { Component } from 'react';
import { Segment, Icon, Header, List, Checkbox, Input, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as checklistActions from '../../../redux/card/checklist';
import comparePos from '../../../common/compare';

class Checklist extends Component {
    render() {
        const { cardId } = this.props;
        return (
            <Segment className="horizontalGroupSegment" >
                {this.props.card.checklist &&
                <div>
                    <Header as="h4">
                    Checklist
                        <Icon style={{ float: 'right' }} className="h4Icon hand" name="close" color="red" onClick={() => this.props.actions.checklist.removeChecklist(cardId)} />
                        <Icon style={{ float: 'right' }} className="h4Icon hand" name="plus" color="green" onClick={() => this.props.actions.checklist.addChecklistItem(cardId)} />
                    </Header>
                    <List>
                        {Object.values(this.props.card.checklist).sort(comparePos).map(item => (
                            <ChecklistItem
                                key={item.id}
                                cardId={cardId}
                                mode={item.text ? 'VIEW' : 'EDIT'}
                                item={item}
                                change={this.props.actions.checklist.changeChecklistItem}
                                remove={this.props.actions.checklist.removeChecklistItem}
                            />
                        ))
                        }
                    </List>
                </div>
                }
            </Segment>
        );
    }
}

class ChecklistItem extends Component {
    constructor(props) {
        super(props);
        this.state = { mode: this.props.mode, text: this.props.item.text };
        this.onTextChange = this.onTextChange.bind(this);
    }
    onTextChange(event, { value }) {
        this.setState({ text: value });
    }
    render() {
        const { mode, text } = this.state;
        const { cardId } = this.props;
        const { id, completed } = this.props.item;
        const viewMode = () => (
            <List.Item>
                <Checkbox
                    checked={completed}
                    label={text}
                    onClick={() => this.props.change(cardId, { ...this.props.item, completed: !completed })}
                />
                <Icon style={{ float: 'right' }} className="hand" name="pencil" color="orange" onClick={() => this.setState({ mode: 'EDIT' })} />
            </List.Item>
        );
        const editMode = () => (
            <List.Item>
                <Form>
                    <Form.Group className="formVAlign">
                        <Form.Field
                            width={1}
                            control={Checkbox}
                            checked={completed}
                            onClick={() => this.props.change(cardId, { ...this.props.item, completed: !completed })}
                        />
                        <Form.Field width={15} control={Input} onChange={this.onTextChange} value={text} className="inputPadding" />
                        <Icon
                            style={{ float: 'right' }}
                            name="checkmark"
                            color="green"
                            className="hand"
                            onClick={() => {
                                if (text) {
                                    this.setState({ mode: 'VIEW' });
                                    this.props.change(cardId, { ...this.props.item, text });
                                }
                            }}
                        />
                        <Icon style={{ float: 'right' }} className="hand" name="close" color="red" onClick={() => this.props.remove(cardId, id)} />
                    </Form.Group>
                </Form>
            </List.Item>
        );
        return mode === 'EDIT' ? editMode() : viewMode();
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
            checklist: bindActionCreators(checklistActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
