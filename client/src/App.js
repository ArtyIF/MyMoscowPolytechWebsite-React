import React from 'react';
import { Route, Switch, NavLink, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import YearsView from './components/YearsView';
import DisciplinesView from './components/DisciplinesView';
import LabsView from './components/LabsView';
import LabPageView from './components/LabPageView';
import LabCodeView from './components/LabCodeView';

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
                        <Switch location={location}>
                            <Route exact path='/' component={YearsView}/>
                            <Route exact path='/labs' component={YearsView}/>
                            <Route exact path='/labs/:year' component={DisciplinesView}/>
                            <Route exact path='/labs/:year/:discipline' component={LabsView}/>
                            <Route exact path='/labs/:year/:discipline/:lab' component={LabPageView}/>
                            <Route exact path='/labs/:year/:discipline/:lab/:page' component={LabPageView}/>
                            <Route exact path='/labs/:year/:discipline/:lab/:page/code' component={LabCodeView}/>
                            <Route render={Error404}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
}

function Error404() {
    return (
        <div className='height-100'>
            <BreadcrumbsItem to='/404'>Ошибка 404</BreadcrumbsItem>
            <p>Страница не найдена!</p>
        </div>
    );
}

export default App;