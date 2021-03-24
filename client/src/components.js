import React, { Component } from 'react';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch, Link, NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
                <BreadcrumbsItem to="/">Лабораторные работы</BreadcrumbsItem>
                <Breadcrumbs
                    separator={<span> &gt; </span>}
                    item={NavLink}
                    finalItem={'b'}
                />
            </header>
            <main>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={400}>
                        <Switch location={location}>
                            <Route exact path="/" component={YearsView}/>
                            <Route path="/:year" component={DisciplinesView}/>
                            <Route render={Error404}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
}

class StuffList extends Component {
    state = {
        error: null,
        response: []
    }

    componentDidMount() {
        fetch(this.props.apiURL).then((res) => res.json())
            .then((res) => {
                this.setState({response: res});
            })
            .then((err) => {
                this.setState({error: err});
            })
    }
    
    render() {
        let res;
        if (!this.error) {
            res = this.state.response.map((value) => (
                <p>{<Link to={this.props.pageURLPrefix + value}><HumanName apiURL={this.props.humanNameURLPrefix + value} /></Link>}</p>
            ));
        } else {
            res = (<p>Ошибка загрузки: {this.state.error}</p>)
        }
        return (<div>{res}</div>);
    }
}

class HumanName extends Component {
    state = {
        error: null,
        response: ""
    }

    componentDidMount() {
        fetch(this.props.apiURL).then((res) => res.text())
            .then((res) => {
                this.setState({response: res});
            })
            .then((err) => {
                this.setState({error: err});
            })
    }
    
    render() {
        if (!this.error) {
            return (<span>{this.state.response}</span>);
        } else {
            return (<span>Ошибка загрузки: {this.state.error}</span>);
        }
    }
}

function YearsView() {
    return (
        <div>
            <h2>Выберите год</h2>
            <StuffList apiURL="/api/years" pageURLPrefix="/y_" humanNameURLPrefix='/api/humanname?year=' />
        </div>
    );
}

function DisciplinesView() {
    let { year } = useRouteMatch().params;
    let yearID = year.substring(2);
    return (
        <div>
            <BreadcrumbsItem to={"/" + year}><HumanName apiURL={'/api/humanname?year=' + yearID} /></BreadcrumbsItem>
            <Switch>
                <Route path="/:year/:discipline" component={LabsView}/>
                <Route component={RealDisciplinesView} />
            </Switch>
        </div>
    )
}

function RealDisciplinesView() {
    let { year } = useRouteMatch().params;
    let yearID = year.substring(2);
    return (
        <div>
            <h2>Выберите предмет</h2>
            <StuffList apiURL={'/api/disciplines?year=' + yearID} pageURLPrefix={"/" + year + "/d_"} humanNameURLPrefix={'/api/humanname?year=' + yearID + '&discipline='} />
        </div>
    );
}

function LabsView() {
    let { year, discipline } = useRouteMatch().params;
    let yearID = year.substring(2);
    let disciplineID = discipline.substring(2);
    return (
        <div>
            <BreadcrumbsItem to={"/" + year + '/' + discipline}><HumanName apiURL={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID} /></BreadcrumbsItem>
            <h2>Выберите работу</h2>
            <StuffList apiURL={'/api/labs?year=' + yearID + '&discipline=' + disciplineID} pageURLPrefix={"/" + year + "/" + discipline + "/l_"} humanNameURLPrefix={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID + '&lab='} />
        </div>
    );
}

function Error404() {
    return (
        <div>
            <BreadcrumbsItem to="/404">Ошибка 404</BreadcrumbsItem>
            <p>Страница не найдена!</p>
        </div>
    );
}

export default App;