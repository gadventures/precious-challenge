var BundleTracker = require('webpack-bundle-tracker')
var path = require('path')

module.exports = {
    entry: "./static/js/index.js",
    mode: "development",
    output: {
        path: path.resolve('./static/bundles'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
             test: /.jsx?$/,
             loader: 'babel-loader',
             exclude: /node_modules/,
           },
           {
            test:/\.scss$/,
            use:['style-loader','css-loader']
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
