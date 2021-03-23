import React from 'react';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch, Link, NavLink, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PageNames from './page-names';

function App() {
    return (
        <InternalApp />
    );
}

function InternalApp() {
    let location = useLocation();

    return (
        <div>
            <header>
                <h1>Сайт Артёма Фомина</h1>
                <BreadcrumbsItem to="/">{PageNames.Home}</BreadcrumbsItem>
                <Breadcrumbs
                    separator={<span> &gt; </span>}
                    item={NavLink}
                    finalItem={'b'}
                />
            </header>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={400}>
                    <Switch location={location}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/test" component={Test}/>
                        <Route render={Error404}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

function Home() {
    return (
        <main>
            <p>test page 1 contents</p>
            <Link to="/test">test page 2 link</Link>
        </main>
    );
}

function Test() {
    return (
        <main>
            <BreadcrumbsItem to="/test">{PageNames.Test}</BreadcrumbsItem>
            <Switch>
                <Route path="/test/sub" component={SubTest}/>
                <Route render={DefaultTest}/>
            </Switch>
        </main>
    );
}

function DefaultTest() {
    return (
        <div>
            <p>test page 2 contents</p>
            <Link to="/test/sub">test page 3 link</Link>
        </div>
    );
}

function SubTest() {
    return (
        <main>
            <BreadcrumbsItem to="/test/sub">{PageNames.SubTest}</BreadcrumbsItem>
            <p>test page 3 contents</p>
            <Link to="/">back</Link>
        </main>
    );
}

function Error404() {
    return (
        <main>
            <BreadcrumbsItem to="/404">{PageNames.Error404}</BreadcrumbsItem>
            <p>Страница не найдена!</p>
        </main>
    );
}

export default App;