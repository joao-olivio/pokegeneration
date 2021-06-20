const path = require("path");
const FractalWebpackPlugin = require("fractal-webpack-plugin");

const FractalInstance = new FractalWebpackPlugin({
  mode: "server",
  configPath: "./fractal.config.js",
});

module.exports = {
  runtimeCompiler: true,

  configureWebpack: {
    plugins: process.env.VUE_PRODUCTION ? [FractalInstance] : [],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/components"),
      },
      extensions: [".js", ".vue"],
    },
  },

  filenameHashing: false,

  chainWebpack: (config) => {
    if (!process.env.VUE_PRODUCTION) {
      config.optimization.delete("splitChunks");
      config.plugins.delete("html");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");

      config.plugins.delete("pwa");
    }
  },

  css: {
    extract: {
      filename: "/css/[name].css",
    },
    sourceMap: true,
  },
};
