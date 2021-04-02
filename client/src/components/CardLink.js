import React from 'react';
import { Link } from 'react-router-dom';

function CardLink(props) {
    if (props.active) {
        return (
            <div className='link_active'>
                <span>{props.children}</span>
            </div>
        );
    } else {
        return (
            <div className='link'>
                <Link to={props.to}>{props.children}</Link>
            </div>
        );
    }
}

export default CardLink;