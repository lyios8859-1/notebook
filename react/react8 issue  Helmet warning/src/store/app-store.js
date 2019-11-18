import {
  observable,
  computed,
  action
} from 'mobx';

export default class AppState {
  constructor ({ count, name } = { count: 1, name: 'Tom' }) {
    this.count = count;
    this.name = name;
  }

  @observable count;

  @observable name;

  @computed get msg () {
    return `${this.name}===${this.count}`;
  }

  @action add () {
    this.count += 1;
  }

  @action setName (name) {
    this.name = name;
  }

  toJson () {
    return {
      count: this.count,
      name: this.name
    };
  }
}
