var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = 'Tom';
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log('Department name ' + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, 'Accouting ad Auditiong') || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log('The Department meets!');
    };
    AccountingDepartment.prototype.genterteReports = function () {
        console.log('genterteReports');
    };
    return AccountingDepartment;
}(Department));
var department = new AccountingDepartment();
department.printMeeting();
