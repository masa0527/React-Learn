module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/out`,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
