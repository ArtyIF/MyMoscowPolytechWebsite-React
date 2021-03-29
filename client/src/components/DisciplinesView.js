import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import LabsList from './LabsList';

function DisciplinesView() {
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