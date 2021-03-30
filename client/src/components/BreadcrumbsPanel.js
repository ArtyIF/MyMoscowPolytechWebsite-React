import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BreadcrumbsPanel extends Component {
    constructor() {
        super();

        this.state = {
            splitPath: ''
        };
    }

    componentDidMount() {
        this.setState({splitPath: this.props.location.pathname});
        console.log(this.props.location.pathname);
    }
    
    render() {
        return (<div className='breadcrumbs-panel'>breadcrumbs</div>);
    }
}

export default withRouter(BreadcrumbsPanel);