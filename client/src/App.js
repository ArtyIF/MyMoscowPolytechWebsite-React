import React, { Component, createRef } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BreadcrumbsPanel from './components/BreadcrumbsPanel';
import YearsView from './components/YearsView';
import DisciplinesView from './components/DisciplinesView';
import LabsView from './components/LabsView';
import LabPageView from './components/LabPageView';
import LabCodeView from './components/LabCodeView';
import { refreshRoutesList } from './actions/index';
import { connect } from 'react-redux';
import HomePageView from './components/HomePageView';

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
        this.props.refreshRoutesList(this.switchRef.current.props.children);
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
    return (<div>Страница не найдена!</div>);
}

export default connect(null, mapDispatchToProps)(withRouter(App));