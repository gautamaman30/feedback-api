"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesUtils = void 0;
class ServicesUtils {
    convertArrayToSet(arr) {
        let set = new Set();
        for (let i of arr) {
            set.add(i);
        }
        return set;
    }
    generateId() {
        const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
        let id = '';
        while (id.length < 10) {
            let tempChar = Math.floor(Math.random() * str.length);
            id += str[tempChar];
        }
        return id;
    }
}
exports.ServicesUtils = ServicesUtils;
