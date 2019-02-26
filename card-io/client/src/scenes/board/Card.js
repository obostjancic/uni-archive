import React, { Component } from 'react';
import { Segment, Label, Icon, Divider, Transition, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../../redux/card/card';
import * as cardsActions from '../../redux/cards';
import * as boardActions from './../../redux/board';
import EmptyCard from './EmptyCard';
import DateLabel from './DateLabel';
import './card.css';

class Card extends Component {
    render() {
        const { id } = this.props;
        const {
            text, labels, date, done, checklist, members, description
        } = this.props.card;
        return (text) ?
            <Segment className="cardSegment hand" raised onClick={() => this.props.actions.board.openCardDetail(id)}>
                {labels && labels.map(el => (
                    <Label
                        key={el.color}
                        color={el.color}
                        horizontal
                        className="cardLabel"
                        onClick={event => { event.stopPropagation(); this.props.actions.board.toggleLabelText(); }}
                    >
                        {this.props.board.labelTextVisible && el.text}
                    </Label>))}
                <Divider fitted hidden />
                {text && <div>{text}</div>}
                <Divider fitted hidden /><Divider fitted hidden /><Divider fitted hidden />
                <IconLabels cardId={id} date={date} done={done} description={description} checklist={checklist} members={members} />
            </Segment> :
            <EmptyCard
                id={id}
                add={this.props.actions.card.changeText}
                remove={this.props.actions.cards.removeCard}
            />;
    }
}

const IconLabels = ({
    date, done, description, checklist, members, cardId
}) => (
    <div>
        {description && <Icon name="align left" color="grey" />}
        {date && <DateLabel cardId={cardId} className="iconLabel" />}
        {checklist && <ChecklistLabel checklist={checklist} />}
        {members && members.map(e => <Label className="memberLabel" circular key={e.user.id} color={e.color}>{e.user.firstName.charAt(0)}</Label>)}
    </div>
);

const ChecklistLabel = ({ checklist }) => {
    const stepsComplete = Object.values(checklist).filter(v => v.completed).length;
    const color = (stepsComplete === Object.keys(checklist).length) ? 'green' : 'grey';
    return (
        <Label className="iconLabel" color={color}>
            <Icon name="checkmark box" />
            {stepsComplete}/{Object.keys(checklist).length}
        </Label>
    );
};

function mapStateToProps(store, ownProps) {
    return {
        card: { ...store.cards[ownProps.id] },
        board: { ...store.board }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            card: bindActionCreators(cardActions, dispatch),
            cards: bindActionCreators(cardsActions, dispatch),
            board: bindActionCreators(boardActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
