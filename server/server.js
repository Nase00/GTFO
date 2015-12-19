/* eslint no-console:0 */
/* globals console */
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import colors from 'colors/safe';
var cluster = require('cluster');

import * as config from './config';
import routes from './routes';
import devices from './controllers/devices';

const server = express();

/* Client hot reloading (dev only) */
if (process.env.HOT) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.hot');
  const compiler = webpack(webpackConfig);

  server.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  server.use(require('webpack-hot-middleware')(compiler));

  console.log(colors.bgRed('Hot reloading enabled'));
}

/* Configuration */
server.use(favicon(`server/${config.publicPath}/favicon.ico`));
server.use(logger('dev'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('port', config.serverPort);
server.use('/', routes);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, `${config.publicPath}`)));

const app = server.listen(config.serverPort, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${config.serverPort}`);

  if (!process.env.DISABLE_DEVICES) {
    devices.run();
  }
});

export default app;
