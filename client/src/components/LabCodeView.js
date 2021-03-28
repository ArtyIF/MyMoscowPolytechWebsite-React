import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';

class LabCodeView extends Component {
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

        let pageID = page ? page.substring(2) : this.state.availablePages[0];

        return (
            <div className='lab-view-main height-100'>
                <div className='lab-navbar'>
                    <span>Страницы: </span>
                    {this.state.availablePages.map((value) => {
                        if (pageID !== value) {
                            return (<Link to={'/labs/' + year + '/' + discipline + '/' + lab + '/p_' + value + '/code'}>{value}</Link>);
                        } else {
                            return (<b>{value}</b>);
                        }
                    })}
                    <Link to={'/labs/' + year + '/' + discipline + '/' + lab + '/p_' + pageID} className='code-button'>Просмотр</Link>
                </div>
                <SyntaxHighlighter language="html" style={codeStyle} showLineNumbers className='code-block'>
                    {this.state.sentPage}
                </SyntaxHighlighter>
            </div>
        );
    }
}

export default withRouter(LabCodeView);