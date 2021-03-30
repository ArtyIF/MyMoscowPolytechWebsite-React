import React from 'react';
import { Link } from 'react-router-dom';

function CardLink(props) {
    return (
        <div className={'link ' + props.className }>
            <Link to={props.to}>{props.children}</Link>
        </div>
    );
}

export default CardLink;