import React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HumanName from './HumanName';
import LabsList from './LabsList';
import LabsView from './LabsView';

function DisciplinesView() {
    let { year } = useRouteMatch().params;
    let yearID = year.substring(2);
    return (
        <div className='height-100'>
            <BreadcrumbsItem to={'/labs/' + year}><HumanName apiURL={'/api/humanname?year=' + yearID} /></BreadcrumbsItem>
            <Switch>
                <Route path='/labs/:year/:discipline' component={LabsView}/>
                <Route component={RealDisciplinesView} />
            </Switch>
        </div>
    );
}

function RealDisciplinesView() {
    let { year } = useRouteMatch().params;
    let yearID = year.substring(2);
    return (
        <div className='height-100'>
            <h2>Выберите предмет</h2>
            <LabsList apiURL={'/api/disciplines?year=' + yearID} pageURLPrefix={'/labs/' + year + '/d_'} humanNameURLPrefix={'/api/humanname?year=' + yearID + '&discipline='} />
        </div>
    );
}

export default DisciplinesView;