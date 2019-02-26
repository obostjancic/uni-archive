import React, { Component } from 'react';
import { Segment, Icon, Header, Modal, Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../../../redux/card/card';
import * as boardActions from '../../../redux/board';
import * as checkListActions from '../../../redux/card/checklist';
import Buttons from './Buttons';
import Labels from './Labels';
import Activity from './Activity';
import Checklist from './Checklist';
import Description from './Description';
import './card-detail.css';


const inlineStyle = {
    modal: {
        marginTop: '0 !important',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
};

class CardDetail extends Component {
    render() {
        const { cardId, visible } = this.props.board.cardDetail;
        if (!visible) return null;
        const {
            text, description, checklist, activity
        } = this.props.cards[cardId];
        return (
            <Segment className="cardDetail">
                <Header as="h3">
                    {text}
                    <Icon color="red" name="close" className="hand" style={{ float: 'right' }} onClick={this.props.actions.board.closeCardDetail} />
                </Header>
                <Buttons cardId={cardId} boardMembers={this.props.board.members} />
                <Labels cardId={cardId} boardMembers={this.props.board.members} />
                {description !== undefined
                    ? <Description cardId={cardId} />
                    : <Segment>Add description...</Segment>}
                <Segment.Group horizontal>
                    {checklist !== undefined
                        ? <Checklist cardId={cardId} />
                        : <Segment className="horizontalGroupSegment">Add checklist...</Segment>}

                    <Activity activity={activity} />
                </Segment.Group>
            </Segment>
        );
    }
}

function mapStateToProps(store) {
    return {
        cards: { ...store.cards },
        board: { ...store.board }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            card: bindActionCreators(cardActions, dispatch),
            board: bindActionCreators(boardActions, dispatch),
            checklist: bindActionCreators(checkListActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
