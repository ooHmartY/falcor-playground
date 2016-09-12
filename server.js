import express from 'express';
import falcorExpress from 'falcor-express';
import Router from 'falcor-router';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.dev';


console.log('*** Starting dev server ***');
const app = express();

const compiler = webpack(config);

app.use(
    webpackDevMiddleware(
        compiler,
        {
            publicPath: config.output.publicPath,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    ),
    webpackHotMiddleware(compiler)
);

app.use('/model.json', falcorExpress.dataSourceRoute(() => {

    return new Router([{
        route: 'greeting',
        get() {
            return {
                path: ['greeting'],
                value: 'Hello!!'
            };
        }
    }]);
}));

app.use(express.static(`${__dirname}/`));

app.listen(3000);
console.log('*** Express server started ***');
