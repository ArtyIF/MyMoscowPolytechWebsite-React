/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import { withRouter, matchPath } from 'react-router';
import CardLink from './CardLink';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { routesList: state.routesList };
};

class BreadcrumbsPanel extends Component {
    constructor() {
        super();
    }
    
    render() {
        console.log(this.props.routesList);
        if (this.props.routesList.length > 0) {
            let splitPathname = this.props.location.pathname.split('/');
            let newSplitPathname = [];
            splitPathname.map((value) => {
                if (value !== '') {
                    newSplitPathname.push(value);
                }
            });
            splitPathname = newSplitPathname;

            newSplitPathname = [];
            for (let i = 0; i < splitPathname.length; i++) {
                let crumbPathname = '/' + splitPathname.slice(0, i + 1).join('/');
                for (let j = 0; j < this.props.routesList.length; j++) {
                    if (matchPath(crumbPathname, { path: this.props.routesList[j].props.path, exact: true }) && !this.props.routesList[j].props.noBreadcrumb) {
                        newSplitPathname.push(splitPathname[i]);
                        break;
                    }
                }
            }
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
        } else {
            return null;
        }
    }
}

export default connect(mapStateToProps)(withRouter(BreadcrumbsPanel));