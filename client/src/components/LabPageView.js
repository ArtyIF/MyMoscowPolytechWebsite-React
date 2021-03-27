import React, { Component } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { withRouter } from 'react-router-dom';
import HumanName from './HumanName';

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
        
        let yearID = year.substring(2);
        let disciplineID = discipline.substring(2);
        let labID = lab.substring(2);
        let pageID = page ? page.substring(2) : null;
        fetch('/api/lab?year=' + yearID + '&discipline=' + disciplineID + '&lab=' + labID).then((pageList) => pageList.json())
            .then((pageList) => {
                this.setState({availablePages: pageList});
                if (pageID === null) {
                    pageID = this.state.availablePages[0];
                }
                fetch('/api/page?year=' + yearID + '&discipline=' + disciplineID + '&lab=' + labID + '&page=' + pageID).then((page) => page.text())
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

        let yearID = year.substring(2);
        let disciplineID = discipline.substring(2);
        let labID = lab.substring(2);
        let pageID = page ? page.substring(2) : null;

        return (
            <div className='lab-view-main height-100'>
                <BreadcrumbsItem to={'/labs/' + year + '/' + discipline + '/' + year}><HumanName apiURL={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID + '&lab=' + labID} /></BreadcrumbsItem>
                <div className='lab-navbar'>
                    Сюда всякие кнопочки {pageID}
                </div>
                <iframe srcDoc={this.state.sentPage} />
            </div>
        );
    }
}

export default withRouter(LabPageView);