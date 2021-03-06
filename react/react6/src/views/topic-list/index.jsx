import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import appState from '../../store/app-store.js';

/**
 * @observer 这必须在下面,否则警告:
 * You are trying to use 'observer' on a component that already has 'inject'.
 * Please apply 'observer' before applying 'inject'
 */
@inject('appState') @observer
class TopicList extends React.Component {
  constructor () {
    super();

    this.setName = this.setName.bind(this);
  }

  componentDidMount () {
    // TODO
  }

  setName (ev) {
    const prop = this.props;
    prop.appState.setName(ev.target.value);
  }

  render () {
    const prop = this.props;
    return (
      <div>
        <h1>
          TopicList
          <input type="text" onChange={this.setName} />
          {prop.appState.msg}
        </h1>
      </div>
    );
  }
}

// 指定传进来的props的类型
TopicList.propTypes = {
  // appState: PropTypes.object.isRequired // 是对象,一定需要传入
  /**
   * appState: PropTypes.instanceOf(appState).isRequired
   * 是AppState对象,一定需要传入, isRequired 选项添加会警告: 由于 mobx与react16以上不兼容的,不影响运行
   * Failed prop type: The prop `appState` is marked as required
   * in `inject-with-appState(TopicList)`,
   * but its value is `undefined`.
   * in inject-with-appState(TopicList)
   */
  appState: PropTypes.instanceOf(appState)
};

export default TopicList;
