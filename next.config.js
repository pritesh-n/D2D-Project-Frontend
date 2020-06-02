// next.config.js
const webpack = require("webpack");
const _ = require("lodash");

require("dotenv").config();

//get all environment variables starting with REACT_APP_ prefix only.
let envConfig = (processEnv) => {
  return _.pickBy(processEnv, (value, key) => {
    return _.startsWith(key, "REACT_APP_");
  });
};

const PROCESS_ENV = { ...envConfig(process.env) };

module.exports = {
  //   cssModules: true,
  //   cssLoaderOptions: {
  //     importLoaders: 1,
  //     localIdentName: "[local]___[hash:base64:5]"
  //   },
  webpack: (config, options) => {
    //all env variables starting with REACT_APP_ prefix will be loaded.
    config.plugins.push(new webpack.EnvironmentPlugin(PROCESS_ENV));
    //push rules for fonts and images.images included directly in css require this.
    config.module.rules.push(
      // Load Fonts
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=40000&mimetype=application/font-woff",
      },
      {
        test: /\.(eot)$/,
        loader: "file-loader",
      },
      // Load images.
      {
        test: /\.(gif|jpe?g|png|ttf|svg)$/,
        loader: "url-loader?limit=200000",
      }
    );
    return config;
  },
};
