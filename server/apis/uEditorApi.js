const fs = require('fs-extra');
const path = require('path');
const {v4} = require('uuid');
const uEditorConfig = require('../uEditorConfig');

async function uEditorApi(ctx, next) {
  let {action, start = 0} = ctx.query;

  switch (action) {
    case 'config':
      ctx.status = 200; // because koa defaults to 404
      ctx.body = JSON.stringify(uEditorConfig);
      return;
    case 'uploadimage':
      const file = ctx.request.body.files.file;
      const reader = fs.createReadStream(file.path);
      const fileName = v4() + file.name.slice(file.name.lastIndexOf('.'), file.name.length);
      const uploadPath = 'static/upload/img';
      await fs.ensureDir(uploadPath);
      const filePath = path.resolve(uploadPath, fileName);
      const stream = fs.createWriteStream(filePath);
      reader.pipe(stream);
      ctx.status = 200; // because koa defaults to 404
      ctx.body = JSON.stringify({state: 'SUCCESS', url: `/${uploadPath}/${fileName}`, title: fileName, original: file.name});
      // cosnole.log(ctx.body);
      return;
  }
}

module.exports = uEditorApi;
