import React, { Component } from 'react';

import { dateFormat } from '../../utils/utils.js';
import './style.css';

class TodoMvc extends Component {
  constructor () {
    super();
    this.state = {
      new_content: '',
      edit_id: -1,
      wait_count: 0,
      toggle_all: false,
      isShowClear: false,
      filter: 'all',
      todos: [
        {
          id: 0,
          isCompleted: true,
          content: 'Test Conent',
          createTimer: '1970-01-01 00:00:00'
        },
        {
          id: 1,
          isCompleted: false,
          content: 'Test Conent',
          createTimer: '1970-01-01 00:00:00'
        },
        {
          id: 2,
          isCompleted: false,
          content: 'Test Conent',
          createTimer: '1970-01-01 00:00:00'
        }
      ]
    }
  }

  componentDidMount () {
    this.computedWaitCount();
  }

  renderList () {
    const { todos, edit_id, filter } = this.state;

    return todos.map((todo, index) => {
      // 未完成
      if (filter === 'unfinished' && todo.isCompleted) {
        return null;
      }
      // 已完成
      if (filter === 'completed' && !todo.isCompleted) {
        return null;
      }
      return (
        <li key={index.toString()} className="todo-list">
          <p className="todo-check-btn">
            <input type="checkbox" checked={todo.isCompleted} onChange={e => this.checkeBoxdHandle(e, todo)} />
          </p>
          <p className="todo-del-btn" onClick={ e => this.delTodoItemHandle(e, todo)}>删除</p>
          <p className="todo-item-warp" onDoubleClick={e => this.editTodoItemHandle(e, todo)}>
            <span className="todo-item-timer">{todo.createTimer}</span>
            <span className={['todo-item-content', todo.isCompleted ? 'isComponlate' : null].join(' ')}>{todo.content}</span>
          </p>
          <form onSubmit={e => this.editEndHandle(e)}>
            <input type="text" 
              className={['todo-item-edit', edit_id === todo.id ? 'isShow' : null].join(' ')} 
              ref={'todo_'+todo.id}
              onChange={e => this.saveEditValueHandle(e, todo)}
              onBlur={e => this.editEndHandle(e)}
              value={todo.content}/>
          </form>
        </li>
      )
    });
  }

  // 计算待办事项
  computedWaitCount () {
    // 确保每次增删改的状态
    this.state.isShowClear = false;
    let count = 0;
    let toggleAllChecked = true;
    this.state.todos.forEach(todo => {
      if (!todo.isCompleted) {
        count++;
        toggleAllChecked = false;
      } else {
        // 显示删除所有完成的事项按钮
        this.state.isShowClear = true;
      }
    });
    this.setState({
      wait_count: count,
      toggle_all: toggleAllChecked
    });
  }

  todoItemHandle (e) {
    e.stopPropagation();
    this.setState({
      new_content: e.target.value
    });
  }

  addTodoItemHandle (e) {
    const _this = this;
    e.preventDefault();
    // 未输入，返回
    if (_this.state.new_content.trim() === '') {
      return;
    }
    let maxId = -1;
    _this.state.todos.forEach(todo => {
      if (todo.id > maxId) {
        maxId = todo.id;
      }
    });
    maxId++;
    // 添加数据
    _this.state.todos.unshift({
      id: maxId,
      isCompleted: false,
      content: _this.state.new_content,
      createTimer: dateFormat(new Date())
    });

    // 更新数据到视图呈现, 建议 指定需要更新的数据，这里没有，就传递了一个空对象
    _this.setState({});

    // 清空输入框
    _this.setState({
      new_content: ''
    });

    this.computedWaitCount();
  }

  delTodoItemHandle (e, todo) {
    e.preventDefault();
    const { todos } = this.state;
    // 找到对应的数据的索引
    const index = todos.findIndex( t => t.id === todo.id );
    // 从 todos 中删除指定的 index 索引的数据
    todos.splice(index, 1);

    // 更新视图, 建议指定某个数据，不建议直接传递 {}
    this.setState({});

    this.computedWaitCount();
  }

  checkeBoxdHandle (e, todo) {
    e.stopPropagation();
    todo.isCompleted = e.target.checked;
    // 更新视图，不建议直接传递 {}，最好指定
    this.setState({});
    this.computedWaitCount();
  }

  editTodoItemHandle (e, todo) {
    e.stopPropagation();
    if (todo.isCompleted) return; 
    this.setState({
      edit_id: todo.id
    }, () => {
      // 编辑框获取焦点, 必须等 DOM 渲染结束后获取
      this.refs['todo_' + todo.id].focus()
    });
  }

  saveEditValueHandle (e, todo) {
    e.stopPropagation();
    todo.content = e.target.value;
    todo.createTimer = dateFormat(new Date());
    this.setState({});
  }

  editEndHandle (e) {
    e.preventDefault();
    this.setState({
      edit_id: -1
    });
  }

  toggleAllHandle (e) {
    e.stopPropagation();
    let isChecked = e.target.checked;
    
    this.state.todos.forEach(todo => {
      todo.isCompleted = isChecked;
    });

    this.setState({
      toggle_all: isChecked
    });

    this.computedWaitCount();
  }

  toggleReverseHadle (e) {
    e.stopPropagation();
    this.state.todos.forEach(todo => {
      todo.isCompleted = !todo.isCompleted;
    });
    this.computedWaitCount();
  }

  cleanAllCompleteHadle (e) {
    e.stopPropagation();
    const { todos } = this.state;
    // 这里必须这个循环
    for (let i = todos.length -1; i >= 0; i--) {
      if (todos[i].isCompleted) {
        todos.splice(i, 1);
      }
    }
    this.setState({});
  }

  filterTodoList (e) {
    e.stopPropagation();
    if (e.target.tagName.toLowerCase() !== 'p') return;
    const type = e.target.dataset.active;
    // type = 'completed', 'unfinished', 'all';
    this.setState({
      filter: type
    });
  }
  render () {
    const { new_content, wait_count, toggle_all, isShowClear } = this.state;
   
    return (
      <div className="todo-mvc">
        <header>
          <form onSubmit={(e) => this.addTodoItemHandle(e)}>
            <input type="text" placeholder="请输入您的任务名称, 按回车键确认"
              autoFocus
              value={new_content}
              onChange={e => this.todoItemHandle(e)}
              onBlur={ e => this.addTodoItemHandle(e)} />
          </form>
        </header>
        <main>
          <ol>
            {this.renderList()}
          </ol>
        </main>
        <aside onClick={e => this.filterTodoList(e)}>
          <p data-active="all">全部</p>
          <p data-active="completed">已完成</p>
          <p data-active="unfinished">未完成</p>
        </aside>
        <footer>
          <p className="todo-list-all-select">
            <label htmlFor="todo-list-select">
              <input id="todo-list-select" type="checkbox" onChange={e => this.toggleAllHandle(e)} checked={toggle_all} />
              <span>{toggle_all ? '全不选' : '全选'}</span>
            </label>
          </p>
          <p>待办：{wait_count}</p>
          <p className="todo-list-reverse-select">
            <span onClick={e => this.toggleReverseHadle(e)}>反选</span>
          </p>
          {
            isShowClear && (
              <p className="todo-list-clear-completed">
                <span onClick={e => this.cleanAllCompleteHadle(e)}>删除已完成</span>
              </p>
            )
          }
          
        </footer>
      </div>
    );
  }
}

export default TodoMvc;