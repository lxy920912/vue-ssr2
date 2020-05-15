// const express = require('express');
// const app = express();
const fs = require('fs');
const path = require('path');
const serve = require("koa-better-serve");
const { createBundleRenderer } = require('vue-server-renderer');
const bundleServer = require('./dist/vue-ssr-server-bundle.json')
const resolve = file => path.resolve(__dirname, file);
const Koa = require('koa');
const Kapp = new Koa();
const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}
const renderer = createBundleRenderer(bundleServer, {
  template: fs.readFileSync(resolve('./index.html'), 'utf8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json')
});
function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

Kapp.use(async (ctx, next) => {
  const url = ctx.url;
  const context = {
    title: 'ssr Koa',
    url: ctx.url
  }
  try {
    const html = await renderToString(context);
    ctx.body = html;
  } catch (e) {
    if (/^\/static\//.test(url)) {
      // console.log(`[error] error=${JSON.stringify(e)},url=${ctx.url}`);
    }
    await next();
  }
});
// Kapp.use(logger);
Kapp.use(serve('./dist'));
Kapp.listen(3001, () => {
  console.log("app listen 3001")
})
/*
app.use(express.static('./dist'));
app.use(async (req, res, next) => {
  const url = req.url;
  console.log(`[log] url=${url}`);
  try {
    const context = {
      title: '服务器渲染测试',
      url: req.url
    }
    //设置请求头
    res.set('Content-type', 'text/html');
    const render = await renderToString(context);
    // 将服务器端渲染好的html返回给客户端
    res.end(render);
  } catch (e) {
    console.log(e);
    // 如果没找到，放过请求，继续运行后面的中间件
    next()
  }
});
app.listen(3000);
*/
