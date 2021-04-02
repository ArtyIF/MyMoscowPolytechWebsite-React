import React, { Component } from 'react';

class LabsList extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (<div className='flex-list'>{this.props.children}</div>);
    }
}

export default LabsList;