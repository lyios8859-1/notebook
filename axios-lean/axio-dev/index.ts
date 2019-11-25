abstract class Department {
  name: string = 'Tom';
  constructor (name: string) {
    this.name = name;
  }
  abstract printMeeting (): void ;
  printName (): void {
    console.log('Department name ' + this.name);
  }
}

class AccountingDepartment extends Department {
  constructor () {
    super('Accouting ad Auditiong');
  }
  printMeeting(): void {
    console.log('The Department meets!');
  }
  genterteReports (): void {
    console.log('genterteReports');
  }
}

let department: Department = new AccountingDepartment();
department.printMeeting();
department.printName();
 // 因为我们规定了AccountingDepartment实例是一个抽象的Department，
 // 因此department.genterteReports();会编译报错
// department.genterteReports();