import React, { Component } from 'react';

class HumanName extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            response: 'Загрузка...'
        };
    }
    

    componentDidMount() {
        let url = new URL('/api/humanname', window.location.origin);
        url.search = new URLSearchParams({
            path: this.props.path
        }).toString();
        
        fetch(url).then((res) => res.text())
            .then((res) => {
                this.setState({response: res});
            })
            .then((err) => {
                this.setState({error: err});
            });
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