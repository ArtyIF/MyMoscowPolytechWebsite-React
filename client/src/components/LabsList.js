import React, { Component } from 'react';
import CardLink from './CardLink';
import FlexList from './FlexList';

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
                    <CardLink key={value + '_' + i} to={this.props.pageURLPrefix + value}>{this.state.response.humanNames[i]}</CardLink>
                ));
            } else {
                res = (<p>Ошибка загрузки: {this.state.error}</p>);
            }
        } else {
            return (<div />);
        }
        return (<div className='extra-bottom-padding'><FlexList>{res}</FlexList></div>);
    }
}

export default LabsList;