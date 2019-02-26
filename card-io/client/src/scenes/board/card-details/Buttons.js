import React, { Component } from 'react';
import { Segment, Icon, Header, Button, Popup } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SmallDivider from '../SmallDivider';
import * as cardActions from '../../../redux/card/card';
import * as checkListActions from '../../../redux/card/checklist';
import './card-detail.css';
import AllLabels from './AllLabels';
import AllMembers from './AllMembers';

class Buttons extends Component {
    render() {
        const { cardId, boardMembers } = this.props;
        const {
            date, description, checklist, labels, members
        } = this.props.card;
        return (
            <Segment.Group horizontal>
                <AdditionButtonGroup
                    checklist={checklist}
                    date={date}
                    cardId={cardId}
                    description={description}
                    labels={labels}
                    cardMembers={members}
                    boardMembers={boardMembers}
                    addLabel={this.props.actions.card.addLabel}
                    removeLabel={this.props.actions.card.removeLabel}
                    addMember={this.props.actions.card.addMember}
                    removeMember={this.props.actions.card.removeMember}
                    addChecklist={this.props.actions.checklist.addChecklist}
                    addDescription={this.props.actions.card.addDescription}
                    addDate={this.props.actions.card.addDate}
                />
                <ActionsButtonGroup />
            </Segment.Group>
        );
    }
}

const LabeledButton = ({
    title, disabled = false, iconName, onClick
}) => (
    <Button disabled={disabled} onClick={onClick} icon labelPosition="left">
        <Icon name={iconName} />
        {title}
    </Button>
);

const AdditionButtonGroup = ({
    cardId, checklist, date, description, labels, boardMembers, cardMembers,
    addMember, removeMember, addLabel, removeLabel, addDate, addDescription, addChecklist
}) => (
    <Segment>
        <Header as="h4">
            <Icon name="plus" className="headerIcon" />
            <Header.Content>Add</Header.Content>
        </Header>
        <Button.Group basic size="tiny" fluid labeled icon>
            <Popup
                trigger={<LabeledButton title="Members" iconName="users" />}
                on="click"
                position="bottom center"
                hideOnScroll
                content={<AllMembers addMember={addMember} removeMember={removeMember} cardMembers={cardMembers} boardMembers={boardMembers} cardId={cardId} />}
            />
            <SmallDivider />
            <Popup
                trigger={<LabeledButton title="Labels" iconName="tag" />}
                on="click"
                position="bottom center"
                hideOnScroll
                content={<AllLabels addLabel={addLabel} removeLabel={removeLabel} labels={labels} cardId={cardId} />}
            />
            <SmallDivider />
            {date
                ? <LabeledButton title="Due date" disabled iconName="hourglass outline" />
                : <LabeledButton title="Due date" iconName="hourglass outline" onClick={() => addDate(cardId)} />
            }
            <SmallDivider />
            {description || description === ''
                ? <LabeledButton title="Description" disabled iconName="align left" />
                : <LabeledButton title="Description" iconName="align left" onClick={() => addDescription(cardId)} />
            }
            <SmallDivider />
            {checklist
                ? <LabeledButton title="Checklist" disabled iconName="checkmark box" />
                : <LabeledButton title="Checklist" iconName="checkmark box" onClick={() => addChecklist(cardId)} />
            }
        </Button.Group>
    </Segment>
);

const ActionsButtonGroup = () => (
    <Segment>
        <Header as="h4">
            <Icon name="cogs" className="headerIcon" />
            <Header.Content>Actions</Header.Content>
        </Header>
        <Button.Group basic size="tiny" fluid labeled icon>
            <LabeledButton title="Move" iconName="move" />
            <SmallDivider />
            <LabeledButton title="Copy" iconName="copy" />
            <SmallDivider />
            <LabeledButton title="Watch" iconName="eye" />
            <SmallDivider />
            <LabeledButton title="Archive" iconName="archive" />
        </Button.Group>
    </Segment>
);

function mapStateToProps(store, ownProps) {
    return {
        card: { ...store.cards[ownProps.cardId] },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            card: bindActionCreators(cardActions, dispatch),
            checklist: bindActionCreators(checkListActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
