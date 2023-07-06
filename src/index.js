import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Style.css';
ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);
