import React from 'react';
import axios from 'axios';

export default class TestApi extends React.Component {
  constructor () {
    super();
    this.login = this.login.bind(this);
    this.getTopics = this.getTopics.bind(this);
    this.markAll = this.markAll.bind(this);
  }

  getTopics () {
    axios.get('/api/topics').then((resp) => {
      console.log(resp);
    });
  }

  login () {
    axios.post('/api/user/login', {
      accessToken: '504de8ee-2093-4e05-829b-5b99e6457155'
    }).then((resp) => {
      console.log(resp);
    });
  }

  markAll () {
    axios.post('/api/message/mark_all').then((resp) => {
      console.log(resp);
    });
  }

  render () {
    return (
      <div>
        <button type="button" onClick={this.getTopics}>topics</button>
        <button type="button" onClick={this.login}>login</button>
        <button type="button" onClick={this.markAll}>markAll</button>
      </div>
    );
  }
}
