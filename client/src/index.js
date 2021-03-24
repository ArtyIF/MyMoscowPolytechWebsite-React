import React from 'react';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components';
import './style.scss'

ReactDOM.render(
    <BrowserRouter>
        <BreadcrumbsProvider>
            <App />
        </BreadcrumbsProvider>
    </BrowserRouter>,
    document.getElementById('root')
);