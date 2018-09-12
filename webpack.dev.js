const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    minify: true
});



module.exports = {
    entry: ['@babel/polyfill', './src/js/app.js']
    ,
    output: {
        path:  __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test:/\.(s*)css$/,
                        use:[MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        htmlWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};