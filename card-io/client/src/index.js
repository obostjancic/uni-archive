import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import createStore from './redux/store';

const storeInstance = createStore;

axios.defaults.baseURL = 'https://card-io.herokuapp.com/api/';

ReactDOM.render((
    <Provider store={storeInstance}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>), document.getElementById('root'));
registerServiceWorker();
