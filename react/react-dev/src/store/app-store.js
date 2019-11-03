import {
  observable,
  computed,
  action
} from 'mobx';

export default class AppState {
  @observable count = 0;

  @observable name = 'Tom';

  @computed get msg () {
    return `${this.name}===${this.count}`;
  }

  @action add () {
    this.count += 1;
  }

  @action setName (name) {
    this.name = name;
  }
}
