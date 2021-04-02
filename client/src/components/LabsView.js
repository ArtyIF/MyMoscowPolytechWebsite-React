import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import LabsList from './LabsList';

function LabsView() {
    let { year, discipline } = useRouteMatch().params;
    return (
        <div className='height-100'>
            <h2>Выберите работу</h2>
            <LabsList apiURL={'/api/labs?year=' + year + '&discipline=' + discipline} pageURLPrefix={'/labs/y_' + year + '/d_' + discipline + '/l_'} humanNameURLPrefix={'/api/humanname?year=' + year + '&discipline=' + discipline + '&lab='} />
        </div>
    );
}

export default LabsView;