import React from 'react';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch, NavLink } from 'react-router-dom';

export function App() {
    return (
        <div>
            <header>
                <h1>Сайт Артёма Фомина</h1>
                <Breadcrumbs
                    separator={<b> / </b>}
                    item={NavLink}
                    finalItem={'b'}
                />
            </header>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/test" component={Test}/>
                <Route path="*" component={Error404}/>
            </Switch>
        </div>
    );
}

export function Home() {
    return (
        <main>
            <BreadcrumbsItem to="/">Главная страница</BreadcrumbsItem>
            <p>Ага-ага</p>
            <NavLink to="/test">тык</NavLink>
        </main>
    );
}

export function Test() {
    return (
        <main>
            <BreadcrumbsItem to="/">Главная страница</BreadcrumbsItem>
            <BreadcrumbsItem to="/test">Тестовая страница</BreadcrumbsItem>
            <p>Блаблабла</p>
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