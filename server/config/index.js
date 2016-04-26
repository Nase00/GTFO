/* eslint no-console:0 */
/* globals console */
import path from 'path';
import moment from 'moment';
import colors from 'colors/safe';
import { argv } from 'yargs';

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};


if (argv.mocks) {
  process.env.MOCKS = true;
  console.log(colors.gray.italic('Using mock data'));
}

if (argv.dhc) {
  process.env.DONT_HOOK_CONSOLE = true;
  console.log(
    colors.gray.italic('Not hooking into console.log, output may be messy\n')
  );
}

if (argv.dd) {
  process.env.DISABLE_DEVICES = true;
  console.log(colors.gray.italic('Devices disabled'));
}

export const isProd = process.env.NODE_ENV === 'production';

export const SERVER_PORT = normalizePort(process.env.PORT || '3000');
export const WEB_SOCKET_PORT = 4001;

const ROOT = '../';
export const PUBLIC_PATH = path.join(__dirname, ROOT, 'public');
export const BUNDLE_PATH = '/dist/bundle.js';
export const VIEWS_PATH = path.join(__dirname, ROOT, 'views');

/**
 * Contrib configurations.
 */
export const logOptions = {
  fg: 'white',
  label: 'Server Log',
  width: '100%',
  height: '100%',
  style: {
    border: { fg: 'green' }
  }
};

export const tableOptions = {
  fg: 'white',
  style: {
    border: { fg: 'blue' }
  }
};

export const guageOptions = {
  label: 'Room utilization',
  style: {
    border: { fg: 'yellow' }
  }
};
