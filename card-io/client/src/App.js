import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './scenes/nav/Navbar';
import Login from './scenes/user/Login';
import Register from './scenes/user/Register';
import LandingPage from './scenes/LandingPage';
import CardDetail from './scenes/board/card-details/CardDetail';
import * as ROUTE from './common/routes';
import './App.css';
import Board from './scenes/board/Board'


const App = () => (
    <div>
        <Route exact path={ROUTE.HOME} component={LandingPage} />
        <Route path={ROUTE.LOGIN} component={Login} />
        <Route path={ROUTE.REGISTER} component={Register} />
        <Route path={ROUTE.LOGGED_IN} component={Navbar} />
        <Route path={ROUTE.BOARDS} component={Board} />
    </div>
);

export default App;
