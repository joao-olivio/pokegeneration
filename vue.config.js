const path = require("path");
const FractalWebpackPlugin = require("fractal-webpack-plugin");

module.exports = {
  runtimeCompiler: true,

  configureWebpack: {
    plugins: [
      new FractalWebpackPlugin({
        mode: "server",
        configPath: "./fractal.config.js"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/components")
      },
      extensions: [".js", ".vue"]
    }
  },

  filenameHashing: false,

  chainWebpack: config => {
    config.optimization.delete("splitChunks");
    config.plugins.delete("html");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    config.plugins.delete("pwa");
  },

  css: {
    extract: {
      filename: "/css/[name].css"
    },
    sourceMap: true
  }
};