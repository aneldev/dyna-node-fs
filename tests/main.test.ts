declare let jasmine: any, describe: any, expect: any, it: any;
import {saveJSON, loadJSON, deleteFile, getPath, getFilename} from './../src';

const data: any = {
  name: 'John',
  age: 32,
};

describe.skip('Load Save Delete file', () => {
  it('should delete the file', (done:Function) => {
    deleteFile('test-data.json')
      .then(()=>{
        expect(true).toBe(true);
        done();
      })
      .catch((error=>{
        console.error('cannot save the file',error);
        expect(error).toBe(null);
        done();
      }));
  });
  it('should save the file', (done:Function) => {
    saveJSON('test-data.json', data)
      .then(()=>{
        expect(true).toBe(true);
        done();
      })
      .catch((error=>{
        console.error('cannot save the file',error);
        expect(error).toBe(null);
        done();
      }));
  });
  it('should load the file', (done:Function) => {
    loadJSON('test-data.json')
      .then((loadedData)=>{
        expect(loadedData.name).toBe(data.name);
        expect(loadedData.age).toBe(data.age);
        done();
      })
      .catch((error=>{
        console.error('cannot load the file',error);
        expect(error).toBe(null);
        done();
      }));
  });
  it('should delete the file', (done:Function) => {
    deleteFile('test-data.json')
      .then((deleted: boolean)=>{
        expect(deleted).toBe(true);
        done();
      })
      .catch((error=>{
        console.error('cannot save the file',error);
        expect(error).toBe(null);
        done();
      }));
  });
});


describe('path parse', () => {
  it('should get the path from full file name', () => {
    expect(getPath('src/feature\\base/myFeature.ts')).toBe('src/feature/base');
  });
  it('should get the filename from full file name', () => {
    expect(getFilename('src/feature\\base/myFeature.ts')).toBe('myFeature.ts');
  });
});
