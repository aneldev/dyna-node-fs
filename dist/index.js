(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-node-fs", ["fs", "path"], factory);
	else if(typeof exports === 'object')
		exports["dyna-node-fs"] = factory(require("fs"), require("path"));
	else
		root["dyna-node-fs"] = factory(root["fs"], root["path"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(1);
const path = __webpack_require__(2);
exports.loadJSON = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(data.toString()));
            }
        });
    });
};
exports.saveJSON = (filename, data, humanReadable = false) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(data, null, humanReadable ? 2 : 0), (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
exports.exists = (filename) => {
    return new Promise((resolve) => {
        fs.exists(filename, (exists) => {
            resolve(exists);
        });
    });
};
const _deleteFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
exports.deleteFile = (filename) => __awaiter(this, void 0, void 0, function* () {
    const fileExists = yield exports.exists(filename);
    if (!fileExists)
        return Promise.resolve(false);
    yield _deleteFile(filename);
    return Promise.resolve(true);
});
exports.mkdir = (directory) => {
    return new Promise((resolve, reject) => {
        try {
            const sep = '/'; //path.sep;
            const initDir = path.isAbsolute(directory) ? sep : '';
            directory.split(sep).reduce((parentDir, childDir) => {
                const curDir = path.resolve(parentDir, childDir);
                if (!fs.existsSync(curDir))
                    fs.mkdirSync(curDir);
                return curDir;
            }, initDir);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.getPath = (fullpath) => {
    let parts = fullpath.replace(/\\/g, '/').split('/');
    parts.pop();
    return parts.join('/');
};
exports.getFilename = (fullpath) => {
    let parts = fullpath.replace(/\\/g, '/').split('/');
    return parts.reverse()[0];
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});