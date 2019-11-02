import {
  observable,
  computed,
  autorun,
  action
} from 'mobx';

class AppState {
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

const appState = new AppState();

autorun(() => {
  console.log('>>', appState.msg);
});

setInterval(() => {
  appState.add();
}, 1000);

export default appState;
