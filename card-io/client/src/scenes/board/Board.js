import React, { Component } from 'react';
import { Header, Sidebar } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CardDetail from './card-details/CardDetail';
import List from './List';
import comparePos from '../../common/compare';
import './board.css';

class Board extends Component {
    render() {
        return (
            <Sidebar.Pushable>
                <Sidebar width="very wide" animation="overlay" direction="top" visible={this.props.board.cardDetail.visible}>
                    <CardDetail />
                </Sidebar>
                <Sidebar.Pusher dimmed={this.props.board.cardDetail.visible}>
                    <div className="boardBackground">
                        <Header as="h1" className="boardMenu">
                            {this.props.board.name}
                        </Header>
                        <div>
                            <div className="board">
                                {Object.values(this.props.lists).sort(comparePos).map(e => <List key={e.id} id={e.id} />)}
                            </div>
                        </div>
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

function mapStateToProps(store) {
    return {
        board: { ...store.board },
        lists: { ...store.lists },
        card: { ...store.card }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Board));
