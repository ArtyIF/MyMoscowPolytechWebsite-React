import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Routes from './components/Routes';

function App() {
    let location = useLocation();

    return (
        <div className='root-flex'>
            <header>
                <h1>Сайт Артёма Фомина</h1>
                <BreadcrumbsItem to='/labs'>Лабораторные работы</BreadcrumbsItem>
                <div className='breadcrumbs-bar'>
                    <Breadcrumbs
                        item={NavLink}
                        finalItem={'b'}
                        finalProps={{className: 'current-breadcrumb'}}
                    />
                </div>
            </header>
            <main>
                <TransitionGroup className='height-100'>
                    <CSSTransition key={location.key} classNames='page-transition' timeout={200}>
                        <Routes />
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
}

export default App;