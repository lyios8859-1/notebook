import * as _ from './lodash';
class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
      this.fullName = _.join([firstName, " ", middleInitial, " " , lastName]);
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person : Person) {
  return _.join(["Hello, ", person.firstName, " ", person.lastName])
}

let user = new Student("Jane", "M.", "Tom");

document.body.innerHTML = greeter(user);