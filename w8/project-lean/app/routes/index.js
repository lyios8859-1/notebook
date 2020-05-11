const express = require('express');
const router = express.Router();
// const trimHtml = require('trim-html');
// console.log(trimHtml+"===");
const Content = require('../dao/content');
// 首页查询数据
router.get('/', function(req, res, next) {
  Content.find({ status: 1, isdelete: 0 }, function(err, result) {
    if (!err) {
      Content.count({ status: 1, isdelete: 0 }, function(err, count) {
        if (!err) {
          // 数据的进一步处理
          const newData = result.map(function(document, index, currentArr) {
            const data = {
              title: document.getTitle(),
              // content:trimHtml(document.content, { limit: 5 }).html // 已经放在自定义标签处理了,这就可以不用了
              content: document.content
            };
            // 对象混入
            return mix(document, data);
          });
          // 异步返回查询数据和总数
          // res.send({result:result,totalCount:count});
          res.render('index', { result: newData, totalCount: count });
        }
      });
    }
  }).sort({ 'ctime': 'desc' }).skip(0).limit(3);
});
// 分页对象
const Params = {
  pageNo: 0,
  pageSize: 3
};

// 搜索并分页
router.post('/search', function(req, res, next) {
  // 获取前端ajax提交过来的分页信息
  Params.pageNo = parseInt(req.body.pageNo || 0, 10);
  Params.pageSize = parseInt(req.body.pageSize || 3, 10);
  // 查询条件
  const params = { status: 1, isdelete: 0 };
  // 获取关键词进行检索
  const keyword = req.body.keyword;
  if (keyword) {
    // 模糊搜索的条件
    const likeArr = [
      { title: { $regex: keyword, $options: 'i' }},
      { content: { $regex: keyword, $options: 'i' }}
    ];
    params['$or'] = likeArr; // or查询
  }
  // 查询所有数据
  Content.find(params, function(err, result) {
    if (!err) {
      // 求总数是不需要分页和排序的
      Content.count(params, function(err, count) {
        if (!err) {
          // 数据的进一步处理
          const newData = result.map(function(document, index, currentArr) {
            const data = {
              title: document.getTitle(),
              // content:trimHtml(document.content, { limit: 5 }).html// 已经放在自定义标签处理了,这就可以不用了
              content: document.content
            };
            // 对象混入
            return mix(document, data);
          });
          // 异步返回查询数据和总数,在页面做拼接 (方式一)
          // res.send({result:result,totalCount:count});
          // 跳转到模板页面(方式一)
          res.render('partials/contenttemplate', { result: newData, totalCount: count, layout: null });
        }
      });
    }
  }).sort({ ctime: 'desc' }).skip(Params.pageNo).limit(Params.pageSize);
});

// 详情页面
router.get('/pages/:id', function(req, res, next) {
  Content.findOne({ _id: req.params.id }, function(err, result) {
    if (!err) {
      res.render('pages', result);
    }
  });
});

// 添加页面
router.get('/add', function(req, res, next) {
  res.render('add');
});

// 保存的业务
router.post('/save', function(req, res, next) {
  console.log(req.body);
  new Content(req.body).save(function(err, result) {
    if (!err) {
      res.send(result);
    } else {
      res.send('fail');
    }
  });
});

// 详情页面
router.get('/edit/:id', function(req, res, next) {
  Content.findOne({ _id: req.params.id }, function(err, result) {
    if (!err) {
      res.render('edit', result);
    }
  });
});

// 修改的业务
router.post('/update/:id', function(req, res, next) {
  Content.update({ _id: req.params.id }, { $set: req.body }, function(err, result) {
    if (!err) {
      res.send(result);
    } else {
      res.send('fail');
    }
  });
});

// 删除页面
router.post('/del', function(req, res, next) {
  Content.remove({ _id: req.body.opid }, function(err) {
    if (!err) {
      res.send('success');
    } else {
      res.send('fail');
    }
  });
});

// 没有登录就登录
router.get('/login', function(req, res, next) {
  if (req.session.username === req.params.name) {
    console.log('已经登录');
    res.redirect('/');
  } else {
    res.render('admin/login', { title: '请登录', layout: null });
  }
});

// 多对象混入
function mix(target, source) {
  const arr = [];
  const args = arr.slice.call(arguments);

  let i = 1;
  if (args.length === 1) {
    return target;
  }

  while ((source = args[i++])) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

module.exports = router;
