import React, { Component } from 'react';
import { List, Loader } from 'semantic-ui-react';

class BoardList extends Component {
    onItemClick(boardId) {
        console.log('board with id:', boardId);
    }
    render() {
        const boards = (this.props.boards.length > 0)
            ? this.props.boards.map(e => (<List.Item onClick={() => this.onItemClick(e.id)}>{e.name}</List.Item>))
            : <p> Looks like you have no boards </p>;
        return (
            <List>
                {this.props.fetching && <Loader active />}
                {boards}
            </List>
        );
    }
}

export default BoardList;
