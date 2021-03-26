import React from 'react';
import LabsList from './LabsList';

function YearsView() {
    return (
        <div className='height-100'>
            <h2>Выберите курс</h2>
            <LabsList apiURL='/api/years' pageURLPrefix='/labs/y_' humanNameURLPrefix='/api/humanname?year=' />
        </div>
    );
}

export default YearsView;