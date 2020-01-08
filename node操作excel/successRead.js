let fs = require('fs');
let readline = require('readline');
let path = require('path');
let xlsx = require('node-xlsx');

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName, callback) {
    let fRead = fs.createReadStream(fReadName);
    let objReadline = readline.createInterface({
        input: fRead
    });
    let str = '';
    objReadline.on('line', function (line) {
        if (line.includes('"_id":')) {
            str = line.substring(line.indexOf('"_id":') + 8, line.indexOf('",'));

        }
    });
    objReadline.on('close', function () {
        callback(str);
    });
}
// 递归读取目录下的所有文件
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        let fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList); //递归读取文件
        } else {
            filesList.push(fullPath);
        }
    });
    return filesList;
}
let filesList = [];
readFileList(__dirname, filesList);

let pacageList2 = filesList.filter((file) => {
    return file.includes('package.json') && file.lastIndexOf('/node_modules/') === 43
})


var data = [];
var obj = Object.create(null);
obj.name = 'sheet1';
obj.data = [];

pacageList2.forEach(function (str) {
    readFileToArr(str, function (str) {
        obj.data.push(str.split('@'));
    })
});



setTimeout(() => {
    console.log(JSON.stringify(data, null, 2));
    data.push(obj);
    let buffer = xlsx.build(data);

    // 写入文件
    fs.writeFile('./a.xlsx', buffer, function (err) {
        if (err) {
            console.log("Write failed: " + err);
            return;
        }

        console.log("Write completed.");
    });
}, 3000);


