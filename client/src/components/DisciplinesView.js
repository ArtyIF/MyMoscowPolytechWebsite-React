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
        <div>
            <BreadcrumbsItem to={'/' + year}><HumanName apiURL={'/api/humanname?year=' + yearID} /></BreadcrumbsItem>
            <Switch>
                <Route path='/:year/:discipline' component={LabsView}/>
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
            <LabsList apiURL={'/api/disciplines?year=' + yearID} pageURLPrefix={'/' + year + '/d_'} humanNameURLPrefix={'/api/humanname?year=' + yearID + '&discipline='} />
        </div>
    );
}

export default DisciplinesView;