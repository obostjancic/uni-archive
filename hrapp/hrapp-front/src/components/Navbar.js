import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Menu} from 'semantic-ui-react';
import {HOME_ROUTE, LOGIN_OR_REGISTER_ROUTE, LOGOUT_ROUTE} from '../util/routes';
import {isLoggedIn} from '../util/UserInfo';

class Navbar extends Component {
    render() {
        const isLogged = isLoggedIn();
        const homeNavLink = <Menu.Item name="Home" as={NavLink} to={HOME_ROUTE} />;
        const loggedInOptions = <Menu.Item name="Logout" as={NavLink} to={LOGOUT_ROUTE} />;
        const loggedOutOptions = <Menu.Item name="Login or register" as={NavLink} to={LOGIN_OR_REGISTER_ROUTE} />;
        return (
            <div>
                <Menu className="ui secondary pointing menu">
                    <Container>
                        {homeNavLink}
                        <Menu.Menu position="right">
                            {isLogged
                                ? loggedInOptions
                                : loggedOutOptions
                            }
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        );
    }
}

export default Navbar;
