import React, { Component } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { withRouter } from 'react-router-dom';
import HumanName from './HumanName';

class LabView extends Component {
    state = {
        loaded: false,
        error: null,
        response: "Загрузка..."
    }

    componentDidMount() {
        let { year, discipline, lab } = this.props.match.params;
        
        let yearID = year.substring(2);
        let disciplineID = discipline.substring(2);
        let labID = lab.substring(2);
        fetch('/api/lab?year=' + yearID + '&discipline=' + disciplineID + '&lab=' + labID).then((res) => res.json())
            .then((res) => {
                fetch('/labfiles/' + yearID + '/' + disciplineID + '/' + labID + '/' + res[0]).then((resPage) => resPage.text()).
                    then((resPage) => {
                        this.setState({response: resPage});
                        this.setState({loaded: true});
                    }).then((err) => {
                        this.setState({error: err});
                        this.setState({loaded: true});
                    })
            })
            .then((err) => {
                this.setState({error: err});
                this.setState({loaded: true});
            })
    }

    render() {
        let { year, discipline, lab } = this.props.match.params;

        let yearID = year.substring(2);
        let disciplineID = discipline.substring(2);
        let labID = lab.substring(2);

        return (
            <div className='lab-view-main'>
                <BreadcrumbsItem to={'/labs/' + year + '/' + discipline + '/' + year}><HumanName apiURL={'/api/humanname?year=' + yearID + '&discipline=' + disciplineID + '&lab=' + labID} /></BreadcrumbsItem>
                <p>Сделать страницу через iframe. Сверху кнопки для просмотра кода и скроллинга страниц</p>
                <iframe srcdoc={this.state.response} />
            </div>
        );
    }
}

export default withRouter(LabView);