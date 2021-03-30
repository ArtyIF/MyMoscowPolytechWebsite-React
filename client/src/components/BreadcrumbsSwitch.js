import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

export let appRouters = [];

class BreadcrumbsSwitch extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        appRouters = this.props.children;
    }

    componentDidUpdate() {
        appRouters = this.props.children;
    }
    
    render() {
        return (<Switch location={this.props.location}>
            {this.props.children}
        </Switch>);
    }
}

export default withRouter(BreadcrumbsSwitch);