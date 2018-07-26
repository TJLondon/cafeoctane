const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});



module.exports = {
    entry: {
        main: './src/js/FacebookRouter.js'
    },
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
                        use:['style-loader','css-loader', 'sass-loader']

            }
        ]
    },

    plugins: [htmlWebpackPlugin]
};