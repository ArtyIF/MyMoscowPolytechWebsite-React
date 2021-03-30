import React from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BreadcrumbsPanel from './components/BreadcrumbsPanel';
import Routes from './components/Routes';

function App() {
    let location = useLocation();

    return (
        <div className='root-flex'>
            <header>
                <h1>Сайт Артёма Фомина</h1>
                <BreadcrumbsPanel />
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