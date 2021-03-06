import React, { Component } from 'react';
import { withRouter, matchPath } from 'react-router';
import CardLink from './CardLink';
import { connect } from 'react-redux';
import HumanName from './HumanName';
import FlexList from './FlexList';

const mapStateToProps = state => {
    return { routesList: state.root.routesList };
};

class BreadcrumbsPanel extends Component {
    constructor() {
        super();
    }
    
    render() {
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
                    let matchedPath = matchPath(crumbPathname, { path: this.props.routesList[j].path, exact: this.props.routesList[j].exact });
                    if (matchedPath && matchedPath.path !== '*' && !this.props.routesList[j].noBreadcrumb) {
                        newSplitPathname.push(splitPathname[i]);
                        break;
                    }
                }
            }
            splitPathname = newSplitPathname;

            return (<div className='breadcrumbs-panel'>
                <FlexList>
                    <CardLink to='/' key={'breadcrumb_/'} active={splitPathname.length === 0}><HumanName path='/' /></CardLink>
                    {
                        splitPathname.map((value, i) => {
                            let crumbPathname = '/' + splitPathname.slice(0, i + 1).join('/');
                            if (splitPathname.length === i + 1) {
                                return (<CardLink to={crumbPathname} key={'breadcrumb_' + value} active><HumanName path={crumbPathname} /></CardLink>);
                            } else {
                                return (<CardLink to={crumbPathname} key={'breadcrumb_' + value}><HumanName path={crumbPathname} /></CardLink>);
                            }
                        })
                    }
                </FlexList>
            </div>);
        } else {
            return null;
        }
    }
}

export default connect(mapStateToProps)(withRouter(BreadcrumbsPanel));