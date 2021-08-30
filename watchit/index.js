#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');

const start = debounce(() => {
  console.log('Starting Users Program');
});

chokidar
  .watch('.')
  .on('add', () => console.log('Starting Users Program'))
  .on('change', () => console.log('File Changed'))
  .on('unlink', () => console.log('File Unlinked'))











