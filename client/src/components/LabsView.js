import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import LabsList from './LabsList';

function LabsView() {
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