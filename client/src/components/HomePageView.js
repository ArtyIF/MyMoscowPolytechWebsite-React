import React from 'react';
import CardLink from './CardLink';
import FlexList from './FlexList';

function HomePageView() {
    return (
        <div className='height-100'>
            <h2>Приветствую</h2>
            <p>Добро пожаловать на сайт Артёма Фомина, первокурсника Мосполитеха. Интересы: без понятия, они меняются со скоростью света.</p>
            <p>На этом сайте пока ничего, кроме сделанных мной лаб нет, поэтому ловите ссылку туда:</p>
            <FlexList><CardLink to='/labs'>Лабораторные работы</CardLink></FlexList>
        </div>
    );
}

export default HomePageView;