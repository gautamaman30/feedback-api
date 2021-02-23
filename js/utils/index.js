"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToDate = exports.convertArrayToSet = exports.generateId = exports.Errors = exports.Messages = void 0;
exports.Messages = {
    FEEDBACK_UPDATED: "Feedback updated successfully",
    FEEDBACK_DELETED: "Feedback deleted successfully",
    FEEDBACK_CREATED: "Feedback created successfully",
    TECHNOLOGY_DELETED: "Technology deleted successfully",
    TECHNOLOGY_UPDATED: "Technology updated successfully",
    TECHNOLOGY_CREATED: "Technology created successfully",
    USER_DELETED: "User deleted successfully",
    USER_CREATED: "User created successfully"
};
exports.Errors = {
    ADMIN_KEY_REQUIRED: "Admin key is required",
    ADMIN_POST_FEEDBACK: "Admin cannot give feedbacks",
    ADMIN_EDIT_FEEDBACK: "Only users can edit their feedback",
    ADMIN_DELETE_ADMIN: "Admin cannot delete another admin",
    USER_NAME_REQUIRED: "User name is required",
    USER_ID_REQUIRED: "User id is required",
    USER_POST_OWN_FEEDBACK: "User cannot post feedbacks about themselves",
    USER_EDIT_OTHERS_FEEDBACK: "User cannot update other user's feedbacks",
    DUPLICATE_USER_NAME: "User with this name already exist",
    USER_NOT_FOUND: "User not found",
    TECHNOLOGY_NAME_REQUIRED: "Technology name is required",
    TECHNOLOGY_DETAILS_REQUIRED: "Technology details is required",
    TECHNOLOGY_NOT_FOUND: "Technology not found",
    FEEDBACK_NAME_REQUIRED: "Feedback name is required",
    FEEDBACK_ID_REQUIRED: "Feedback id is required",
    FEEDBACK_REQUIRED: "Feedback is required",
    FEEDBACK_STATUS_REQUIRED: "Feedback status is required",
    FEEDBACK_STATUS_INCORRECT: "Feedback status can be 'approved' or 'rejected' only",
    FEEDBACK_EMPTY: "Feedback cannot be empty",
    FEEDBACK_NOT_FOUND: "Feedback not found",
    NAME_NOT_FOUND: "Name not found",
    DATE_FORMAT_INCORRECT: "Only accepted date format is 'YYYY-MM-DD'",
    INTERNAL_ERROR: "Internal error",
    AUTHORIZATION_FAILED: "Authorization failed"
};
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
