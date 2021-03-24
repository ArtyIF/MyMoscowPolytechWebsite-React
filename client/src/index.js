import React from 'react';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components';
import './style.scss'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <BreadcrumbsProvider>
                <App />
            </BreadcrumbsProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);