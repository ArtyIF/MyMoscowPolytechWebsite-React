import React from 'react';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch, NavLink, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import YearsView from './components/YearsView';
import DisciplinesView from './components/DisciplinesView';

function App() {
    let location = useLocation();

    return (
        <div>
            <header>
                <h1>Сайт Артёма Фомина</h1>
                <BreadcrumbsItem to='/'>Лабораторные работы</BreadcrumbsItem>
                <Breadcrumbs
                    separator={<span> &gt; </span>}
                    item={NavLink}
                    finalItem={'b'}
                />
            </header>
            <main>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames='fade' timeout={100}>
                        <Switch location={location}>
                            <Route exact path='/' component={YearsView}/>
                            <Route exact path='/labs' component={YearsView}/>
                            <Route path='/labs/:year' component={DisciplinesView}/>
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
        <div>
            <BreadcrumbsItem to='/404'>Ошибка 404</BreadcrumbsItem>
            <p>Страница не найдена!</p>
        </div>
    );
}

export default App;