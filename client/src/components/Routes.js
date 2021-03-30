import React from 'react';
import { Route, Switch } from 'react-router-dom';
import YearsView from './components/YearsView';
import DisciplinesView from './components/DisciplinesView';
import LabsView from './components/LabsView';
import LabPageView from './components/LabPageView';
import LabCodeView from './components/LabCodeView';

function Routes() {
    return (
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

export default Routes;