import React from 'react';
import StuffList from './StuffList';

function YearsView() {
    return (
        <div>
            <h2>Выберите курс</h2>
            <StuffList apiURL='/api/years' pageURLPrefix='/y_' humanNameURLPrefix='/api/humanname?year=' />
        </div>
    );
}

export default YearsView;