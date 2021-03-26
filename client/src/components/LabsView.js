import React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HumanName from './HumanName';
import LabsList from './LabsList';
import LabView from './LabView';

function LabsView() {
    let { year, discipline } = useRouteMatch().params;
    let yearID = year.substring(2);
    let disciplineID = discipline.substring(2);
    return (
        <div>
            <BreadcrumbsItem to={'/' + year + '/' + discipline}><HumanName apiURL={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID} /></BreadcrumbsItem>
            <Switch>
                <Route path='/:year/:discipline/:lab' component={LabView}/>
                <Route component={RealLabsView} />
            </Switch>
        </div>
    )
}

function RealLabsView() {
    let { year, discipline } = useRouteMatch().params;
    let yearID = year.substring(2);
    let disciplineID = discipline.substring(2);
    return (
        <div>
            <h2>Выберите работу</h2>
            <LabsList apiURL={'/api/labs?year=' + yearID + '&discipline=' + disciplineID} pageURLPrefix={'/' + year + '/' + discipline + '/l_'} humanNameURLPrefix={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID + '&lab='} />
        </div>
    );
}

export default LabsView;