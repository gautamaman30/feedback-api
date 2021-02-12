"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertArrayToSet = exports.generateId = void 0;
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
