var express = require('express');
var router = express.Router();

const fs = require('fs');
const readstream = fs.createReadStream('./public/mp3/2.lrc');



const readeFileCon = async (filePath) => {
  return new Promise((resovle, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resovle(data);
    });
  });
}

// /* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getLrc', function (req, res, next) {
  let lrcName = req.body.lrcFile;
  let filePath = '';
  if (lrcName == '1') {
    filePath = './public/mp3/1.lrc';
    console.log('11111111111111111111111111111111111');
  } else {
    filePath = './public/mp3/2.lrc';
    console.log('222222222222222222222222222222222');
  }
  console.log('>>', lrcName);
  readeFileCon(filePath).then(data => {
    res.write(data);
    res.end();
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
