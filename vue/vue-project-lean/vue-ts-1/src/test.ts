import ActionHelper from './store/ActionHelper';
import ItemData from './model/ItemData';
import category from './model/CategoryEnum';

const actionHelper = new ActionHelper();
// 测试新增
const newItem1 = new ItemData(-1, category.Work, '我喜欢单手开宝马dsaaa', '吹');
newItem1.id = actionHelper.addNote(newItem1);
console.log(newItem1);

// 测试编辑
const newItem = new ItemData(5, category.Work, '迈巴赫更加霸气', '牛逼');
actionHelper.editNote(newItem);

// 测试删除
actionHelper.deleteNote(6);