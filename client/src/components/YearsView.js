import React from 'react';
import LabsList from './LabsList';

function YearsView() {
    return (
        <div>
            <h2>Выберите курс</h2>
            <LabsList apiURL='/api/years' pageURLPrefix='/y_' humanNameURLPrefix='/api/humanname?year=' />
        </div>
    );
}

export default YearsView;