import React, { Component, createRef } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BreadcrumbsPanel from './components/BreadcrumbsPanel';
import YearsView from './components/YearsView';
import DisciplinesView from './components/DisciplinesView';
import LabsView from './components/LabsView';
import LabPageView from './components/LabPageView';
import LabCodeView from './components/LabCodeView';
import LoggerFormView from './components/LoggerFormView';
import LoggerFormSentView from './components/LoggerFormSentView';
import { refreshRoutesList } from './store/index';
import { connect } from 'react-redux';
import HomePageView from './components/HomePageView';
import FlexList from './components/FlexList';
import CardLink from './components/CardLink';

function mapDispatchToProps(dispatch) {
    return {
        refreshRoutesList: routesList => dispatch(refreshRoutesList(routesList))
    };
}

class App extends Component {
    constructor() {
        super();
        this.switchRef = createRef();
    }

    componentDidMount() {
        let newRoutesList = [];
        let children = this.switchRef.current.props.children;
        for (let i = 0; i < children.length; i++) {
            newRoutesList.push({
                path: children[i].props.path,
                exact: children[i].props.exact,
                noBreadcrumb: children[i].props.noBreadcrumb
            });
        }
        this.props.refreshRoutesList(newRoutesList);
    }

    render() {
        let location = this.props.location;

        return (
            <div className='root-flex'>
                <header>
                    <h1>Сайт Артёма Фомина</h1>
                    <BreadcrumbsPanel />
                </header>
                <main>
                    <TransitionGroup className='height-100'>
                        <CSSTransition key={location.key} classNames='page-transition' timeout={200}>
                            <Switch location={location} ref={this.switchRef}>
                                <Route exact path='/' component={HomePageView}/>
                                <Route exact path='/logger' component={LoggerFormView}/>
                                <Route exact path='/logger/sent' component={LoggerFormSentView} noBreadcrumb/>
                                <Route exact path='/labs' component={YearsView}/>
                                <Route exact path='/labs/y_:year' component={DisciplinesView}/>
                                <Route exact path='/labs/y_:year/d_:discipline' component={LabsView}/>
                                <Route exact path='/labs/y_:year/d_:discipline/l_:lab' component={LabPageView}/>
                                <Route exact path='/labs/y_:year/d_:discipline/l_:lab/p_:page' component={LabPageView} noBreadcrumb/>
                                <Route exact path='/labs/y_:year/d_:discipline/l_:lab/p_:page/code' component={LabCodeView} noBreadcrumb/>
                                <Route path='*' component={Error404}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </main>
            </div>
        );
    }
}

function Error404() {
    return (<div><h2>Ошибка 404</h2><FlexList><CardLink to='/'>Вернуться на главную страницу</CardLink></FlexList></div>);
}

export default connect(null, mapDispatchToProps)(withRouter(App));