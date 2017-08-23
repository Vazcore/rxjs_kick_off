var path = require('path');

module.exports = {
  entry: {
    index: __dirname + '/src/js/index.js',
    vendor: __dirname + '/src/js/vendor.js',
    map: __dirname + '/src/js/map.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  devServer: {
    inline: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file?name=src/fonts/[name].[ext]'
          }
        ]
      }
    ]
  }
};