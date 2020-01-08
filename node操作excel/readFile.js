// var fs = require('fs')
// function pReadFile(filePath) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(filePath, 'utf8', function (err, data) {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }
// // 顺序读取文件
// pReadFile('./data/a.txt')
//   .then(function (data) {
//     console.log(data)
//     return pReadFile('./data/b.txt')
//   })
//   .then(function (data) {
//     console.log(data)
//     return pReadFile('./data/c.txt').then(function (data) {
//         console.log(data)
//         return pReadFile('./data/b.txt')
//       })
//       .then(function (data) {
//         console.log(data)
//         return pReadFile('./data/c.txt')
//       })
//       .then(function (data) {
//         console.log(data)
//       })
//   })


var fs = require('fs');
var readline = require('readline');

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close',function () {
       // console.log(arr);
        callback(arr);
    });
}
readFileToArr('./index.js', function(arr){
    console.log(arr)
})



/*
var readline = require('readline');
var fs = require('fs');
var os = require('os');
 
var fReadName = './index.js';
var fWriteName = './1.index.js';
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);
 
var enableWriteIndex = true;
fRead.on('end', ()=>{
	console.log('end');
	enableWriteIndex = false;
});
 
var objReadline = readline.createInterface({
	input: fRead,
  	output: fWrite, 
	terminal: true
});
 
 
var index = 1;
fWrite.write('line' + index.toString() +': ');
objReadline.on('line', (line)=>{
	console.log(index, line);
	if (enableWriteIndex) {
		// 由于readline::output是先写入后调用的on('line')事件，
		// 所以已经读取文件完毕时就不需要再写行号了... sodino.com
		index ++;
		var tmp = 'line' + index.toString() + ': ';
		fWrite.write(tmp);		
	}
});
objReadline.on('close', ()=>{
	console.log('readline close...');
});
*/


// 递归拷贝目录下所有文件和目录
var fs=require('fs');
var copy=function(src,dst){
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(function(path){
    var _src=src+'/'+path;
    var _dst=dst+'/'+path;
    fs.stat(_src,function(err,stats){ //stats 该对象 包含文件属性
      if(err)throw err;
      if(stats.isFile()){ //如果是个文件则拷贝
        let readable=fs.createReadStream(_src);//创建读取流
        let writable=fs.createWriteStream(_dst);//创建写入流
        readable.pipe(writable);
      }else if(stats.isDirectory()){ //是目录则 递归
        checkDirectory(_src,_dst,copy);
      }
    });
  });
}
var checkDirectory=function(src,dst,callback){
  fs.access(dst, fs.constants.F_OK, (err) => {
    if(err){
      fs.mkdirSync(dst);
      callback(src,dst);
    }else{
      callback(src,dst);
    }
   });
};
const  SOURCES_DIRECTORY = 'd:commonPrefab'; //源目录
checkDirectory(SOURCES_DIRECTORY,__dirname,copy);



var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('/media/timly/_dde_data/notebook/');

//调用文件遍历方法
// fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}



// 递归读取目录下的所有文件
var fs = require('fs');
var path = require('path');
// var exec = require('child_process').exec;
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
//   console.log(files);
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {   
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {        
      filesList.push(fullPath);           
    }    
  });
  return filesList;
}
var filesList = [];
readFileList(__dirname,filesList);
console.log(filesList);