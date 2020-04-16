import React, { Component, Fragment} from 'react';

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
    });
  }

  render () {
    const { inputValue, list } = this.state;
    return (
      <Fragment>
        <aside>
          <input type="text" value={inputValue} onChange={this.changeHanler.bind(this)}/>
          <input type="button" value="添加" onClick={this.addHandler.bind(this)}/>
        </aside>
        <ul>
          {
            list.length > 0 && list.map((item, index) => {
            return (
              <li key={`list_${index}`} style={{margin: "20px 0"}}>
                <span>{item}</span>
                <span style={{marginLeft: "20px"}} onClick={this.deleteHandler.bind(this, index)}>删除</span>
              </li>
            )
            })
          }
        </ul>
      </Fragment>
    );
  }
}

export default Test;