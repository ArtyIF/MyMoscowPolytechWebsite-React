import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LabsList extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            error: null,
            response: []
        };
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
            });
    }
    
    render() {
        let res;
        if (this.state.loaded) {
            if (!this.state.error) {
                res = this.state.response.ids.map((value, i) => (
                    <div className='link' key={value + '_' + i}>
                        <Link to={this.props.pageURLPrefix + value}>{this.state.response.humanNames[i]}</Link>
                    </div>
                ));
            } else {
                res = (<p>Ошибка загрузки: {this.state.error}</p>);
            }
        } else {
            return (<div />);
        }
        return (<div className='labs-list'>{res}</div>);
    }
}

export default LabsList;