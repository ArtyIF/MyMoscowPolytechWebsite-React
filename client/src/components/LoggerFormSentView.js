import React from 'react';
import FlexList from './FlexList';
import CardLink from './CardLink';

function LoggerFormSentView() {
    return (
        <div className='height-100'>
            <h2>Анонимный чат</h2>
            <p>Сообщение отправлено!</p>
            <FlexList>
                <CardLink to='/logger'>Отправить ещё раз</CardLink>
            </FlexList>
        </div>
    );
}

export default LoggerFormSentView;