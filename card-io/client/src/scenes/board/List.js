import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from './../../redux/list';
import * as cardsActions from './../../redux/cards';
import Card from './Card';
import './list.css';
import './card.css';
import comparePos from '../../common/compare';

class List extends Component {
    render() {
        const cards = Object.values(this.props.cards).filter(e => e.listId === this.props.id);
        return (
            <div className="cardListColumn">
                <div className="cardListOuter">
                    <Segment.Group>
                        <Segment compact className="cardListHeader">
                            <Header as="h3">{this.props.list.name}</Header>
                        </Segment>
                        <Segment className="cardListInner">
                            {Object.values(cards).sort(comparePos).map(e => (<Card key={e.id} id={e.id} />))}
                        </Segment>
                        <Segment className="cardListFooter">
                            <Segment className="cardSegment hand" onClick={() => this.props.actions.cards.addEmptyCard(this.props.id)}>
                                <b>+ Add another card</b>
                            </Segment>
                        </Segment>
                    </Segment.Group>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store, ownProps) {
    return {
        list: { ...store.lists[ownProps.id] },
        cards: { ...store.cards }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            list: bindActionCreators(listActions, dispatch),
            cards: bindActionCreators(cardsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

