# async/await

> Generator --> Promise --> 地狱回调(callback hell) --> 异步 --> 单线程的javascript

## 同步获取图片的高度,宽度

> 由于图片的加载是一个异步加载的过程,通过 `await getImgSize(url)`的方式，来同步获取图片大小

```javascript
// 获取图片宽高
function getImgSize(url) {
  // 返回一个Promise给await
  return new Promise((resolve, reject) => {
    const image = new Image();
    // 加载完成调用resolve
    image.onload = () => {
      resolve({
        width: image.width,
        height: image.height
      });
    };
    // 加载失败调用reject
    image.onerror = err => {
      reject(err);
    };
    // 添加src，触发加载
    image.src = url;
  });
}

// 同步获取图片大小
await getImgSize(url);
```

```javascript
// 上传图片并添加宽高参数
function uploadCdnImg(item) {
  const url = item.url;
  return new Promise((resolve, reject) => {
    if (url.indexOf("base64") > -1) {
      // 未同通过base64处理的，上传服务器
      $.ajax(
        url: "imgstore/upload",
        param: {str_img_data: url.split(",")[1]},
        success: async (data) => {
          // 同步获取宽高
          const imgSize = await getImgSize(url);
          // 添加到url尾部，并返回新的url和原本的数据信息
          const idnUrl = data.url + `?width=${imgSize.width}&height=${imgSize.height}`;
          resolve({...item, url: idnUrl});
        },
        error: (err) => {
          // 出错返回
          reject(err);
        }
      );
    } else {
      // 已处理的url，直接返回
      resolve(url);
    }
  })
}
```

```javascript
// 并行处理多个图片(同时处理一组的图片)
async function uploadImageList(list) {
  // 每一个图片url转换成一个Promise
  const promises = list.map(x => uploadCdnImg(x.url));
  // 同步并行处理所有图片
  try {
    const results = await Promise.all(promises);
  } catch (error) {
    alert('图片上传失败')
    return
  }
  return results;
}
```
