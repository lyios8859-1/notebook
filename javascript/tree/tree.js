/**
 * 1 办公管理
 *  1-2 请假申请
 *    1-2-3 请假记录
 *  1-2 出差申请
 * 1 系统设置
 *  1-2 权限管理
 *    1-2-3 用户角色
 *    1-2-3 菜单设置
 */

// 数据
const data = [
  { id: 1, name: '办公管理', pid: 0 },
  { id: 2, name: '请假申请', pid: 1 },
  { id: 3, name: '出差申请', pid: 1 },
  { id: 4, name: '请假记录', pid: 2 },
  { id: 5, name: '系统设置', pid: 0 },
  { id: 6, name: '权限管理', pid: 5 },
  { id: 7, name: '用户角色', pid: 6 },
  { id: 8, name: '菜单设置', pid: 6 }
];

// id,与pid之间的对应关系，当pid不存在，或pid:0的时候，这一项，应该为树的顶端,那么我们需要去重新建一次索引，
// 以原数据集的id的值，重新生成一个(树形结构)的数据.如下:

const data2 = [
  { id: 1, name: '办公管理', pid: 0,
    children: [
      { id: 2, name: '请假申请', pid: 1,
        hildren: [
          { id: 4, name: '请假记录', pid: 2 }
        ]
      },
      { id: 3, name: '出差申请', pid: 1 }
    ]
  },
  { id: 5, name: '系统设置', pid: 0,
    children: [
      { id: 6, name: '权限管理', pid: 5,
        hildren: [
          { id: 7, name: '用户角色', pid: 6 },
          { id: 8, name: '菜单设置', pid: 6 }
        ]
      }
    ]
  }
];

// 数据递归
function toTree(data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {};
  data.forEach(function(item) {
    map[item.id] = item;
  });
  //        console.log(map);
  const val = [];
  data.forEach(function(item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map[item.pid];
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
}
console.log(toTree(data));

// 菜单列表html
let menus = '';

// 根据菜单主键id生成菜单列表html
// id：菜单主键id
// arry：菜单数组信息
function GetData(id, arry) {
  const childArry = GetParentArry(id, arry);
  if (childArry.length > 0) {
    menus += '<ul style="margin-left:' + 20 + 'px">';
    for (const i in childArry) {
      menus += '<li>' + childArry[i].name;
      GetData(childArry[i].id, arry);
      menus += '</li>';
    }
    menus += '</ul>';
  }
}

// 根据菜单主键id获取下级菜单
// id：菜单主键id
// arry：菜单数组信息
function GetParentArry(id, arry) {
  const newArry = [];
  for (const i in arry) {
    if (arry[i].pid === id) { newArry.push(arry[i]); }
  }
  return newArry;
}
