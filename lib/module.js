const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { glob } = require('glob-gitignore');

const access = promisify(fs.access);
const readFile = promisify(fs.readFile);

const makeFileList = async (target = __dirname) => {
  let hasGitIgnore = true;
  try {
    await access(path.join(target, '.gitignore'));
  } catch (err) {
    hasGitIgnore = false;
  }

  let ignore = '';
  if (hasGitIgnore) {
    ignore = await readFile(path.join(target, '.gitignore'), 'utf8');
    ignore = ignore.split('\n');
  }

  return glob(['**'], {
    cwd: target,
    ignore,
  });
};

module.exports = {
  makeFileList,
};