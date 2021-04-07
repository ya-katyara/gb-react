const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "static_src", "index.js"),
  output: {
    path: path.join(__dirname, "static", "build"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    modules: [`${__dirname}/static_src`, 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
 },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "static_src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};