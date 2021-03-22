import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {disciplines: []}

  componentDidMount() {
    fetch('/api/disciplines')
      .then(res => res.json())
      .then(disciplines => this.setState({ disciplines }));
  }

  render() {
    return (
      <div className="App">
        <h1>Лабораторные работы</h1>
        {this.state.disciplines.map(discipline =>
          <div key={discipline.id}>{discipline.name} (ID: {discipline.id})</div>
        )}
      </div>
    );
  }
}

export default App;
