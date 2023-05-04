const fs = require('fs');
const path = require('path');

const prefix = 'https://ad.hnhxhd.cn/xinhaoba';

// 读取 asset-manifest.json 文件
const assetManifestPath = path.join(__dirname, 'build', 'asset-manifest.json');
const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath));

// 将所有文件路径加上前缀
const newAssetManifest = {};
for (const [key, value] of Object.entries(assetManifest.files)) {
  newAssetManifest[key] = `${prefix}${value}`;
}

// 写入新的 asset-manifest.json 文件
assetManifest.files = newAssetManifest;
fs.writeFileSync(assetManifestPath, JSON.stringify(assetManifest, null, 2));