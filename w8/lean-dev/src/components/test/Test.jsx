import React, { Component, Fragment} from 'react';
import Item from './item';
class Test extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputValue: '',
      list: ['item1', 'item2', 'item3']
    }
  }
  changeHanler (e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  deleteHandler (index) {
    const { list } = this.state;
    const tempList = list.splice(index, 1);
    this.setState({
      list: list
    });
    console.log(`删除 ${tempList[0]} 成功.`)
  }

  addHandler () {
    const { inputValue, list } = this.state;
    if (!inputValue) return;
    this.setState({
      list: [...list, inputValue],
      inputValue: ''
    }, () => {
      // 由于是setState是异步,所以等页面个渲染后获取DOM都在此回调函数中获取
      console.log('ul childrens count:', this.ulRef.querySelectorAll('li').length);
    });
    // 在此获取就有问题
    // console.log('ul childrens count:', this.ulRef.querySelectorAll('li').length);
  }

  render () {
    const { inputValue, list } = this.state;
    return (
      <Fragment>
        <aside>
          <input type="text" value={inputValue} onChange={this.changeHanler.bind(this)}/>
          <input type="button" value="添加" onClick={this.addHandler.bind(this)}/>
        </aside>
        <ul ref={(ulRef) => {this.ulRef=ulRef}}>
          {
            list.length > 0 && list.map((item, index) => {
              return (
               <Item key={`list_${index}`} index={index} item={item} deleteHandler={this.deleteHandler.bind(this)}/>
              )
            })
          }
        </ul>
      </Fragment>
    );
  }
}

export default Test;