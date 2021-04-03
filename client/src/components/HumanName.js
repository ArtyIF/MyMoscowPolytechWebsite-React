import React, { Component } from 'react';
import store, { addOrUpdateHumannameCache } from '../store/index';

class HumanName extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            response: '...'
        };
    }
    

    componentDidMount() {
        if (store.getState() && store.getState().root.humannameCache[this.props.path]) {
            this.setState({response: store.getState().root.humannameCache[this.props.path]});
        }
        let url = new URL('/api/humanname', window.location.origin);
        url.search = new URLSearchParams({
            path: this.props.path
        }).toString();
        
        fetch(url).then((res) => res.text())
            .then((res) => {
                this.setState({response: res});
                store.dispatch(addOrUpdateHumannameCache({
                    cachePath: this.props.path,
                    cacheValue: this.state.response
                }));
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