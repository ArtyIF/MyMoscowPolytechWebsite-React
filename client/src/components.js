import React from 'react';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch, Link, NavLink, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

export function App() {
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
                <Breadcrumbs
                    separator={<span> &gt; </span>}
                    item={NavLink}
                    finalItem={'b'}
                />
            </header>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Switch location={location}>
                        <Route exact path="/" children={Home}/>
                        <Route path="/test" children={Test}/>
                        <Route path="*" children={Error404}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export function Home() {
    return (
        <main>
            <BreadcrumbsItem to="/">test page 1</BreadcrumbsItem>
            <p>test page 1 contents</p>
            <Link to="/test">test page 2 link</Link>
        </main>
    );
}

export function Test() {
    return (
        <main>
            <BreadcrumbsItem to="/">test page 1</BreadcrumbsItem>
            <BreadcrumbsItem to="/test">test page 2</BreadcrumbsItem>
            <p>test page 2 contents</p>
        </main>
    );
}

export function Error404() {
    return (
        <main>
            <BreadcrumbsItem to="/">Главная страница</BreadcrumbsItem>
            <BreadcrumbsItem to="/404">Страница не найдена</BreadcrumbsItem>
            <p>Страница не найдена!</p>
        </main>
    );
}

export default App();