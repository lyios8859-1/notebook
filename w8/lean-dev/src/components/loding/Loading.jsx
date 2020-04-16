
import React from 'react';
import './loading.css';
export default class LoadingComponent extends React.Component {
  render() {
    return (
      <div className="loading-warp">
        <div className="loading">
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
        </div>
      </div>
    );
  }
}