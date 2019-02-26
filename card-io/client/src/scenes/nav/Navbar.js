import React, { Component } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as authActions from '../../redux/auth';
import * as navbarActions from '../../redux/navbar';
import * as ROUTE from '../../common/routes';
import BoardList from './BoardList';
import './navbar.css';

class Navbar extends Component {
    componentDidMount() {
    }
    render() {
        if (!this.props.auth.isLoggedIn) return (<Redirect to={ROUTE.HOME} />);
        return (
            <Menu pointing secondary className="navbarNoMargin">
                <Popup
                    trigger={<Menu.Item name="boards" onClick={this.props.actions.navbar.toggleBoardList} />}
                    content={<BoardList fetching={this.props.navbar.fetching} boards={this.props.navbar.boards} />}
                    on="click"
                    position="bottom center"
                    hideOnScroll
                />
                <Menu.Item name="invitations" as={NavLink} to={ROUTE.INVITATIONS} />
                <Menu.Menu position="right">
                    <Menu.Item name="logout" onClick={this.props.actions.auth.logout} />
                </Menu.Menu>
            </Menu>
        );
    }
}

function mapStateToProps(store) {
    return {
        auth: { ...store.auth },
        navbar: { ...store.navbar }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            auth: bindActionCreators(authActions, dispatch),
            navbar: bindActionCreators(navbarActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
