import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import { refreshRoutesList } from '../actions/index';
import { connect } from 'react-redux';

export let appRouters = [];

function mapDispatchToProps(dispatch) {
    return {
        refreshRoutesList: routesList => dispatch(refreshRoutesList(routesList))
    };
}

class BreadcrumbsSwitch extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.refreshRoutesList(this.props.children);
    }
    
    render() {
        return (<Switch location={this.props.location}>
            {this.props.children}
        </Switch>);
    }
}

export default connect(null, mapDispatchToProps)(withRouter(BreadcrumbsSwitch));