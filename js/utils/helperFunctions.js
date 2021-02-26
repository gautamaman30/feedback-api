"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperFunctions = void 0;
class HelperFunctions {
    capitalizeString(item) {
        if (typeof item === "string") {
            return item[0].toUpperCase + item.substring(1);
        }
        return item.map(i => i[0].toUpperCase() + i.substring(1));
    }
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
    lowerCaseStrings(item) {
        return item.toLocaleLowerCase();
    }
    convertStringToDate(date) {
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
}
exports.HelperFunctions = HelperFunctions;
