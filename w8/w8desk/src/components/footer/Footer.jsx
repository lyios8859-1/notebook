import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import { DESKTOP, MYPAGE, MANAGER, SETTING, FEEDBACK, ABOUT } from '../utils/static-variable';
import setConfig from './footer-event';
export default class FooterComponent extends React.Component {
  constructor() {
    super();
  }
  handleClick (e) {
    const target = e.target;
    if (target.tagName.toLocaleLowerCase() === 'i') {
      setConfig(target.dataset.mark);
      // 需要显示的弹框
      // showModule(target.dataset.mark);
    }
  }
  render() {
    return (
      <div className="footer" onClick={this.handleClick.bind(this)}>
        <div className="left">
          <i className="iconfont icon-desktop" title="桌面" data-mark={DESKTOP}></i>
          <i className="iconfont icon-wo" title="我的页面" data-mark={MYPAGE}></i>
          <i className="iconfont icon-icon-function-manager" title="应用管理" data-mark={MANAGER}></i>
        </div>
        <div className="right">
          <i className="iconfont icon-Settingscontroloptions" title="个性化设置" data-mark={SETTING}></i>
          <i className="iconfont icon-fankui-tianchong" title="反馈" data-mark={FEEDBACK}></i>
          <i className="iconfont icon-guanyu" title="关于" data-mark={ABOUT}></i>
          <span className="timer">21:23</span>
        </div>
      </div>
    );
  }
}