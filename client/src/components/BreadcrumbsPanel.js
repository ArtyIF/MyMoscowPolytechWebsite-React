import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BreadcrumbsPanel extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        console.log(this.props.location.pathname);
    }

    componentDidUpdate() {
        console.log(this.props.location.pathname);
    }
    
    render() {
        return (<div className='breadcrumbs-panel'>breadcrumbs</div>);
    }
}

export default withRouter(BreadcrumbsPanel);