import DataHelper from './DataHelper';
import ItemData from '../model/ItemData';

class ActionHelper {
  dataHelper: DataHelper = new DataHelper('test', 'id');
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
}

export default ActionHelper;
