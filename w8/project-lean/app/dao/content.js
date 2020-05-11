// 获取mongoose的连接对象
var mongoose = require('../core/Connection');
// 建立一个Schema的文档对象
var ContentSchema = mongoose.Schema({
  title: String, // 标题
  ctime: { type: Date, default: Date.now }, // 创建时间
  content: String, // 内容
  link: String, // 外面连接
  tags: String, // 标签
  cid: Number, // 分类id
  hits: { type: Number, default: 1 }, // 点击数
  utime: { type: Date, default: null }, // 更新时间
  status: { type: Number, default: 1 }, /* 0未发布1发布 */
  isdelete: { type: Number, default: 0 }/* 0未删除1删除,逻辑删除：只是改一个状态，数据还是保留，物理删除：数据库不存在*/
});

ContentSchema.methods.getTitle = function() {
  var title = this.title;
  return title + '_LY';
};

// Schema提供了一个静态扩展，是表范围级别的。
// ContentSchema.statics.findTitle = function(title) {
//    return title+"_ly";
// };

// 创建集合(创建表)
var Content = mongoose.model('Content', ContentSchema);

module.exports = Content;

