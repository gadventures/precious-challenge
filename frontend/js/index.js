import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App'
import { BrowserRouter} from 'react-router-dom';
//Enable routing with BrowserRouter
ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
    document.getElementById('container')
)
