const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './build/src/index.js',
  mode: "development",
  watch: true,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.json']
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html'
    })
  ]
}
