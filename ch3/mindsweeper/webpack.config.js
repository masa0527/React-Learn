module.exports = {
  context: __dirname + '/src',
  entry: "./entry",
  output: {
    path: __dirname + '/www/js',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets:['es2015']
        }
      }
    ]
  }
};
