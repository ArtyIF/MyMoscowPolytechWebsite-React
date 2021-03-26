import React from 'react';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <BreadcrumbsProvider>
            <App />
        </BreadcrumbsProvider>
    </BrowserRouter>,
    rootElement
);