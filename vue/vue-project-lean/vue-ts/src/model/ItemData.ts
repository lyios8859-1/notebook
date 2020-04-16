import Category from './CategoryEnum';
import it from '../store/DataHelper';
(window as any).it = it;
console.log(it);
interface Timer {
  'M+': number; // 月份
  'd+': number; // 日
  'h+': number; // 时
  'm+': number; // 分
  's+': number; // 秒
  'q+': number; // 季度
  S: number; // 毫秒
  [propsName: string]: number;
};

class ItemData {
  id!: number;
  categoryId!: Category;
  title!: string;
  content!: string;
  createTime!: string;

  constructor (id = -1, categoryId: Category = -1, title = '', content = '') {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.content = content;
    this.createTime = this.formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss');
  }

  formatDate (data: number, format = 'YY-MM-DD hh:mm:ss') {
    const time: Date = new Date(data);
    const o: Timer = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      S: time.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (time.getFullYear() + '').substring(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k].toString() : (('00' + o[k]).substring(('' + o[k]).length)));
      }
    }
    return format;
  }
}

export default ItemData;
