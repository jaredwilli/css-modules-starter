const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	entry: './src',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                include: __dirname + '/src',
                test: /\.js/
            },
            {
                loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&loaclIdentName=[name]__[local]___[hash:base64:5]'),
                test: /\.css/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]

};
