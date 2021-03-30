import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BreadcrumbsPanel from './components/BreadcrumbsPanel';
import YearsView from './components/YearsView';
import DisciplinesView from './components/DisciplinesView';
import LabsView from './components/LabsView';
import LabPageView from './components/LabPageView';
import LabCodeView from './components/LabCodeView';
import BreadcrumbsSwitch from './components/BreadcrumbsSwitch';

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
                        <BreadcrumbsSwitch location={location}>
                            <Route exact path='/' component={YearsView}/>
                            <Route exact path='/labs' component={YearsView}/>
                            <Route exact path='/labs/:year' component={DisciplinesView}/>
                            <Route exact path='/labs/:year/:discipline' component={LabsView}/>
                            <Route exact path='/labs/:year/:discipline/:lab' component={LabPageView}/>
                            <Route exact path='/labs/:year/:discipline/:lab/:page' component={LabPageView}/>
                            <Route exact path='/labs/:year/:discipline/:lab/:page/code' component={LabCodeView}/>
                        </BreadcrumbsSwitch>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
}

export default App;