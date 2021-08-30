#!/usr/bin/env node

/** 
 * 
 * stdio = standardIO 
 * 
 *   PROCESS:
 *      stdin = can be used to recieve some info directly from our terminal ... terminal -> process
 * 
 * 
 *      stdout = used to communicate any normal logs ... process -> terminal
 * 
 *      
 *      stderr = used to throw any error of any kind ... process -> terminal
 * 
 * 
 * 
 * */

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');

program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({ filename }) => {
    // check to see if theres a file
    const name = filename || 'index.js';

    try {
      // check to see if file exists
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    const start = debounce(() => {
      // console.log('Starting Users Program');

      //spawn('command we want to run', [name of file we want to execute], {stdio: 'inherit'})
      spawn('node', [name], { stdio: 'inherit' });
    }, 100);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start)
  });

program.parse(process.argv);













