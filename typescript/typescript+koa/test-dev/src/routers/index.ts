import Router from 'koa-router';
const router = new Router();

function getFile() {
  const fs = require('fs');
  const path = require('path');
  const files = fs.readdirSync(__dirname);
  files.filter((file: string) => ~file.search(/^[^\.].*\.ts$/)).forEach((file: string) => {
    const fileName = file.substr(0, file.length - 3);
    const fileEntity = require(path.join(__dirname, file));
    // console.log(fileName);

    if (fileName !== 'index') {
      router.use(`/${fileName}`, fileEntity.routes(), fileEntity.allowedMethods());
      // console.log(fileName);
    }
  });
}
getFile();
export default router;
