const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'build');

// 读取 HTML 文件
const html = fs.readFileSync(path.join(buildPath, 'index.html'), 'utf8');

// 替换静态资源路径
const newHtml = html.replace(
  /\/static\//g,
  'https://ad.hnhxhd.cn/xinhaoba/static/'
);

// 将修改后的 HTML 文件写回磁盘
fs.writeFileSync(path.join(buildPath, 'index.html'), newHtml);