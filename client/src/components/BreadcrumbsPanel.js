import React, { Component } from 'react';
import { withRouter } from 'react-router';
import CardLink from './CardLink';

class BreadcrumbsPanel extends Component {
    constructor() {
        super();
    }
    
    render() {
        let splitPathname = this.props.location.pathname.split('/');
        let newSplitPathname = [];
        splitPathname.map((value) => {
            if (value !== '') {
                newSplitPathname.push(value);
            }
        });
        splitPathname = newSplitPathname;
        return (<div className='breadcrumbs-panel'>
            <CardLink to='/' key={'breadcrumb_/'} active={splitPathname.length === 0}>Домашняя страница</CardLink>
            {
                splitPathname.map((value, i) => {
                    let crumbPathname = '/' + splitPathname.slice(0, i + 1).join('/');
                    if (splitPathname.length === i + 1) {
                        return (<CardLink to={crumbPathname} key={'breadcrumb_' + value} active>{crumbPathname}</CardLink>);
                    } else {
                        return (<CardLink to={crumbPathname} key={'breadcrumb_' + value}>{crumbPathname}</CardLink>);
                    }
                })
            }
        </div>);
    }
}

export default withRouter(BreadcrumbsPanel);