var express = require('express');
var router = express.Router();

const fs = require('fs');
// const readstream = fs.createReadStream('./public/mp3/2.lrc');

const readeFileCon = async(filePath) => {
  return new Promise((resovle, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resovle(data);
    });
  });
};

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/getLrc', function(req, res, next) {
  const lrcName = req.body.lrcFile;
  let filePath = '';
  const lrcList = ['./public/mp3/0.lrc', './public/mp3/1.lrc', './public/mp3/2.lrc', './public/mp3/3.lrc', './public/mp3/4.lrc', './public/mp3/5.lrc'];
  /*
  switch (lrcName) {
    case '0':
      filePath = './public/mp3/0.lrc';
      break;
    case '1':
      filePath = './public/mp3/1.lrc';
      break;
    case '2':
      filePath = './public/mp3/2.lrc';
      break;
    case '3':
      filePath = './public/mp3/3.lrc';
      break;
    case '4':
      filePath = './public/mp3/4.lrc';
      break;
    case '5':
      filePath = './public/mp3/5.lrc';
      break;
    default:
      break;
  }
  */
  console.log('>>', lrcName);
  filePath = lrcList[lrcName * 1];
  readeFileCon(filePath).then(data => {
    res.write(data);
    res.end();
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
