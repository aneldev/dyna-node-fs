const fs = require('fs');
const path = require('path');

import {IError} from 'dyna-interfaces';

export {IError};

export const loadJSON = (filename: string): Promise<any> => {
  return new Promise((resolve: Function, reject: (error: IError) => void) => {
    fs.readFile(
      filename,
      (error: NodeJS.ErrnoException, data: Buffer) => {
        if (error) {
          reject({
            code: 1909272047,
            section: 'dyna-node-fs/loadJSON',
            message: `Cannot load the json file: [${filename}]`,
            data: {error},
          });
        }
        else {
          resolve(JSON.parse(data.toString()));
        }
      }
    );
  });
};

export const saveJSON = (filename: string, data: any, humanReadable: boolean = false): Promise<void> => {
  return new Promise((resolve: Function, reject: (error: NodeJS.ErrnoException | any) => void) => {
    mkdir(getPath(filename))
      .then(() => {
        fs.writeFile(
          filename, JSON.stringify(data, null, humanReadable ? 2 : 0),
          (error: NodeJS.ErrnoException) => {
            if (error) {
              reject({
                code: 1909272048,
                section: 'dyna-node-fs/saveJSON',
                message: `Cannot save the json file: [${filename}]`,
                data: {error},
              });
            }
            else {
              resolve();
            }
          }
        );
      })
      .catch((error: any) => {
        reject({
          code: 1909272049,
          section: 'dyna-node-fs/saveJSON',
          message: `Cannot create path for file: [${filename}]`,
          data: {error},
        });
      });
  });
};


export const exists = (filename: string): Promise<boolean> => {
  return new Promise((resolve: (exists: boolean) => void) => {
    fs.exists(
      filename,
      (exists: boolean) => {
        resolve(exists);
      }
    );
  });
};

const _deleteFile = (filename: string): Promise<boolean> => {
  return new Promise((resolve: Function, reject: (error: IError) => void) => {
    fs.unlink(
      filename,
      (error: NodeJS.ErrnoException) => {
        if (error) {
          reject({
            code: 1909272050,
            section: 'dyna-node-fs/_deleteFile(internal)',
            message: `Cannot delete file: [${filename}]`,
            data: {error},
          });
        }
        else {
          resolve();
        }
      }
    );
  });
};

export const deleteFile = async (filename: string): Promise<boolean> => {
  const fileExists: boolean = await exists(filename);
  if (!fileExists) return Promise.resolve(false);
  await _deleteFile(filename);
  return Promise.resolve(true);
};


export const mkdir = (directory: string): Promise<void> => {
  return new Promise((resolve: Function, reject: (error: IError) => void) => {
    try {
      const sep = '/'; //path.sep;
      const initDir = path.isAbsolute(directory) ? sep : '';
      directory.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(parentDir, childDir);
        if (!fs.existsSync(curDir)) fs.mkdirSync(curDir);
        return curDir;
      }, initDir);
      resolve();
    } catch (error) {
      reject({
        code: 1909272051,
        section: 'dyna-node-fs/mkdir',
        message: `Cannot create directory: [${directory}]`,
        data: {error},
      });
    }
  });
};

export const getPath = (fullpath: string): string => {
  let parts: string[] = fullpath.replace(/\\/g, '/').split('/');
  parts.pop();
  return parts.join('/');
};

export const getFilename = (fullpath: string): string => {
  let parts: string[] = fullpath.replace(/\\/g, '/').split('/');
  return parts.reverse()[0];
};

