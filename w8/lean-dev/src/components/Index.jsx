
import React from 'react';

import Loading from './loding/Loading';

import Main from './Main';

export default class MainComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount () {
    const t = setTimeout(() => {
      this.setState({
        isLoading: false
      });
      clearTimeout(t);
    }, 0);
  }
  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {
          isLoading ? <Loading /> : <Main />
        }
      </div>
    );
  }
}