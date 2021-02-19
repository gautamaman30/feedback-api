"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToDate = exports.convertArrayToSet = exports.generateId = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
function readFile(file_path) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(file_path, 'utf8', (err, file) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(file);
            }
        });
    });
}
exports.readFile = readFile;
function generateId() {
    const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
    let id = '';
    while (id.length < 10) {
        let tempChar = Math.floor(Math.random() * str.length);
        id += str[tempChar];
    }
    return id;
}
exports.generateId = generateId;
function convertArrayToSet(arr) {
    let set = new Set();
    for (let i of arr) {
        set.add(i);
    }
    return set;
}
exports.convertArrayToSet = convertArrayToSet;
function convertStringToDate(date) {
    let month_date = { 1: 31, 2: 28 | 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
    let arr = date.split('-');
    if (arr.length !== 3)
        return null;
    if (!(arr[0].length === 4 && parseInt(arr[0])))
        return null;
    if (!(arr[1].length === 2 && parseInt(arr[1]) && (parseInt(arr[1]) < 13)))
        return null;
    if (!(arr[2].length === 2 && parseInt(arr[2])))
        return null;
    if (!(month_date[parseInt(arr[1])] === parseInt(arr[2])))
        return null;
    return new Date(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]));
}
exports.convertStringToDate = convertStringToDate;
