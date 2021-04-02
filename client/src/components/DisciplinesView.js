import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import LabsList from './LabsList';

function DisciplinesView() {
    let { year } = useRouteMatch().params;
    return (
        <div className='height-100'>
            <h2>Выберите предмет</h2>
            <LabsList apiURL={'/api/disciplines?year=' + year} pageURLPrefix={'/labs/y_' + year + '/d_'} humanNameURLPrefix={'/api/humanname?year=' + year + '&discipline='} />
        </div>
    );
}

export default DisciplinesView;