const fs = require('fs');
const path = require('path');

export const loadJSON = (filename: string): Promise<any> => {
  return new Promise((resolve: Function, reject: (error: NodeJS.ErrnoException) => void) => {
    fs.readFile(
      filename,
      (error: NodeJS.ErrnoException, data: Buffer) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(JSON.parse(data.toString()));
        }
      }
    );
  });
};

export const saveJSON = (filename: string, data: any, humanReadable: boolean = false): Promise<void> => {
  return new Promise((resolve: Function, reject: (error: NodeJS.ErrnoException) => void) => {
    fs.writeFile(
      filename, JSON.stringify(data, null, humanReadable ? 2 : 0),
      (error: NodeJS.ErrnoException) => {
        if (error) {
          reject(error);
        }
        else {
          resolve();
        }
      }
    );
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
  return new Promise((resolve: Function, reject: (error: NodeJS.ErrnoException) => void) => {
    fs.unlink(
      filename,
      (error: NodeJS.ErrnoException) => {
        if (error) {
          reject(error);
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
  return new Promise((resolve: Function, reject: Function) => {
    try {
      const sep = '/'; //path.sep;
      const initDir = path.isAbsolute(directory) ? sep : '';
      directory.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(parentDir, childDir);
        if (!fs.existsSync(curDir)) fs.mkdirSync(curDir);
        return curDir;
      }, initDir);
      resolve();
    } catch (err) {
      reject(err);
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
