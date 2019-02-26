import 'semantic-ui-css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import createStore from './store';

const storeInstance = createStore;

axios.defaults.baseURL = 'http://localhost:8080/hrapp';

ReactDOM.render((
    <Provider store={storeInstance}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>), document.getElementById('root'));
registerServiceWorker();
