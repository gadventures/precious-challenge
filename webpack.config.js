const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path')

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
               test: /\.(s*)css$/,
               use: ['style-loader', 'css-loader', 'sass-loader'] 
           }
        ]
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new HtmlWebpackPlugin({ 
            template: './templates/index.html',
            filename: './index.html'
        })
    ]
};
