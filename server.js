const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const bundleServer = require('./dist/vue-ssr-server-bundle.json')
const resolve = file => path.resolve(__dirname, file);
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
app.use(express.static('./dist'));
app.use(async (req, res, next) => {
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
