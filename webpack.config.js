const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const data = require('./data');

const paths = {
    BUILD: path.resolve(__dirname, 'build'),
    SRC: path.resolve(__dirname, 'src')
};

module.exports = {
	entry: [
        paths.SRC
    ],
	output: {
		path: paths.BUILD,
        filename: 'bundle.js',
        libraryTarget: 'umd' // super important
    },
    module: {
        loaders: [
            {
                loaders: ['babel-loader'],
                include: __dirname + '/src',
                test: /\.js/
            },
            {
                loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&loaclIdentName=[name]__[local]___[hash:base64:5]'),
                test: /\.css/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                   'file-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: paths.SRC,
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new StaticSiteGeneratorPlugin('main', data.routes),
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html')
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }

};
