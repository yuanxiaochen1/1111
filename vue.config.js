const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/m/" : "/",
  /* pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "m.index.html",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  }, */
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@src", resolve("src"))
      .set("@view", resolve("src/view"))
      .set("@store", resolve("src/store"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"));
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://test.shop.stringon.com/pxt-test", //对应自己的接口
        changeOrigin: true
      }
    }
  }
};
