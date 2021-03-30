import React from 'react';
import { Route, Switch } from 'react-router-dom';
import YearsView from './YearsView';
import DisciplinesView from './DisciplinesView';
import LabsView from './LabsView';
import LabPageView from './LabPageView';
import LabCodeView from './LabCodeView';

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
            <p>Страница не найдена!</p>
        </div>
    );
}

export default Routes;