/*line1:*/ var xlsx = require('node-xlsx');
/*line2:*/ var fs = require('fs');
/*line3:*/ 
/*line4:*/ // 解析得到文档中的所有 sheet
/*line5:*/ var sheets = xlsx.parse('./data.xls');
/*line6:*/ // 遍历 sheet
/*line7:*/ var data = [];
/*line8:*/ sheets.forEach(function (sheet) {
/*line9:*/     var obj = Object.create(null);
/*line10:*/     // console.log('name=', sheet['name']);
/*line11:*/     obj.name = sheet['name'];
/*line12:*/     obj.data = [];
/*line13:*/     // 读取每行内容
/*line14:*/     for (var rowId in sheet['data']) {
/*line15:*/         var row = sheet['data'][rowId];
/*line16:*/         // console.log(rowId, '=', row);
/*line17:*/         obj.data.push(row);
/*line18:*/     }
/*line19:*/     data.push(obj);
/*line20:*/ });
/*line21:*/ // console.log(JSON.stringify(data, null, 2));
/*line22:*/ 
/*line23:*/ 
/*line24:*/ var buffer = xlsx.build(data);
/*line25:*/ 
/*line26:*/ // 写入文件
/*line27:*/ fs.writeFile('./a.xlsx', buffer, function(err) {
/*line28:*/     if (err) {
/*line29:*/         console.log("Write failed: " + err);
/*line30:*/         return;
/*line31:*/     }
/*line32:*/ 
/*line33:*/     console.log("Write completed.");
/*line34:*/ });
/*line35:*/ 
/*line36:*/ 
/*line37:*/ // var datas = [{
/*line38:*/ //     name: 'sheet1',
/*line39:*/ //     data: [
/*line40:*/ //         [
/*line41:*/ //             'ID',
/*line42:*/ //             'Name',
/*line43:*/ //             'Score'
/*line44:*/ //         ],
/*line45:*/ //         [
/*line46:*/ //             '1',
/*line47:*/ //             'Michael',
/*line48:*/ //             '99'
/*line49:*/ 
/*line50:*/ //         ],
/*line51:*/ //         [
/*line52:*/ //             '2',
/*line53:*/ //             'Jordan',
/*line54:*/ //             '98'
/*line55:*/ //         ]
/*line56:*/ //     ]
/*line57:*/ // },
/*line58:*/ // {
/*line59:*/ //     name: 'sheet2',
/*line60:*/ //     data: [
/*line61:*/ //         [
/*line62:*/ //             'AA',
/*line63:*/ //             'BB'
/*line64:*/ //         ],
/*line65:*/ //         [
/*line66:*/ //             '23',
/*line67:*/ //             '24'
/*line68:*/ //         ]
/*line69:*/ //     ]
/*line70:*/ // }
/*line71:*/ // ]
/*line72:*/ // var buffer = xlsx.build(datas);
/*line73:*/ 
/*line74:*/ // // 写入文件
/*line75:*/ // fs.writeFile('a.xlsx', buffer, function (err) {
/*line76:*/ //     if (err) {
/*line77:*/ //         console.log("Write failed: " + err);
/*line78:*/ //         return;
/*line79:*/ //     }
/*line80:*/ 
/*line81:*/ //     console.log("Write completed.");
/*line82:*/ // });