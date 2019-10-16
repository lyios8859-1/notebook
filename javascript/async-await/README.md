# async/await

> Generator --> Promise --> 地狱回调(callback hell) --> 异步 --> 单线程的javascript
> async: 用在函数前,表示函数是一个异步函数,则该函数的执行不会阻塞海面的代码,async 函数返回的是
> 一个promise对象.
> await: await(等待)后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。同步的效果

## 简单案例

```javascript
function fetchApi(method, url) {
  return new Promise((resolve, reject) => {
    let t = setTimeout(() => {
      if (true) {
        // 请求正确
        reject({
          code: 200,
          masage: 'Success'
        });
      } else {
        // 请求错误
        reject({
          code: 500,
          masage: 'Server Fail'
        });
      }
    });
  });
}

// 调用
(async function() {
  try {
    let result = await fetchApi();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();


// 例2
function fetchApi (options) {
  return new Promise((resolve, reject) => {
    let xhr = null;
    const params = formsParams(options.data);
    // 创建对象
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (options.type === 'GET') {
      xhr.open(options.type, options.url + '?' + params, options.async);
      xhr.send(null);
    } else if (options.type === 'POST') {
      xhr.open(options.type, options.url, options.async);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(params);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // options.success(xhr.responseText);
        resolve(xhr.responseText);
      } else {
        reject();
      }
    };
  });

  function formsParams (data) {
    const arr = [];
    for (const prop in data) {
      arr.push(prop + '=' + data[prop]);
    }
    return arr.join('&');
  }
}

async function main () {
  const data1 = await fetchApi({});
  const data2 = await fetchApi({});
  console.log(data1);
  console.log(data2);
}

main();

```

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

## await和async，将回调函数变成同步的处理

[参考](https://blog.csdn.net/zdhsoft/article/details/79469622 "df")

```javascript
/**
 * 异步调用函数,注意：要求第一个参数回调函数
 * @static
 * @param {function} paramFunc 要调用的函数
 * @param {...args} args 要调用的参数
 * @return {...args} 返回回调函数的传入参数列表
 */
async function WaitFunction(paramFunc, ...args) {
  return new Promise((resolve) => {
    paramFunc((...result) => {
      resolve(result);
    }, ...args);
  });
}

/**
 * 异步调用函数,注意：
 * - 要求第一个参数回调函数,要给函数的参数
 * - 要求以依次存放到数组paramList传入。
 * 
 * 这个函数和WaitFuncion主要的区别是：传入函数的回调，是放到最后面的，而WaitFuncion则要求是第一个参数
 * 
 * @static
 * @param {function} paramFunc 要调用的函数
 * @param {...args} args 要传给函数的参数数组
 */
async function WaitFunctionEx(paramFunc, ...args) {
  return new Promise((resolve) => {
    paramFunc(...args, (...result) => {
      resolve(result);
    });
  });
}

/**
 *  异步调用类成员函数,注意：要求第一个参数回调函数
 * @static
 * @param {object} paramObject 要调用函数的对象实例
 * @param {String} paramFunc 要调用的函数名称
 * @param {...args} args 要调用的参数
 * @return {...args} 返回回调函数的传入参数列表
 */
async function WaitClassFunction(paramObject, paramFunction, ...args) {
  return new Promise((resolve) => {
    paramObject[paramFunction]((...result) => {
      resolve(result);
    }, ...args);
  });
}

/**
 *  异步调用类成员函数,注意：要求第一个参数回调函数
 * @static
 * @param {object} paramObject 要调用函数的对象实例
 * @param {String} paramFunc 要调用的函数名称
 * @param {...args} args 要调用的参数
 * @return {...args} 返回回调函数的传入参数列表
 */
async function WaitClassFunctionEx(paramObject, paramFunction, ...args) {
  return new Promise((resolve) => {
    paramObject[paramFunction](...args, (...result) => {
      resolve(result);
    });
  });
}
```
