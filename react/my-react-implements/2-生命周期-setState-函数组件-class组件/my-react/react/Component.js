import { renderComponent } from '../react-dom/index.js';
class Component {
  constructor (props = {}) {
    this.props = props;
    this.state = {};
    console.log('componet', props)
  }
  setState (stateObj) {
    const state = Object.assign(this.state, stateObj);

    // 状态变化,重新渲染
    renderComponent(this);
  }
}

export default Component;