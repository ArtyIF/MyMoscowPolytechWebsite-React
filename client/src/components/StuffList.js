import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HumanName from './HumanName';

class StuffList extends Component {
    state = {
        error: null,
        response: []
    }

    componentDidMount() {
        fetch(this.props.apiURL).then((res) => res.json())
            .then((res) => {
                this.setState({response: res});
            })
            .then((err) => {
                this.setState({error: err});
            })
    }
    
    render() {
        let res;
        if (!this.error) {
            res = this.state.response.map((value) => (
                <p>{<Link to={this.props.pageURLPrefix + value}><HumanName apiURL={this.props.humanNameURLPrefix + value} /></Link>}</p>
            ));
        } else {
            res = (<p>Ошибка загрузки: {this.state.error}</p>)
        }
        return (<div>{res}</div>);
    }
}

export default StuffList;