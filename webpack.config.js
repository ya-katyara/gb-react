const path = require("path");
const webpack = require('webpack');

module.exports = {
   entry: {
       app: './index.js',
   },
   context: path.resolve(__dirname, "static_src"),
   output: {
       path: path.resolve(__dirname, "static", "build"),
       filename: 'app.js',
       publicPath: '/static/',
   },
   resolve: {
    modules: [`${__dirname}/static_src`, 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
   devtool: "source-map",
   devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "static"),
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, "static_src"),
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              presets: ['@babel/env', '@babel/react'],
              plugins: [
                [
                    "@babel/plugin-proposal-class-properties",
                    {
                        "loose": true
                    }
                ]
              ]
            }
        },
        {
            test: /\.css$/i,
            use: ["css-loader"],
        },
    ],
  },
};