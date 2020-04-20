class DataHelper {
  private dataKey: string;
  private primarykey: string;
  constructor (dataKey: string, primaryKey: string) {
    this.dataKey = dataKey;
    this.primarykey = primaryKey;
  }

  saveData (arrData: object[]): void {
    const str: string = JSON.stringify(arrData);
    localStorage.setItem(this.dataKey, str);
  }

  getData (): any[] {
    const strData: string | null = localStorage.getItem(this.dataKey);
    let arrDate: any[] = [];
    if (strData !== null) {
      arrDate = JSON.parse(strData);
    }
    return arrDate;
  }

  addData (contentObj: any): number {
    const arr: any[] = this.getData();

    const newId = arr.length > 0 ? arr[arr.length - 1][this.primarykey] + 1 : 1;

    contentObj[this.primarykey] = newId;

    arr.push(contentObj);
    this.saveData(arr);
    return newId;
  }

  deleteDataById (id: string | number): boolean {
    const arr = this.getData();
    const index = arr.findIndex(item => {
      return item[this.primarykey] === id;
    });

    if (index > -1) {
      arr.splice(index, 1);
      this.saveData(arr);
      return true;
    }
    return false;
  }
}

export default DataHelper;
