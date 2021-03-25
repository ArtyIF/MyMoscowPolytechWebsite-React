import React, { Component } from 'react';

class HumanName extends Component {
    state = {
        error: null,
        response: '...'
    }

    componentDidMount() {
        fetch(this.props.apiURL).then((res) => res.text())
            .then((res) => {
                this.setState({response: res});
            })
            .then((err) => {
                this.setState({error: err});
            })
    }
    
    render() {
        if (!this.error) {
            return (<span>{this.state.response}</span>);
        } else {
            return (<span>Ошибка загрузки: {this.state.error}</span>);
        }
    }
}

export default HumanName;