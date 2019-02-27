var BundleTracker = require('webpack-bundle-tracker')
var path = require('path')
module.exports = {
    entry: "./static/js/index.js",
    output: {
        path: path.resolve('./static/bundles'),
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
         test: /.jsx?$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
           presets: ['react', 'es2015']
         }
       }
      ]
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ]
};
