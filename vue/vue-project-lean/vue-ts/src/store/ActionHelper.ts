import DataHelper from './DataHelper';
import ItemData from '../model/ItemData';

class ActionHelper {
  dataHelper: DataHelper = new DataHelper('notedata', 'id');
  readonly dataList: ItemData[];

  constructor () {
    this.dataList = this.getData();
  }

  getData (): ItemData[] {
    const data: ItemData[] = this.dataHelper.getData();

    return data.map((item) => {
      const temp: ItemData = new ItemData();
      temp.id = item.id;
      temp.categoryId = item.categoryId;
      temp.title = item.title;
      temp.content = item.content;
      temp.createTime = item.createTime;
      return temp;
    });
  }

  addNote (item: ItemData): number {
    item.id = this.dataHelper.addData(item);
    this.dataList.push(item);
    this.dataHelper.saveData(this.dataList);
    return item.id;
  }

  editNote (item: ItemData): void {
    const editItem: ItemData | undefined = this.dataList.find((ele) => {
      return ele.id === item.id;
    });
    if (editItem) {
      editItem.categoryId = item.categoryId;
      editItem.title = item.title;
      editItem.content = item.content;
      this.dataHelper.saveData(this.dataList);
    }
  }

  deleteNote (id: number): void {
    const index: number = this.dataList.findIndex(ele => {
      return ele.id === id;
    });
    if (index > -1) {
      this.dataList.splice(index, 1);
      this.dataHelper.saveData(this.dataList);
    }
  }
}

export default ActionHelper;
