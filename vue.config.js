const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
        src: path.resolve(__dirname, "./src"),
        vue$: "vue/dist/vue.js",
      },
    },
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          loader: "html-loader",
          test: /\.html$/,
        },
      ],
    },
  },
};
