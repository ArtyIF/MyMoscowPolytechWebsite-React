import React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HumanName from './HumanName';
import LabsList from './LabsList';
import LabPageView from './LabPageView';

function LabsView() {
    let { year, discipline } = useRouteMatch().params;
    let yearID = year.substring(2);
    let disciplineID = discipline.substring(2);
    return (
        <div className='height-100'>
            <BreadcrumbsItem to={'/labs/' + year + '/' + discipline}><HumanName apiURL={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID} /></BreadcrumbsItem>
            <Switch>
                <Route path='/labs/:year/:discipline/:lab' component={LabPageView}/>
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
        <div className='height-100'>
            <h2>Выберите работу</h2>
            <LabsList apiURL={'/api/labs?year=' + yearID + '&discipline=' + disciplineID} pageURLPrefix={'/labs/' + year + '/' + discipline + '/l_'} humanNameURLPrefix={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID + '&lab='} />
        </div>
    );
}

export default LabsView;