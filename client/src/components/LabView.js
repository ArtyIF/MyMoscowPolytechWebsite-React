import React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { useRouteMatch } from 'react-router-dom';
import HumanName from './HumanName';

function LabView() {
    let { year, discipline, lab } = useRouteMatch().params;
    let yearID = year.substring(2);
    let disciplineID = discipline.substring(2);
    let labID = lab.substring(2);
    return (
        <div>
            <BreadcrumbsItem to={'/' + year + '/' + discipline + '/' + year}><HumanName apiURL={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID + '&lab=' + labID} /></BreadcrumbsItem>
        </div>
    );
}

export default LabView;