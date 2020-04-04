var xlsx = require('node-xlsx');
var fs = require('fs');

// 解析得到文档中的所有 sheet
var sheets = xlsx.parse('./data.xls');
// 遍历 sheet
var data = [];
sheets.forEach(function (sheet) {
    var obj = Object.create(null);
    // console.log('name=', sheet['name']);
    obj.name = sheet['name'];
    obj.data = [];
    // 读取每行内容
    for (var rowId in sheet['data']) {
        var row = sheet['data'][rowId];
        // console.log(rowId, '=', row);
        obj.data.push(row);
    }
    data.push(obj);
});
// console.log(JSON.stringify(data, null, 2));


var buffer = xlsx.build(data);

// 写入文件
fs.writeFile('./a.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }

    console.log("Write completed.");
});


// var datas = [{
//     name: 'sheet1',
//     data: [
//         [
//             'ID',
//             'Name',
//             'Score'
//         ],
//         [
//             '1',
//             'Michael',
//             '99'

//         ],
//         [
//             '2',
//             'Jordan',
//             '98'
//         ]
//     ]
// },
// {
//     name: 'sheet2',
//     data: [
//         [
//             'AA',
//             'BB'
//         ],
//         [
//             '23',
//             '24'
//         ]
//     ]
// }
// ]
// var buffer = xlsx.build(datas);

// // 写入文件
// fs.writeFile('a.xlsx', buffer, function (err) {
//     if (err) {
//         console.log("Write failed: " + err);
//         return;
//     }

//     console.log("Write completed.");
// });