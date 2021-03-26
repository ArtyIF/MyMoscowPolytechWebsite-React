import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HumanName from './HumanName';

class StuffList extends Component {
    state = {
        loaded: false,
        error: null,
        response: []
    }

    componentDidMount() {
        fetch(this.props.apiURL).then((res) => res.json())
            .then((res) => {
                this.setState({response: res});
                this.setState({loaded: true});
            })
            .then((err) => {
                this.setState({error: err});
                this.setState({loaded: true});
            })
    }
    
    render() {
        let res;
        if (this.state.loaded) {
            if (!this.state.error) {
                res = this.state.response.map((value) => (
                    <div className='link'>
                        {<Link to={this.props.pageURLPrefix + value}><HumanName apiURL={this.props.humanNameURLPrefix + value} /></Link>}
                    </div>
                ));
            } else {
                res = (<p>Ошибка загрузки: {this.state.error}</p>);
            }
        } else {
            res = (<p>Загрузка...</p>);
        }
        return (<div className='stuff-list'>{res}</div>);
    }
}

export default StuffList;