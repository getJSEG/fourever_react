const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: "./index.js",
  output: {
    clean: true,
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-bundle.js",
    publicPath:"/",
    assetModuleFilename: 'assets/[name][ext]'
  },
  module: {
    rules: [
        {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: ['file-loader']
        },
        {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html', //source,
      title: "Inventario",
      inject: true

    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
    client:{
      overlay:true,
    },
    compress: true,
    open: false,
    historyApiFallback: true,
    liveReload: true,
    hot: true,
    devMiddleware: {
      publicPath: '/'
    },
    port: 3000,
    hot: "only"
  },
};