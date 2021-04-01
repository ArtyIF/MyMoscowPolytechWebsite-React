import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CardLink from './CardLink';

class LabPageView extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            error: null,
            availablePages: [],
            sentPage: 'Загрузка...'
        };
    }

    componentDidMount() {
        let { year, discipline, lab, page } = this.props.match.params;

        fetch('/api/lab?year=' + year + '&discipline=' + discipline + '&lab=' + lab).then((pageList) => pageList.json())
            .then((pageList) => {
                this.setState({availablePages: pageList});
                if (!page) {
                    page = this.state.availablePages[0];
                }
                fetch('/api/page?year=' + year + '&discipline=' + discipline + '&lab=' + lab + '&page=' + page).then((page) => page.text())
                    .then((page) => {
                        this.setState({sentPage: page});
                        this.setState({loaded: true});
                    }).then((err) => {
                        this.setState({error: err});
                        this.setState({loaded: true});
                    });
            })
            .then((err) => {
                this.setState({error: err});
                this.setState({loaded: true});
            });
    }

    render() {
        let { year, discipline, lab, page } = this.props.match.params;
        if (!page) {
            page = this.state.availablePages[0];
        }

        return (
            <div className='lab-view-main height-100'>
                <div className='lab-navbar'>
                    <span>Страницы: </span>
                    {this.state.availablePages.map((value) => {
                        if (page !== value) {
                            return (<CardLink to={'/labs/y_' + year + '/d_' + discipline + '/l_' + lab + '/p_' + value}>{value}</CardLink>);
                        } else {
                            return (<b>{value}</b>);
                        }
                    })}
                    <Link to={'/labs/y_' + year + '/d_' + discipline + '/l_' + lab + '/p_' + page + '/code'} className='code-button'>Код</Link>
                </div>
                <iframe srcDoc={this.state.sentPage} />
            </div>
        );
    }
}

export default withRouter(LabPageView);