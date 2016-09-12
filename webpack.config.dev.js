var webpack = require('webpack');

module.exports = {

    devtool: '#inline-source-map',
    entry: {
        main: './src/main.js',
        lib: [
            'webpack-hot-middleware/client'
        ]
    },
    output: {

        path: __dirname,

        filename: '[name].js',

        publicPath: '/public/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')
    ],
    resolve: {
        extensions: ['', '.js', '.json'],
        alias: {
            // Workaround https://github.com/Reactive-Extensions/RxJS/issues/832, until it's fixed
            'rx$': require.resolve('rx/dist/rx')
        }
    },
    module: {
        loaders: [
            { test: /\.json$/, loaders: ['json'] },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: ['es2015', 'es2016'] }
            }
        ]
    }
};
